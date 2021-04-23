import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { glsp, media, themeVal } from '@devseed-ui/theme-provider';
import { reveal } from '@devseed-ui/animation';
import { Heading } from '@devseed-ui/typography';

import { Button } from '../styles/button';
import { Link } from '../styles/clean/link';
import BurgerOptions from './burger-options';
import ShareOptions from './share-options';

import useBreakpoints from '../utils/use-breakpoints';

const PageHeaderSelf = styled.header`
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: ${glsp(themeVal('layout.gap.xsmall'))};
  align-items: center;
  background-color: ${themeVal('color.primary')};
  color: #fff;
  animation: ${reveal} 0.32s ease 0s 1;
  padding: ${glsp(0.5, themeVal('layout.gap.xsmall'))};
  box-shadow: ${themeVal('boxShadow.elevationD')};

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
  grid-gap: ${glsp(0.25)};
  margin-right: -0.5rem;

  ${media.mediumUp`
    grid-gap: ${glsp(0.5)};
  `}

  > * {
    grid-row: 1;
  }
`;

const pageMainNavLinks = [
  {
    url: '/',
    title: 'Visit the home page',
    label: 'Welcome'
  },
  {
    url: '/studies',
    partiallyActive: true,
    title: 'View Studies page',
    label: 'Studies'
  },
  {
    url: '/support',
    title: 'View Project Support page',
    label: 'Support'
  },
  {
    url: '/toolkit',
    title: 'View Agricultural Toolkit page',
    label: 'Toolkit'
  },
  {
    url: '/about',
    title: 'View About page',
    label: 'About'
  }
];

const PageHeader = () => {
  const { mediumUp } = useBreakpoints();
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          shortTitle
        }
      }
    }
  `);

  return (
    <PageHeaderSelf role='banner'>
      <PageHeadline>
        <PageTitle>
          <Link to='/' title='Visit the home page'>
            <span>{data.site.siteMetadata.shortTitle}</span>
          </Link>
        </PageTitle>
      </PageHeadline>
      <PageNav role='navigation'>
        <GlobalMenu>
          {mediumUp &&
            pageMainNavLinks.map((l) => (
              <li key={l.url}>
                <Button
                  forwardedAs={Link}
                  activeClassName='active'
                  partiallyActive={l.partiallyActive}
                  to={l.url}
                  variation='achromic-plain'
                  title={l.title}
                >
                  {l.label}
                </Button>
              </li>
            ))}
          <li>
            <ShareOptions />
          </li>
          {!mediumUp && (
            <li>
              <BurgerOptions items={pageMainNavLinks} />
            </li>
          )}
        </GlobalMenu>
      </PageNav>
    </PageHeaderSelf>
  );
};

export default PageHeader;
