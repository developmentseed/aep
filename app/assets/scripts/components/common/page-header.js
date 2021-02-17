import React from 'react';
import styled from 'styled-components';

import config from '../../config';

import { Link, NavLink } from 'react-router-dom';

import {
  glsp,
  media,
  stylizeFunction,
  themeVal,
  visuallyHidden
} from '@devseed-ui/theme-provider';
import collecticon from '@devseed-ui/collecticons';

import { filterComponentProps } from '../../styles/utils/general';

import ShareOptions from './share-options';

import { rgba } from 'polished';

const _rgba = stylizeFunction(rgba);

const { appTitle, appShortTitle } = config;

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

const HomeLink = styled.a`
  position: relative;
  display: block;
  width: 4rem;
  height: 3rem;
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
    background: ${_rgba(themeVal('color.baseLight'), 0.08)};
  }
  span {
    ${visuallyHidden()}
  }
  ::before {
    ${collecticon('brand-development-seed')}
  }
`;

const GlobalMenuLink = styled.a`
  position: relative;
  display: block;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  border-radius: ${themeVal('shape.rounded')};
  transition: all 0.24s ease 0s;
  margin-right: ${glsp(0.5)};
  ${media.mediumUp`
    margin-right: 0;
    margin-bottom: ${glsp(0.5)};
  `}
  &::before {
    ${({ useIcon }) => collecticon(useIcon)}
    font-size: 1.125rem
  }
  &,
  &:visited {
    color: inherit;
  }

  &:hover {
    opacity: 1;
    background: ${_rgba(themeVal('color.baseLight'), 0.08)};
  }
  &.active {
    color: ${themeVal('color.baseLight')};
    opacity: 1;
    background: ${_rgba(themeVal('color.baseLight'), 0.16)};
  }
  span {
    ${visuallyHidden()}
  }
`;

// See documentation of filterComponentProp as to why this is
const propsToFilter = ['variation', 'size', 'hideText', 'useIcon', 'active'];
const StyledNavLink = filterComponentProps(NavLink, propsToFilter);
const StyledLink = filterComponentProps(Link, propsToFilter);

function PageHeader() {
  return (
    <PageHead role='banner'>
      <PageHeadInner>
        <PageNav role='navigation'>
          <GlobalMenu>
            <li>
              <HomeLink
                as={StyledLink}
                to='/'
                title='Visit the home page'
                data-tip={appTitle}
              >
                <span>{appShortTitle}</span>
              </HomeLink>
            </li>
            <li>
              <GlobalMenuLink
                as={StyledNavLink}
                exact
                to='/'
                useIcon='house'
                title='Visit the home page'
                data-tip={appTitle}
              >
                <span>{appTitle}</span>
              </GlobalMenuLink>
            </li>
            <li>
              <GlobalMenuLink
                as={StyledNavLink}
                exact
                to='/about'
                useIcon='circle-information'
                data-tip='About'
                title='View About page'
              >
                <span>About</span>
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

PageHeader.propTypes = {};

export default PageHeader;
