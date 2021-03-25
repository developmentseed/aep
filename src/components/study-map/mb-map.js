import React, { useEffect, useMemo, useRef, useState } from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';
import merge from 'deepmerge';

import { diffArrayById } from '../../utils/array';

const MapContainer = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

const defaultPaintObject = {
  circle: {
    'circle-color': '#5860FF',
    'circle-stroke-color': '#FFFFFF',
    'circle-stroke-opacity': 0.64,
    'circle-stroke-width': 2,
    'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 5, 12, 15]
  },
  line: {
    'line-color': '#747BFC',
    'line-opacity': ['interpolate', ['linear'], ['zoom'], 6, 0.96, 12, 0.66],
    'line-width': ['interpolate', ['linear'], ['zoom'], 6, 1, 12, 2]
  }
};

export default function MbMap(props) {
  const {
    token,
    basemap,
    bbox,
    topLayer,
    zoomExtent,
    mapConfig,
    layersState
  } = props;
  mapboxgl.accessToken = token;
  const mapSources = useMemo(() => {
    if (mapConfig && mapConfig.sources) {
      // Convert sources to array to be more easily managed.
      return Object.keys(mapConfig.sources).map((k) => ({
        id: k,
        source: mapConfig.sources[k]
      }));
    }
    return null;
  }, [mapConfig]);

  const mapLayers = useMemo(() => {
    if (mapConfig && mapConfig.layers) {
      return mapConfig.layers.map((layer) => {
        if (!defaultPaintObject[layer.type]) return layer;

        // Merge custom paint properties from MB Style with the default ones.
        // Arrays are not concatenated, instead overwritten by custom props.
        return {
          ...layer,
          paint: layer.paint
            ? merge(defaultPaintObject[layer.type], layer.paint, {
                arrayMerge: (destination, source) => source
              })
            : defaultPaintObject[layer.type]
        };
      });
    }
    return null;
  }, [mapConfig]);

  const mapContainer = useRef(null);
  const [theMap, setMap] = useState(null);

  // Initialize map
  useEffect(() => {
    const mbMap = new mapboxgl.Map({
      attributionControl: false,
      bounds: bbox,
      container: mapContainer.current,
      minZoom: zoomExtent[0],
      maxZoom: zoomExtent[1],
      style: basemap,
      logoPosition: 'bottom-right',
      pitchWithRotate: false,
      dragRotate: false
    });

    mbMap.on('load', function () {
      // Disable map rotation using right click + drag
      mbMap.dragRotate.disable();

      // Disable map rotation using touch rotation gesture
      mbMap.touchZoomRotate.disableRotation();

      // Add zoom controls.
      mbMap.addControl(new mapboxgl.NavigationControl(), 'top-left');

      // Remove compass.
      document.querySelector('.mapboxgl-ctrl .mapboxgl-ctrl-compass').remove();

      // Style attribution
      mbMap.addControl(new mapboxgl.AttributionControl({ compact: true }));

      setMap(mbMap);
    });

    return () => {
      mbMap.remove();
    };
  }, [bbox, basemap, zoomExtent]);

  useSources(theMap, mapSources);
  useLayers(theMap, mapLayers, topLayer);

  useLayersState(theMap, mapLayers, layersState);

  return <MapContainer ref={mapContainer} />;
}

MbMap.propTypes = {
  token: T.string,
  basemap: T.string,
  topLayer: T.string,
  mapConfig: T.object,
  bbox: T.array,
  zoomExtent: T.array,
  layersState: T.array
};

const useSources = (theMap, sources) => {
  const currentSources = useRef([]);

  useEffect(() => {
    if (!theMap || !sources) return;
    const { removed, shared, added } = diffArrayById(
      currentSources.current,
      sources
    );

    removed.forEach((source) => {
      if (theMap.getSource(source.id)) {
        theMap.removeSource(source.id);
      }
    });

    added.forEach((source) => {
      if (!theMap.getSource(source.id)) {
        theMap.addSource(source.id, source.source);
      }
    });

    // Store new current layers.
    currentSources.current = [...shared, ...added];
  }, [theMap, sources]);
};

const useLayers = (theMap, layers, topLayer) => {
  const currentLayers = useRef([]);

  useEffect(() => {
    if (!theMap || !layers) return;
    const { removed, shared, added } = diffArrayById(
      currentLayers.current,
      layers
    );

    removed.forEach((layer) => {
      if (theMap.getLayer(layer.id)) {
        theMap.removeLayer(layer.id);
      }
    });

    added.forEach((layer) => {
      if (!theMap.getLayer(layer.id)) {
        theMap.addLayer(layer, topLayer);
      }
    });

    // Store new current layers.
    currentLayers.current = [...shared, ...added];
  }, [theMap, layers, topLayer]);
};

const useLayersState = (theMap, layers, layersState) => {
  useEffect(() => {
    if (!theMap || !layersState) return;

    // Reconcile layer visibility
    // Start by splitting the mb layers to hide/show based on visibility.
    let [mbLayersToHide, mbLayersToShow] = layersState.reduce(
      ([hide, show], l) => {
        return l.visible
          ? [hide, [...show, l.mbLayer]]
          : [[...hide, l.mbLayer], show];
      },
      [[], []]
    );

    // A layer will want to be visible. If a layer later in the array is
    // visible it show stay visible, even if a previous one hid it.
    mbLayersToHide = mbLayersToHide.filter((l) => !mbLayersToShow.includes(l));

    mbLayersToShow.forEach((layer) => {
      if (theMap.getLayer(layer)) {
        theMap.setLayoutProperty(layer, 'visibility', 'visible');
      }
    });

    mbLayersToHide.forEach((layer) => {
      if (theMap.getLayer(layer)) {
        theMap.setLayoutProperty(layer, 'visibility', 'none');
      }
    });
  }, [theMap, layers, layersState]);
};
