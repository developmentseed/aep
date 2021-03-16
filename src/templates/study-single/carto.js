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

function StudySingleCarto(props) {
  const {
    mbToken,
    basemap,
    topLayer,
    bbox,
    mapConfig,
    panelLayers = [],
    onAction
  } = props;

  // Group panel layers by their category.
  const {
    result: panelResultLayers,
    contextual: panelContextualLayers
  } = useMemo(
    () =>
      panelLayers.reduce((acc, layer) => {
        const c = layer.category || 'n/a';
        return {
          ...acc,
          [c]: [...(acc[c] || []), layer]
        };
      }, {}),
    [panelLayers]
  );

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
                <PanelSectionTitle>Layers</PanelSectionTitle>
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
  mapConfig: T.object,
  panelLayers: T.array
};

export default StudySingleCarto;
