import React from 'react';
import T from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import {
  glsp,
  media,
  multiply,
  themeVal,
  visuallyHidden
} from '@devseed-ui/theme-provider';
import Layout from '../../components/layout';
import UniversalGridder from '../../styles/universal-gridder';

import {
  Inpage,
  InpageHeader,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../styles/inpage';

import {
  CardInteractive,
  CardHeader,
  CardHeadline,
  CardTitle,
  CardHeaderDetails,
  CardMedia,
  CardMediaThumb
} from '../../styles/card';

const StudiesSection = styled(UniversalGridder).attrs({
  as: 'div',
  grid: {
    smallUp: ['full-start', 'full-end'],
    mediumUp: ['full-start', 'full-end'],
    largeUp: ['full-start', 'full-end']
  }
})`
  padding: ${glsp(multiply(themeVal('layout.gap.xsmall'), 2), 0)};
  grid-row-gap: ${glsp(themeVal('layout.gap.xsmall'))};

  ${media.mediumUp`
    padding: ${glsp(multiply(themeVal('layout.gap.medium'), 2), 0)};
    grid-row-gap: ${glsp(themeVal('layout.gap.medium'))};
  `}
`;

const StudiesTitle = styled.h1`
  ${visuallyHidden()}
  grid-column: content-start / content-end;
  margin: 0;
`;

const StudiesList = styled.ul`
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

  li > * {
    height: 100%;
  }
`;

export default function Studies({ data }) {
  const studies = data.allPostsYaml.nodes;

  return (
    <Layout title='Studies'>
      <Inpage>
        <InpageHeader>
          <InpageHeadline>
            <InpageTitle>Studies</InpageTitle>
          </InpageHeadline>
        </InpageHeader>
        <InpageBody>
          <StudiesSection>
            <StudiesTitle>List of studies</StudiesTitle>
            <StudiesList>
              {studies.map((node) => (
                <li key={node.id}>
                  <CardInteractive
                    linkTo={`/studies/${node.fields.slug}`}
                    linkTitle='View study'
                    linkLabel='View'
                  >
                    <CardHeader>
                      <CardHeadline>
                        <CardTitle>{node.title}</CardTitle>
                      </CardHeadline>
                      <CardHeaderDetails>
                        {node.country && (
                          <>
                            <dt>Country</dt>
                            <dd>{node.country}</dd>
                          </>
                        )}
                        {node.study.period && (
                          <>
                            <dt>Period</dt>
                            <dd>{node.study.period}</dd>
                          </>
                        )}
                      </CardHeaderDetails>
                    </CardHeader>
                    {node.bbox && (
                      <CardMedia>
                        <CardMediaThumb>
                          <img
                            src={`https://api.mapbox.com/styles/v1/mapbox/light-v10/static/[${node.bbox
                              .flat()
                              .join(',')}]/960x320?access_token=${
                              data.site.siteMetadata.mapConfig.mbToken
                            }`}
                            width='960'
                            height='320'
                            alt='Study thumbnail'
                          />
                        </CardMediaThumb>
                      </CardMedia>
                    )}
                  </CardInteractive>
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

export const pageQuery = graphql`
  query Studies {
    site {
      siteMetadata {
        mapConfig {
          mbToken
        }
      }
    }
    allPostsYaml {
      nodes {
        id
        title
        bbox
        country
        study {
          period
        }
        fields {
          slug
        }
      }
    }
  }
`;
