import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback
} from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';

import Popover from './popover';

import { diffArrayById } from '../../utils/array';
import { graphql, useStaticQuery } from 'gatsby';
import { applyMapLayersDefaults } from './map-layers-defaults';

const MapContainer = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

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

  const icons = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "icons" } }) {
        nodes {
          name
          publicURL
        }
      }
    }
  `);

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
    return applyMapLayersDefaults(mapConfig?.layers);
  }, [mapConfig]);

  const mapContainer = useRef(null);
  const [theMap, setMap] = useState(null);
  const [popoverCoords, setPopoverCoords] = useState(null);
  const [popoverData, setPopoverData] = useState({});

  // Initialize map
  useEffect(() => {
    const mbMap = new mapboxgl.Map({
      attributionControl: false,
      bounds: bbox,
      container: mapContainer.current,
      minZoom: zoomExtent?.[0],
      maxZoom: zoomExtent?.[1],
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

      icons.allFile.nodes.forEach((icon) => {
        mbMap.loadImage(icon.publicURL, (err, img) => {
          if (err) throw err;
          mbMap.addImage(icon.name, img);
        });
      });

      setMap(mbMap);
    });

    return () => {
      mbMap.remove();
    };
  }, [bbox, basemap, zoomExtent, icons]);

  // Popover click listener and move listener to set the cursor.
  useEffect(() => {
    if (!theMap) return;

    // Map.reduce on layers.
    const visibleLayers = layersState.reduce(
      (acc, l) => (l.visible ? acc.concat(l.mbLayer) : acc),
      []
    );

    const clickListener = (e) => {
      // Set bbox as 5px rectangle area around clicked point.
      const bbox = [
        [e.point.x - 5, e.point.y - 5],
        [e.point.x + 5, e.point.y + 5]
      ];

      const [feature] = theMap.queryRenderedFeatures(bbox, {
        layers: visibleLayers
      });

      if (feature) {
        const panelLayer = layersState.find(
          (l) => l.mbLayer === feature.layer.id
        );
        if (panelLayer) {
          setPopoverData({
            title: panelLayer.name,
            properties: feature.properties
          });
          setPopoverCoords([e.lngLat.lng, e.lngLat.lat]);
        }
      }
    };

    const mouseMoveListener = (e) => {
      const features = theMap.queryRenderedFeatures(e.point, {
        layers: visibleLayers
      });
      theMap.getCanvas().style.cursor = features.length ? 'pointer' : '';
    };

    theMap.on('click', clickListener);
    theMap.on('mousemove', mouseMoveListener);

    return () => {
      theMap.off('click', clickListener);
      theMap.off('mousemove', mouseMoveListener);
    };
  }, [theMap, layersState]);

  useSources(theMap, mapSources);
  useLayers(theMap, mapLayers, topLayer);

  useLayersState(theMap, mapLayers, layersState);

  return (
    <React.Fragment>
      <MapContainer ref={mapContainer} />
      <Popover
        mbMap={theMap}
        lngLat={popoverCoords}
        onClose={useCallback(() => setPopoverCoords(null), [])}
        data={popoverData}
      />
    </React.Fragment>
  );
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
