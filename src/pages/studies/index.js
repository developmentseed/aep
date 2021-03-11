import React from 'react';
import T from 'prop-types';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import {
  glsp,
  media,
  themeVal,
  visuallyHidden
} from '@devseed-ui/theme-provider';
import Layout from '../../components/layout';
import UniversalGridder from '../../styles/universal-gridder';

import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../styles/inpage';

const StudiesSection = styled(UniversalGridder).attrs({
  as: 'div',
  grid: {
    smallUp: ['full-start', 'full-end'],
    mediumUp: ['full-start', 'full-end'],
    largeUp: ['full-start', 'full-end']
  }
})`
  padding: ${glsp(themeVal('layout.gap.xsmall'), 0)};
  grid-row-gap: ${glsp(themeVal('layout.gap.xsmall'))};

  ${media.mediumUp`
    padding: ${glsp(themeVal('layout.gap.medium'), 0)};
    grid-row-gap: ${glsp(themeVal('layout.gap.medium'))};
  `}
`;

export const StudiesTitle = styled.h1`
  ${visuallyHidden()}
  grid-column: content-start / content-end;
  margin: 0;
`;

export const StudiesList = styled.ul`
  grid-column: content-start / content-end;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: ${glsp(themeVal('layout.gap.xsmall'))};

  ${media.smallUp`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${media.mediumUp`
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${glsp(themeVal('layout.gap.medium'))};
  `}

  ${media.largeUp`
    grid-template-columns: repeat(3, 1fr);
  `}
`;

export const Study = styled(Link)`
  display: block;
  padding: ${glsp(2)};
  border-radius: ${themeVal('shape.rounded')};
  box-shadow: inset 0 0 0 1px ${themeVal('color.baseAlphaC')};
`;

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
          <StudiesSection>
            <StudiesTitle>List of studies</StudiesTitle>
            <StudiesList>
              {studies.map((node) => (
                <li key={node.id}>
                  <Study to={`/studies/${node.fields.slug}`}>
                    {node.title}
                  </Study>
                </li>
              ))}
            </StudiesList>
          </StudiesSection>
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
