import React from 'react';
import styled from 'styled-components';
import { glsp, themeVal } from '@devseed-ui/theme-provider';
import { Button } from '@devseed-ui/button';

import { filterComponentProps } from '../styles/utils/general';

import ShareOptions from './share-options';
import { graphql, Link, useStaticQuery } from 'gatsby';

const PageHead = styled.header`
  background-color: ${themeVal('color.primary')};
  color: ${themeVal('color.baseLight')};
  position: sticky;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;
`;

const PageHeadInner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0 auto;
  height: 100%;
  padding: ${glsp(0, 1)};
`;

const PageNav = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  margin-left: auto;
`;

const GlobalMenu = styled.ul`
  display: flex;
  flex: 1;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  margin: 0;

  > * {
    margin: 0;
  }

  > *:last-child > * {
    width: 3rem;
    height: 3rem;
    text-align: center;
  }
`;

const PageHeadHeadline = styled.div``;

const PageHeadTitle = styled.h1`
  font-size: 1.5rem;
  line-height: 1;
  a {
    display: block;
  }
  a,
  a:visited {
    color: inherit;
  }
`;

const GlobalMenuLink = styled(Button)`
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  padding: 0;
  text-align: center;
  margin-right: ${glsp(0.5)};
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
const StyledNavLink = filterComponentProps(Link, propsToFilter);

function PageHeader() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const { title } = data.site.siteMetadata;

  return (
    <PageHead role='banner'>
      <PageHeadInner>
        <PageHeadHeadline>
          <PageHeadTitle>
            <Link to='/' title='Visit the home page' data-tip={title}>
              <span>AEP</span>
            </Link>
          </PageHeadTitle>
        </PageHeadHeadline>
        <PageNav role='navigation'>
          <GlobalMenu>
            <li>
              <GlobalMenuLink
                forwardedAs={StyledNavLink}
                activeClassName='active'
                to='/'
                variation='achromic-plain'
                useIcon='house'
                hideText
                title='Visit the home page'
                data-tip={title}
              >
                {title}
              </GlobalMenuLink>
            </li>
            <li>
              <GlobalMenuLink
                forwardedAs={StyledNavLink}
                activeClassName='active'
                partiallyActive
                to='/studies'
                variation='achromic-plain'
                useIcon='compass'
                hideText
                data-tip='Studies'
                title='View Studies page'
              >
                Studies
              </GlobalMenuLink>
            </li>
            <li>
              <GlobalMenuLink
                forwardedAs={StyledNavLink}
                activeClassName='active'
                to='/about'
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
