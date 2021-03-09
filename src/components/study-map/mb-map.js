import React, { useEffect, useMemo, useRef, useState } from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default function MbMap(props) {
  const { token, basemap, bbox, mapConfig } = props;
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

  const mapLayers = mapConfig && mapConfig.layers;

  const mapContainer = useRef(null);
  const [theMap, setMap] = useState(null);

  // Initialize map
  useEffect(() => {
    const mbMap = new mapboxgl.Map({
      attributionControl: false,
      bounds: bbox,
      container: mapContainer.current,
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
  }, [bbox, basemap]);

  useSources(theMap, mapSources);

  useLayers(theMap, mapLayers);

  return <MapContainer ref={mapContainer} />;
}

MbMap.propTypes = {
  token: T.string,
  basemap: T.string,
  mapConfig: T.object,
  bbox: T.array,
  layers: T.array
};

/**
 * Compare current and incoming array by each object's id and return the items
 * removed, added, shared by both arrays.
 *
 * @param {array} current Current array
 * @param {array} incoming New array
 *
 * @return object
 *  removed: {array} Items removed in incoming.
 *  added: {array} Items added on incoming.
 *  shared: {array} Items that did not change.
 */
const diffArrayById = (current, incoming) => {
  const [removed, shared] = current.reduce(
    (acc, c) => {
      const found = !!incoming.find((n) => n.id === c.id);
      return found ? [acc[0], acc[1].concat(c)] : [acc[0].concat(c), acc[1]];
    },
    [[], []]
  );

  const added = incoming.filter((n) => !current.find((c) => c.id === n.id));
  return {
    removed,
    shared,
    added
  };
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

const useLayers = (theMap, layers) => {
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
        theMap.addLayer(layer);
      }
    });

    // Store new current layers.
    currentLayers.current = [...shared, ...added];
  }, [theMap, layers]);
};
