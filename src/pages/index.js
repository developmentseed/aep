import React from 'react';
import T from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { shade } from 'polished';
import {
  media,
  glsp,
  stylizeFunction,
  themeVal
} from '@devseed-ui/theme-provider';

import Layout from '../components/layout';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../styles/inpage';
import Prose from '../styles/typography/prose';

import logoEsmapUrl from '../media/content/logos/logo-esmap--white.png';
import logoWbUrl from '../media/content/logos/logo-wb--white.png';

const _shade = stylizeFunction(shade);

const HomeInpage = styled(Inpage)`
  background: ${_shade(0.2, themeVal('color.primary'))};
  color: #ffffff;
`;

const HomeInpageHeader = styled(InpageHeader)`
  max-height: 0;
  overflow: hidden;
`;

const Intro = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${glsp(themeVal('layout.gap.xsmall'))};
  height: 100%;

  ${media.mediumUp`
    padding: ${glsp(themeVal('layout.gap.medium'))};
  `}
`;

const IntroTitle = styled.h1`
  font-size: 3rem;
  line-height: 3.5rem;
  margin: 0;

  span {
    font-size: 1rem;
    line-height: 1;
    text-transform: uppercase;
    display: block;
  }
`;

const IntroLead = styled(Prose)`
  font-size: 1.25rem;
  line-height: 2rem;
`;

const PartnerLogos = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  list-style: none;
  margin-top: 4rem;

  li {
    margin-right: 2rem;
  }

  img {
    height: 2rem;

    ${media.smallUp`
      height: 2.5rem;
    `}
  }
`;

const Home = ({ data, location }) => {
  const { title } = data.site.siteMetadata;

  return (
    <Layout location={location} title='Welcome'>
      <HomeInpage>
        <HomeInpageHeader>
          <InpageHeaderInner>
            <InpageHeadline>
              <InpageTitle>Welcome</InpageTitle>
            </InpageHeadline>
          </InpageHeaderInner>
        </HomeInpageHeader>
        <InpageBody>
          <Intro>
            <IntroTitle size='large'>
              <span>Welcome to the</span>
              {title}
            </IntroTitle>
            <IntroLead>Tagline...</IntroLead>
            <PartnerLogos>
              <li>
                <img src={logoEsmapUrl} alt='Esmap logo' />
              </li>
              <li>
                <img src={logoWbUrl} alt='WB logo' />
              </li>
            </PartnerLogos>
          </Intro>
        </InpageBody>
      </HomeInpage>
    </Layout>
  );
};

export default Home;

Home.propTypes = {
  data: T.object,
  location: T.object
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
