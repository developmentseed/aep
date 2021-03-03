import React, { useEffect, useRef, useState } from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40rem;
`;

export default function MbMap(props) {
  const { mapConfig, bbox, layers } = props;

  mapboxgl.accessToken = mapConfig.mbToken;

  const mapContainer = useRef(null);
  const [theMap, setMap] = useState(null);
  // Keep track of the map layers to know which to add and remove.
  const currentMapLayers = useRef([]);

  // Initialize map
  useEffect(() => {
    const mbMap = new mapboxgl.Map({
      attributionControl: false,
      bounds: bbox,
      container: mapContainer.current,
      style: mapConfig.basemap,
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
  }, [bbox, mapConfig]);

  useEffect(() => {
    if (!theMap) return;

    const [toRemove, toKeep] = currentMapLayers.current.reduce(
      (acc, currentLayer) => {
        const layerFound = !!layers.find(
          (newLayer) => newLayer.id === currentLayer.id
        );
        return layerFound
          ? [acc[0], acc[1].concat(currentLayer)]
          : [acc[0].concat(currentLayer), acc[1]];
      },
      [[], []]
    );

    const toAdd = layers.filter(
      (cl) => !currentMapLayers.current.find((pl) => pl.id === cl.id)
    );

    toRemove.forEach((layer) => {
      if (theMap.getLayer(layer.id)) {
        theMap.removeLayer(layer.id);
      }
    });

    toAdd.forEach((layer) => {
      if (!theMap.getSource(layer.id)) {
        theMap.addSource(layer.id, {
          type: 'raster',
          tiles: [layer.tiles]
        });
        theMap.addLayer(
          {
            id: layer.id,
            type: 'raster',
            source: layer.id
          },
          'admin-0-boundary-bg'
        );
      }
    });

    // Store new current layers.
    currentMapLayers.current = [...toKeep, ...toAdd];
  }, [theMap, mapConfig, layers]);

  return <MapContainer ref={mapContainer} />;
}

MbMap.propTypes = {
  mapConfig: T.object,
  bbox: T.array,
  layers: T.array
};
