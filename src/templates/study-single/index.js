import React from 'react';
import T from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { visuallyHidden } from '@devseed-ui/theme-provider';

import Layout from '../../components/layout';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageSubtitle,
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

function StudySingle({ data }) {
  const { title, capital, layers } = data.postsYaml;

  return (
    <Layout title='Study'>
      <Inpage>
        <InpageHeader>
          <InpageHeaderInner>
            <InpageHeadline>
              <InpageSubtitle>Study</InpageSubtitle>
              <InpageTitle>{title}</InpageTitle>
            </InpageHeadline>
          </InpageHeaderInner>
        </InpageHeader>
        <InpageBody>
          <InpageBodyInner>
            <Carto>
              <Panel>
                <CartoPanelHeader>
                  <PanelTitle>Study panel</PanelTitle>
                  <p>Capital: {capital}</p>
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
                          <p>Layer 1</p>
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
              <MbMap layers={layers} />
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
      capital
      layers {
        id
        tiles
      }
    }
  }
`;
