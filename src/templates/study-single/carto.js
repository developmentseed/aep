import React, { useMemo } from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import { visuallyHidden } from '@devseed-ui/theme-provider';

import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelBody,
  PanelSection,
  PanelSectionHeader,
  PanelSectionHeadline,
  PanelSectionTitle,
  PanelSectionBody
} from '../../styles/panel';
import MbMap from '../../components/study-map/mb-map';
import PanelLayersGroup from './panel-layers-group';
import { applyMapLayersDefaults } from '../../components/study-map/map-layers-defaults';

const Carto = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  height: 100%;

  > * {
    grid-row: 1;
  }
`;

const CartoPanelHeader = styled(PanelHeader)`
  ${visuallyHidden()}
`;

const castArray = (l) => (Array.isArray(l) ? l : [l]);

const inferLegend = (panelLayer, mbLayer) => {
  const t = mbLayer.type;

  // Try to infer the legend from the layers. This only works for simple
  // types. Anything more complicated will have to be defined by the user.
  if (t === 'line') {
    const color = mbLayer.paint?.['line-color'];
    if (typeof color === 'string') {
      return {
        label: panelLayer.name,
        type: 'line',
        color,
        dashed: !!mbLayer.paint?.['line-dasharray']
      };
    }
  }

  if (t === 'circle') {
    const color = mbLayer.paint?.['circle-color'];
    if (typeof color === 'string') {
      return {
        label: panelLayer.name,
        type: 'circle',
        color
      };
    }
  }

  if (t === 'symbol') {
    const symbolId = mbLayer.layout?.['icon-image'];
    if (typeof symbolId === 'string') {
      return {
        label: panelLayer.name,
        type: 'symbol',
        icon: symbolId
      };
    }
  }

  return null;
};

function StudySingleCarto(props) {
  const {
    mbToken,
    basemap,
    topLayer,
    bbox,
    zoomExtent,
    mapConfig,
    panelLayers = [],
    onAction
  } = props;

  // Group panel layers by their category and get the config for each map layer
  // being controlled. This is needed to construct the legend.
  const {
    result: panelResultLayers,
    contextual: panelContextualLayers
  } = useMemo(() => {
    const mapLayers = applyMapLayersDefaults(mapConfig?.layers);

    return panelLayers.reduce((acc, layer) => {
      const c = layer.category || 'n/a';
      const mbLayers = castArray(layer.mbLayer);

      // Prep legend for each mb layer.
      const legends = layer.legendData
        ? castArray(layer.legendData)
        : mbLayers.map((id) => {
            const mbLayer = mapLayers.find((l) => l.id === id);
            if (!mbLayer) {
              /* eslint-disable-next-line no-console */
              console.error(
                `Map layer with id \`${id}\` not found in map config`
              );
              return null;
            }
            return inferLegend(layer, mbLayer);
          });

      const l = {
        ...layer,
        legendData: legends.filter(Boolean)
      };

      return {
        ...acc,
        [c]: [...(acc[c] || []), l]
      };
    }, {});
  }, [mapConfig, panelLayers]);

  return (
    <Carto>
      <Panel>
        <CartoPanelHeader>
          <PanelTitle>Study panel</PanelTitle>
        </CartoPanelHeader>
        <PanelBody>
          <PanelSection>
            <PanelSectionHeader>
              <PanelSectionHeadline>
                <PanelSectionTitle>Data layers</PanelSectionTitle>
              </PanelSectionHeadline>
            </PanelSectionHeader>
            <PanelSectionBody>
              <PanelLayersGroup
                title='Results'
                layers={panelResultLayers}
                onAction={onAction}
              />
              <PanelLayersGroup
                title='Contextual'
                layers={panelContextualLayers}
                onAction={onAction}
              />
            </PanelSectionBody>
          </PanelSection>
        </PanelBody>
      </Panel>
      <MbMap
        token={mbToken}
        basemap={basemap}
        topLayer={topLayer}
        bbox={bbox}
        zoomExtent={zoomExtent}
        layersState={panelLayers}
        mapConfig={mapConfig}
      />
    </Carto>
  );
}

StudySingleCarto.propTypes = {
  onAction: T.func,
  mbToken: T.string,
  basemap: T.string,
  topLayer: T.string,
  bbox: T.array,
  zoomExtent: T.array,
  mapConfig: T.object,
  panelLayers: T.array
};

export default StudySingleCarto;
