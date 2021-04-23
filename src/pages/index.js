import React from 'react';
import T from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { shade } from 'polished';

import { Link } from '../styles/clean/link';

import {
  glsp,
  media,
  multiply,
  stylizeFunction,
  themeVal,
  visuallyHidden
} from '@devseed-ui/theme-provider';

import { reveal } from '@devseed-ui/animation';
import { Heading } from '@devseed-ui/typography';
import { Button } from '../styles/button';

import Layout from '../components/layout';
import {
  Inpage,
  InpageHeader,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../styles/inpage';

import welcomeIllu from '../media/layout/welcome-illu.svg';
import logoEsmapUrl from '../media/content/logos/logo-esmap--white.png';
import logoWbUrl from '../media/content/logos/logo-wb--white.png';

const _shade = stylizeFunction(shade);

const HomeInpage = styled(Inpage)`
  background: ${_shade(0.2, themeVal('color.primary'))};
  color: #ffffff;
`;

const HomeInpageHeader = styled(InpageHeader)`
  max-height: 0;
  padding: 0;
  overflow: hidden;
`;

const HomeInpageBody = styled(InpageBody)`
  position: relative;
  overflow: hidden;
`;

const Intro = styled.section`
  position: relative;
  z-index: 20;
  display: grid;
  grid-gap: ${glsp(2)};
  align-content: center;
  padding: ${glsp(
    multiply(themeVal('layout.gap.xsmall'), 2),
    themeVal('layout.gap.xsmall')
  )};
  height: 100%;
  max-width: 56rem;
  margin: 0 auto;
  text-align: center;

  ${media.mediumUp`
    grid-gap: ${glsp(4)};
    padding: ${glsp(
      multiply(themeVal('layout.gap.medium'), 2),
      themeVal('layout.gap.medium')
    )};
  `}
`;

const IntroHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${glsp(1)};

  ${media.mediumUp`
    grid-gap: ${glsp(1.5)};
  `}
`;

const IntroTitle = styled(Heading)`
  font-size: 2rem;
  line-height: 2.5rem;
  margin: 0;

  ${media.smallUp`
    font-size: 2.5rem;
    line-height: 3rem;
  `}

  ${media.mediumUp`
    font-size: 3rem;
    line-height: 3.5rem;
  `}

  span {
    display: block;
    font-size: 1rem;
    line-height: 1.5;
    text-transform: uppercase;
    opacity: 0.64;
    margin-bottom: ${glsp(0.25)};

    ${media.mediumUp`
      font-size: 1.25rem;
      line-height: 1.75rem;
    `}
  }
`;

const IntroLead = styled.div`
  font-size: 1.25rem;
  line-height: 1.75rem;

  ${media.mediumUp`
    font-size: 1.5rem;
    line-height: 2rem;
  `}
`;

const IntroActions = styled.div`
  display: inline-grid;
  grid-gap: ${glsp(1)};

  > * {
    grid-row: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    ${media.smallDown`
      line-height: 1;
      height: 2.25rem;
      padding: ${glsp(0, 1)};
    `}

    ${media.smallUp`
      min-width: 12rem;
    `}

    ${media.mediumUp`
      min-width: 14rem;
    `}
  }
`;

const IntroBody = styled.div`
  background: transparent;
`;

const IntroFooter = styled.footer`
  background: transparent;
  text-align: center;
`;

const CreditsList = styled.dl`
  display: inline-grid;
  grid-gap: ${glsp(2)};
  align-items: center;
  justify-items: center;

  > * {
    grid-row: 1;
  }

  dt {
    ${visuallyHidden()}
  }

  a {
    display: flex;
    align-items: center;
  }

  span {
    ${visuallyHidden()}
  }

  img {
    vertical-align: top;
    display: inline-flex;
    width: auto;
    max-width: 100%;
    max-height: 1.75rem;

    ${media.smallUp`
      max-height: 2rem;
    `}

    ${media.mediumUp`
      max-height: 2.5rem;
    `}
  }
`;

const HomeIllu = styled.figure`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  animation: ${reveal} 2s ease 0s 1;

  ${media.mediumUp`
    transform: translate(-25%, -50%);
  `}
`;

const HomeIlluInner = styled.div`
  opacity: 16%;
  width: 544px;
  transition: all 0.32s ease-in-out;

  ${media.xlargeUp`
    width: 640px;
  `}

  img {
    width: 100%;
    height: auto;
  }
`;

const Home = ({ data, location }) => {
  const { title } = data.site.siteMetadata;
  const { description } = data.site.siteMetadata;

  return (
    <Layout location={location} title='Welcome'>
      <HomeInpage>
        <HomeInpageHeader>
          <InpageHeadline>
            <InpageTitle>Welcome</InpageTitle>
          </InpageHeadline>
        </HomeInpageHeader>
        <HomeInpageBody>
          <Intro>
            <IntroHeader>
              <IntroTitle>
                <span>Welcome to the</span>
                {title}
              </IntroTitle>
              <IntroLead>
                <p>{description}</p>
              </IntroLead>
            </IntroHeader>
            <IntroBody>
              <IntroActions>
                <Button
                  forwardedAs={Link}
                  to='/about'
                  variation='primary-raised-dark'
                  size='xlarge'
                  title='Browse the studies'
                >
                  Learn more
                </Button>
                <Button
                  forwardedAs={Link}
                  to='/studies'
                  variation='primary-raised-light'
                  size='xlarge'
                  title='Browse the studies'
                >
                  Browse the studies
                </Button>
              </IntroActions>
            </IntroBody>
            <IntroFooter>
              <CreditsList>
                <dt>Partners</dt>
                <dd>
                  <a
                    href='https://www.esmap.org/'
                    title='Visit Energy Sector Management Assistance Program'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={logoEsmapUrl} alt='Esmap logo' />
                  </a>
                </dd>
                <dd>
                  <a
                    href='https://www.worldbank.org/'
                    title='Visit World Bank'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={logoWbUrl} alt='WB logo' />
                  </a>
                </dd>
              </CreditsList>
            </IntroFooter>
          </Intro>
          <HomeIllu>
            <HomeIlluInner>
              <img
                alt='Welcome illustration'
                src={welcomeIllu}
                width='544'
                height='640'
              />
            </HomeIlluInner>
          </HomeIllu>
        </HomeInpageBody>
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
        description
      }
    }
  }
`;
