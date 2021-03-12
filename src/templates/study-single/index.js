import React, { useCallback, useEffect, useMemo, useState } from 'react';
import T from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { glsp, themeVal, visuallyHidden } from '@devseed-ui/theme-provider';
import { Button } from '@devseed-ui/button';

import Layout from '../../components/layout';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageSubtitle,
  InpageNav,
  InpageBody,
  InpageBodyInner
} from '../../styles/inpage';

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

const ViewMenu = styled.ul`
  display: inline-grid;
  grid-gap: ${glsp(0, themeVal('layout.gap.xsmall'))};

  > * {
    grid-row: 1;
  }
`;

const ViewMenuLink = styled(Button)``;

const prepLayers = (layers) =>
  layers.map((l) => ({ ...l, visible: l.visible || false }));

const usePanelLayers = (layers) => {
  // The panel layers are stored in state to track their visibility.
  const [panelLayers, setPanelLayers] = useState(prepLayers(layers));
  // If input layers change, update state.
  useEffect(() => setPanelLayers(prepLayers(layers)), [layers]);

  const setLayerVisibility = useCallback(
    (layerId, visible) => {
      setPanelLayers(
        panelLayers.map((l) => {
          if (l.id === layerId) {
            return {
              ...l,
              visible
            };
          }
          return l;
        })
      );
    },
    [panelLayers]
  );

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

  return {
    setLayerVisibility,
    panelLayers,
    panelResultLayers,
    panelContextualLayers
  };
};

function StudySingle({ data }) {
  const { title, bbox, mapConfig, layers = [] } = data.postsYaml;
  const { mapConfig: globalMapConfig } = data.site.siteMetadata;

  const {
    setLayerVisibility,
    panelLayers,
    panelResultLayers,
    panelContextualLayers
  } = usePanelLayers(layers);

  const onLayerAction = useCallback(
    (action, layer) => {
      switch (action) {
        case 'layer.toggle':
          setLayerVisibility(layer.id, !layer.visible);
          break;
      }
    },
    [setLayerVisibility]
  );

  return (
    <Layout title='Study'>
      <Inpage>
        <InpageHeader>
          <InpageHeaderInner>
            <InpageHeadline>
              <InpageSubtitle>Study</InpageSubtitle>
              <InpageTitle>{title}</InpageTitle>
            </InpageHeadline>
            <InpageNav>
              <ViewMenu>
                <li>
                  <ViewMenuLink
                    activeClassName='active'
                    partiallyActive
                    to='/'
                    variation='achromic-plain'
                    useIcon='map'
                    title='Map view'
                  >
                    Map
                  </ViewMenuLink>
                </li>
                <li>
                  <ViewMenuLink
                    activeClassName='active'
                    partiallyActive
                    to='/'
                    variation='achromic-plain'
                    useIcon='text-block'
                    title='Summary view'
                  >
                    Summary
                  </ViewMenuLink>
                </li>
              </ViewMenu>
            </InpageNav>
          </InpageHeaderInner>
        </InpageHeader>
        <InpageBody>
          <InpageBodyInner>
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
                        onAction={onLayerAction}
                      />
                      <PanelLayersGroup
                        title='Contextual'
                        layers={panelContextualLayers}
                        onAction={onLayerAction}
                      />
                    </PanelSectionBody>
                  </PanelSection>
                </PanelBody>
              </Panel>
              <MbMap
                token={globalMapConfig.mbToken}
                basemap={globalMapConfig.basemap}
                bbox={bbox}
                layersState={panelLayers}
                mapConfig={mapConfig}
              />
            </Carto>
          </InpageBodyInner>
        </InpageBody>
      </Inpage>
    </Layout>
  );
}

StudySingle.propTypes = {
  data: T.object
};

export default StudySingle;

export const pageQuery = graphql`
  query StudyById($id: String!) {
    postsYaml(id: { eq: $id }) {
      title
      bbox
      mapConfig
      layers {
        id
        name
        category
        mbLayer
        info
        source {
          name
          url
        }
      }
    }
    site {
      siteMetadata {
        mapConfig {
          basemap
          mbToken
        }
      }
    }
  }
`;
