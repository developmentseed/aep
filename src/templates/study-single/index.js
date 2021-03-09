import React from 'react';
import T from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { glsp, themeVal, visuallyHidden } from '@devseed-ui/theme-provider';
import { Button } from '@devseed-ui/button';
import { Accordion } from '@devseed-ui/accordion';

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
  PanelSectionBody,
  PanelGroup,
  PanelGroupHeader,
  PanelGroupTitle,
  PanelGroupBody
} from '../../styles/panel';
import MbMap from '../../components/study-map/mb-map';
import PanelLayer from './panel-layer';

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

function StudySingle({ data }) {
  const { title, bbox, mapConfig, layers = [] } = data.postsYaml;
  const { mapConfig: globalMapConfig } = data.site.siteMetadata;

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
                      <PanelGroup>
                        <PanelGroupHeader>
                          <PanelGroupTitle>Results</PanelGroupTitle>
                        </PanelGroupHeader>
                        <PanelGroupBody>
                          <Accordion>
                            {({ checkExpanded, setExpanded }) => (
                              <ol>
                                {layers.map((l, idx) => (
                                  <li key={l.mbLayer}>
                                    <PanelLayer
                                      id={l.mbLayer}
                                      label={l.name}
                                      // active={l.visible}
                                      info={l.info}
                                      // legend={l.legend}
                                      isExpanded={checkExpanded(idx)}
                                      setExpanded={(v) => setExpanded(idx, v)}
                                      // onToggleClick={() => onAction('layer.toggle', l)}
                                    />
                                  </li>
                                ))}
                              </ol>
                            )}
                          </Accordion>
                        </PanelGroupBody>
                      </PanelGroup>
                      <PanelGroup>
                        <PanelGroupHeader>
                          <PanelGroupTitle>Contextual</PanelGroupTitle>
                        </PanelGroupHeader>
                        <PanelGroupBody>
                          <p>Layer 1</p>
                        </PanelGroupBody>
                      </PanelGroup>
                    </PanelSectionBody>
                  </PanelSection>
                </PanelBody>
              </Panel>
              <MbMap
                token={globalMapConfig.mbToken}
                basemap={globalMapConfig.basemap}
                bbox={bbox}
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
