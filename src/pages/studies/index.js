import React from 'react';
import T from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { glsp, media, themeVal } from '@devseed-ui/theme-provider';
import Layout from '../../components/layout';
import { ContentBlock } from '../../styles/content-block';
import Prose from '../../styles/typography/prose';

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

const StudiesIntro = styled.div`
  grid-column: content-start / content-end;

  ${media.smallUp`
    grid-column: content-start / content-end;
  `}

  ${media.mediumUp`
    grid-column: content-start / content-end;
  `}

  ${media.largeUp`
    grid-column: content-start / content-9;
  `}
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

  const hasExternal = studies.some((s) => !!s.external);

  return (
    <Layout title='Studies'>
      <Inpage>
        <InpageHeader>
          <InpageHeadline>
            <InpageTitle>Studies</InpageTitle>
          </InpageHeadline>
        </InpageHeader>
        <InpageBody>
          <ContentBlock>
            <StudiesIntro>
              <Prose>
                <h2>Browse the studies</h2>
                <p>
                  There {studies.length === 1 ? 'is' : 'are'} currently{' '}
                  <strong>
                    {studies.length}{' '}
                    {studies.length === 1 ? 'study' : 'studies'}
                  </strong>{' '}
                  available.{' '}
                  {hasExternal &&
                    'Studies marked as external are hosted outside the platform.'}
                </p>
              </Prose>
            </StudiesIntro>
            <StudiesList>
              {studies.map((node) => (
                <li key={node.id}>
                  <CardInteractive
                    linkProps={{
                      to: node.external
                        ? node.external
                        : `/studies/${node.fields.slug}`,
                      title: node.external
                        ? 'View external study'
                        : 'View study',
                      target: node.external ? '_blank' : undefined,
                      rel: node.external ? 'noopener noreferrer' : undefined
                    }}
                    linkLabel={node.external ? 'View external study' : 'View'}
                    isExternal={!!node.external}
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
                        {node.study?.period && (
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
          </ContentBlock>
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
    allPostsYaml(sort: { fields: title }) {
      nodes {
        id
        title
        external
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
