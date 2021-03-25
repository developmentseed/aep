import React, { useMemo } from 'react';
import { navigate } from 'gatsby';
import T from 'prop-types';
import qs from 'qs';
import { graphql, Link } from 'gatsby';
import styled, { css } from 'styled-components';
import useQsStateCreator from 'qs-state-hook';

import { glsp, media, themeVal } from '@devseed-ui/theme-provider';

import Layout from '../../components/layout';
import {
  Inpage,
  InpageHeader,
  InpageHeadline,
  InpageTitle,
  InpageSubtitle,
  InpageActions,
  InpageBody
} from '../../styles/inpage';

import StudySingleCarto from './carto';
import StudySingleSummary from './summary';
import { filterComponentProps } from '../../styles/utils/general';

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

const ViewMenu = styled.ul`
  display: inline-grid;
  grid-gap: ${glsp(0, 1)};
  margin-bottom: ${glsp(-1)};

  ${media.mediumUp`
    grid-gap: ${glsp(0, 1.5)};
  `}

  > * {
    grid-row: 1;
  }
`;

const ViewMenuLink = styled(StyledLink)`
  position: relative;
  display: block;
  height: 2.5rem;
  padding: ${glsp(0.5, 0)};
  font-size: 0.875rem;
  line-height: 1;
  text-transform: uppercase;
  font-weight: ${themeVal('type.base.bold')};
  opacity: 0.64;

  &,
  &:visited {
    color: inherit;
  }

  &:hover {
    opacity: 1;
  }

  &::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 0.25rem;
    width: 0;
    background: ${themeVal('color.surface')};
    content: '';
    pointer-events: none;
    transform: translate(-50%, 0);
    transition: all 0.32s ease-in-out 0s;
  }

  ${({ active }) =>
    active &&
    css`
      opacity: 1;

      &::after {
        width: 100%;
      }
    `}
`;

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
  const { title, bbox, zoomExtent, mapConfig } = data.postsYaml;
  const { mapConfig: globalMapConfig } = data.site.siteMetadata;
  const layers = useMemo(() => data.postsYaml.layers || [], [
    data.postsYaml.layers
  ]);

  const useQsState = useQsStateCreator({
    commit: ({ search }) => navigate(`?${search}`)
  });

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

  const [visiblePanelLayers, setVisiblePanelLayers] = useQsState(
    useMemo(
      () => ({
        key: 'layers',
        default: layers.filter((l) => l.visible).map((l) => l.id),
        validator: (v) => !!v,
        hydrator: (v) => (!v ? null : v.split('|')),
        dehydrator: (v) => v.join('|')
      }),
      [layers]
    )
  );

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
          <InpageHeadline>
            <InpageTitle>{title}</InpageTitle>
            <InpageSubtitle>
              <Link to='/studies' title='View all studies'>
                Study
              </Link>
            </InpageSubtitle>
          </InpageHeadline>
          <InpageActions as='nav' role='navigation'>
            <ViewMenu role='tablist'>
              <li role='presentation'>
                <ViewMenuLink
                  role='tab'
                  to={buildUrl({ view: 'map' })}
                  title='Map view'
                  active={view === 'map'}
                >
                  Map
                </ViewMenuLink>
              </li>
              <li role='presentation'>
                <ViewMenuLink
                  role='tab'
                  to={buildUrl({ view: 'summary' })}
                  title='Summary view'
                  active={view === 'summary'}
                >
                  Summary
                </ViewMenuLink>
              </li>
            </ViewMenu>
          </InpageActions>
        </InpageHeader>
        <InpageBody>
          {view === 'map' && (
            <StudySingleCarto
              onAction={onAction}
              mbToken={globalMapConfig.mbToken}
              basemap={globalMapConfig.basemap}
              topLayer={globalMapConfig.topLayer}
              bbox={bbox}
              zoomExtent={zoomExtent}
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
      zoomExtent
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
