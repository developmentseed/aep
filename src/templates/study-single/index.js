import React from 'react';
import T from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../../components/layout';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageTitle,
  InpageBody,
  InpageBodyInner
} from '../../styles/inpage';
import MbMap from '../../components/study-map/mb-map';

function StudySingle({ data }) {
  const { title, bbox, layers } = data.postsYaml;
  const { mapConfig } = data.site.siteMetadata;

  return (
    <Layout title='Study'>
      <Inpage>
        <InpageHeader>
          <InpageHeaderInner>
            <InpageTitle>Study - {title}</InpageTitle>
          </InpageHeaderInner>
        </InpageHeader>
        <InpageBody>
          <InpageBodyInner>
            <MbMap mapConfig={mapConfig} bbox={bbox} layers={layers} />
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
      layers {
        id
        tiles
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
