import React, { useMemo, useState } from 'react';
import T from 'prop-types';
import qs from 'qs';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import useQsStateCreator from 'qs-state-hook';

import { glsp, themeVal } from '@devseed-ui/theme-provider';
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
  InpageBody
} from '../../styles/inpage';

import StudySingleCarto from './carto';
import StudySingleSummary from './summary';
import { filterComponentProps } from '../../styles/utils/general';

const ViewMenu = styled.ul`
  display: inline-grid;
  grid-gap: ${glsp(0, themeVal('layout.gap.xsmall'))};

  > * {
    grid-row: 1;
  }
`;

// See documentation of filterComponentProp as to why this is
const propsToFilter = [
  'variation',
  'size',
  'hideText',
  'useIcon',
  'active',
  'visuallyDisabled'
];
const StyledLink = filterComponentProps(Link, propsToFilter);

const buildUrl = (data) => {
  if (typeof window === 'undefined') return '';

  const parsedQS = qs.parse(window.location.search, {
    ignoreQueryPrefix: true
  });

  return `?${qs.stringify(
    {
      ...parsedQS,
      ...data
    },
    { skipNulls: true }
  )}`;
};

function StudySingle({ data }) {
  const { title, bbox, mapConfig } = data.postsYaml;
  const { mapConfig: globalMapConfig } = data.site.siteMetadata;
  const layers = data.postsYaml.layers || [];

  const useQsState = useQsStateCreator();

  const [view] = useQsState(
    useMemo(
      () => ({
        key: 'view',
        default: 'map',
        validator: ['map', 'summary']
      }),
      []
    )
  );

  // TODO: Store in url with useQsState - Bug fix pending
  const [visiblePanelLayers, setVisiblePanelLayers] = useState(
    layers.filter((l) => l.visible).map((l) => l.id)
  );
  // const [visiblePanelLayers, setVisiblePanelLayers] = useQsState(
  //   useMemo(
  //     () => ({
  //       key: 'layers',
  //       default: layers.filter((l) => l.visible).map((l) => l.id),
  //       validator: (v) => !!v,
  //       hydrator: (v) => (!v ? null : v.split('|')),
  //       dehydrator: (v) => v.join('|')
  //     }),
  //     [layers]
  //   )
  // );

  const panelLayers = layers.map((l) => ({
    ...l,
    visible: visiblePanelLayers.includes(l.id)
  }));

  const onAction = (action, layer) => {
    switch (action) {
      case 'layer.toggle':
        setVisiblePanelLayers(
          layer.visible
            ? visiblePanelLayers.filter((id) => id !== layer.id)
            : visiblePanelLayers.concat(layer.id)
        );
        break;
    }
  };

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
                  <Button
                    forwardedAs={StyledLink}
                    to={buildUrl({ view: 'map' })}
                    variation='achromic-plain'
                    useIcon='map'
                    title='Map view'
                    active={view === 'map'}
                  >
                    Map
                  </Button>
                </li>
                <li>
                  <Button
                    forwardedAs={StyledLink}
                    to={buildUrl({ view: 'summary' })}
                    variation='achromic-plain'
                    useIcon='text-block'
                    title='Summary view'
                    active={view === 'summary'}
                  >
                    Summary
                  </Button>
                </li>
              </ViewMenu>
            </InpageNav>
          </InpageHeaderInner>
        </InpageHeader>
        <InpageBody>
          {view === 'map' && (
            <StudySingleCarto
              onAction={onAction}
              mbToken={globalMapConfig.mbToken}
              basemap={globalMapConfig.basemap}
              topLayer={globalMapConfig.topLayer}
              bbox={bbox}
              panelLayers={panelLayers}
              mapConfig={mapConfig}
            />
          )}
          {view === 'summary' && <StudySingleSummary />}
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
        disabled
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
          topLayer
        }
      }
    }
  }
`;
