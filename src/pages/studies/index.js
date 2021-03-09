import React from 'react';
import T from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../../components/layout';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody,
  InpageBodyInner
} from '../../styles/inpage';

function Studies({ data }) {
  const studies = data.allPostsYaml.nodes;

  return (
    <Layout title='Studies'>
      <Inpage>
        <InpageHeader>
          <InpageHeaderInner>
            <InpageHeadline>
              <InpageTitle>Studies</InpageTitle>
            </InpageHeadline>
          </InpageHeaderInner>
        </InpageHeader>
        <InpageBody>
          <InpageBodyInner>
            <ul>
              {studies.map((node) => (
                <li key={node.id}>
                  <Link to={`/studies/${node.fields.slug}`}>{node.title}</Link>
                </li>
              ))}
            </ul>
          </InpageBodyInner>
        </InpageBody>
      </Inpage>
    </Layout>
  );
}

Studies.propTypes = {
  data: T.object
};

export default Studies;

export const pageQuery = graphql`
  query Studies {
    allPostsYaml {
      nodes {
        id
        title
        fields {
          slug
        }
      }
    }
  }
`;
