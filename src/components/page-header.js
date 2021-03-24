import React from 'react';
import styled from 'styled-components';
import { glsp, media, themeVal } from '@devseed-ui/theme-provider';
import { reveal } from '@devseed-ui/animation';
import { VerticalDivider } from '@devseed-ui/toolbar';
import { Heading } from '@devseed-ui/typography';

import { Button } from '../styles/button';
import { filterComponentProps } from '../styles/utils/general';

import ShareOptions from './share-options';
import { graphql, Link, useStaticQuery } from 'gatsby';

const PageHeaderSelf = styled.header`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: ${glsp(themeVal('layout.gap.xsmall'))};
  align-items: center;
  background-color: ${themeVal('color.primary')};
  color: #fff;
  animation: ${reveal} 0.32s ease 0s 1;
  padding: ${glsp(1, themeVal('layout.gap.xsmall'))};

  ${media.mediumUp`
    grid-gap: ${glsp(themeVal('layout.gap.medium'))};
    padding: ${glsp(1, themeVal('layout.gap.medium'))};
  `}
`;

const PageHeadline = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const PageTitle = styled(Heading)`
  font-size: 1.25rem;
  line-height: 1;
  margin: 0;

  ${media.mediumUp`
    font-size: 1.5rem;
  `}

  a {
    display: block;
  }

  a,
  a:visited {
    color: inherit;
  }
`;

const PageNav = styled.nav`
  display: inline-grid;
  grid-gap: ${glsp(0.5)};
  align-items: center;
  margin-left: auto;

  > * {
    grid-row: 1;
  }
`;

const GlobalMenu = styled.ul`
  display: inline-grid;
  grid-gap: ${glsp(0.5)};

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
    <PageHeaderSelf role='banner'>
      <PageHeadline>
        <PageTitle>
          <Link to='/' title='Visit the home page' data-tip={title}>
            <span>AEP</span>
          </Link>
        </PageTitle>
      </PageHeadline>
      <PageNav role='navigation'>
        <GlobalMenu>
          <li>
            <Button
              forwardedAs={StyledNavLink}
              activeClassName='active'
              to='/'
              variation='achromic-plain'
              title='Visit the home page'
              data-tip={title}
            >
              Welcome
            </Button>
          </li>
          <li>
            <Button
              forwardedAs={StyledNavLink}
              activeClassName='active'
              partiallyActive
              to='/studies'
              variation='achromic-plain'
              data-tip='Studies'
              title='View Studies page'
            >
              Studies
            </Button>
          </li>
          <li>
            <Button
              forwardedAs={StyledNavLink}
              activeClassName='active'
              to='/about'
              variation='achromic-plain'
              data-tip='About'
              title='View About page'
            >
              About
            </Button>
          </li>
        </GlobalMenu>
        <VerticalDivider variation='light' />
        <GlobalMenu>
          <li>
            <ShareOptions />
          </li>
        </GlobalMenu>
      </PageNav>
    </PageHeaderSelf>
  );
}

export default PageHeader;
