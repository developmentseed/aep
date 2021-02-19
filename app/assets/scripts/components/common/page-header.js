import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import {
  glsp,
  media,
  themeVal,
  visuallyHidden,
  rgba
} from '@devseed-ui/theme-provider';
import collecticon from '@devseed-ui/collecticons';
import { Button } from '@devseed-ui/button';

import config from '../../config';
import { filterComponentProps } from '../../styles/utils/general';

import ShareOptions from './share-options';

const { appTitle } = config;

const PageHead = styled.header`
  background-color: ${themeVal('color.primary')};
  color: ${themeVal('color.baseLight')};
  position: sticky;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;

  ${media.mediumUp`
    top: 0;
    left: 0;
    bottom: 0;
    height: 100vh;
  `}
`;

const PageHeadInner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0 auto;
  height: 100%;
  padding: ${glsp(0, 1, 0, 0)};

  ${media.mediumUp`
    flex-flow: column nowrap;
    padding: ${glsp(1, 0, 1.5, 0)};
  `}
`;

const PageNav = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  flex: 1;

  ${media.mediumUp`
    flex-flow: column nowrap;
  `}
`;

const GlobalMenu = styled.ul`
  display: flex;
  flex: 1;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  list-style: none;

  > * {
    margin: 0;
  }

  > *:first-child {
    margin-right: auto;
  }

  > *:last-child > * {
    width: 3rem;
    height: 3rem;
    text-align: center;
  }

  ${media.mediumUp`
    flex-flow: column nowrap;
    justify-content: center;
  `}

  ${media.mediumUp`
    > *:first-child {
      margin: 0;
    }
  
    > *:last-child {
      margin-top: auto;
    }
  `}
`;

const HomeLink = styled(Link)`
  position: relative;
  display: block;
  width: 4rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  transition: all 0.24s ease 0s;
  font-weight: ${themeVal('type.heading.bold')};
  font-size: 1.5rem;

  ${media.mediumUp`
    margin-bottom: ${glsp(6)};
  `}

  &,
  &:visited {
    color: inherit;
  }

  &.active {
    color: ${themeVal('color.baseLight')};
    opacity: 1;
    background: ${rgba(themeVal('color.baseLight'), 0.08)};
  }

  span {
    ${visuallyHidden()}
  }

  ::before {
    ${collecticon('brand-development-seed')}
  }
`;

const GlobalMenuLink = styled(Button)`
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  padding: 0;
  text-align: center;
  margin-right: ${glsp(0.5)};

  ${media.mediumUp`
    margin-right: 0;
    margin-bottom: ${glsp(0.5)};
  `}
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
const StyledNavLink = filterComponentProps(NavLink, propsToFilter);

function PageHeader() {
  return (
    <PageHead role='banner'>
      <PageHeadInner>
        <PageNav role='navigation'>
          <GlobalMenu>
            <li>
              <HomeLink to='/' title='Visit the home page' data-tip={appTitle}>
                <span>{appTitle}</span>
              </HomeLink>
            </li>
            <li>
              <GlobalMenuLink
                forwardedAs={StyledNavLink}
                to='/'
                exact
                variation='achromic-plain'
                useIcon='house'
                hideText
                title='Visit the home page'
                data-tip={appTitle}
              >
                {appTitle}
              </GlobalMenuLink>
            </li>
            <li>
              <GlobalMenuLink
                forwardedAs={StyledNavLink}
                to='/about'
                exact
                variation='achromic-plain'
                useIcon='circle-information'
                hideText
                data-tip='About'
                title='View About page'
              >
                About
              </GlobalMenuLink>
            </li>
            <li>
              <ShareOptions />
            </li>
          </GlobalMenu>
        </PageNav>
      </PageHeadInner>
    </PageHead>
  );
}

export default PageHeader;
