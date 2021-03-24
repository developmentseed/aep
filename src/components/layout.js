import React, { useEffect } from 'react';
import styled from 'styled-components';
import T from 'prop-types';
import { DevseedUiThemeProvider } from '@devseed-ui/theme-provider';
import { CollecticonsGlobalStyle } from '@devseed-ui/collecticons';
import { reveal } from '@devseed-ui/animation';

import theme from '../styles/theme';

import GlobalStyles from '../styles/global';
import PageHeader from './page-header';
import PageFooter from './page-footer';
import SEO from './seo';

const Page = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content auto min-content;
  grid-auto-rows: min-content;
  min-height: 100vh;
`;

const PageBody = styled.main`
  padding: 0;
  margin: 0;
  animation: ${reveal} 0.32s ease 0s 1;
`;

const Layout = ({ children, title, metaImage, description }) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      window.innerWidth - document.documentElement.clientWidth + 'px'
    );
  }, []);

  useEffect(() => {
    // Hide the welcome banner.
    const banner = document.querySelector('#welcome-banner');
    if (banner) {
      banner.classList.add('dismissed');
      setTimeout(() => banner.remove(), 500);
    }
  }, []);

  return (
    <DevseedUiThemeProvider theme={theme}>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <SEO title={title} description={description} image={metaImage} />
      <CollecticonsGlobalStyle />
      <GlobalStyles />
      <Page>
        <PageHeader />
        <PageBody role='main'>{children}</PageBody>
        <PageFooter />
      </Page>
    </DevseedUiThemeProvider>
  );
};

export default Layout;

Layout.propTypes = {
  title: T.string,
  description: T.string,
  children: T.oneOfType([
    T.node,
    T.arrayOf(T.oneOfType([T.node, T.arrayOf(T.node)]))
  ]),
  metaImage: T.string
};
