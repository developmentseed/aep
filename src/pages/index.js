import React from 'react';
import T from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { shade } from 'polished';

import { Link } from '../styles/clean/link';

import {
  media,
  glsp,
  stylizeFunction,
  themeVal,
  visuallyHidden
} from '@devseed-ui/theme-provider';

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

const Intro = styled.section`
  display: grid;
  grid-gap: ${glsp(2)};
  align-content: center;
  padding: ${glsp(themeVal('layout.gap.xsmall'))};
  height: 100%;
  max-width: 56rem;
  margin: 0 auto;
  text-align: center;

  ${media.mediumUp`
    grid-gap: ${glsp(4)};
    padding: ${glsp(themeVal('layout.gap.medium'))};
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
    display: block;
    width: 100%;
    max-height: 2rem;

    ${media.mediumUp`
      max-height: 2.5rem;
    `}
  }
`;

const Home = ({ data, location }) => {
  const { title } = data.site.siteMetadata;

  return (
    <Layout location={location} title='Welcome'>
      <HomeInpage>
        <HomeInpageHeader>
          <InpageHeadline>
            <InpageTitle>Welcome</InpageTitle>
          </InpageHeadline>
        </HomeInpageHeader>
        <InpageBody>
          <Intro>
            <IntroHeader>
              <IntroTitle>
                <span>Welcome to the</span>
                {title}
              </IntroTitle>
              <IntroLead>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer massa nibh, pulvinar nec neque et, sollicitudin mattis
                  ante. Nulla id scelerisque nisi, dapibus consectetur metus.
                </p>
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
