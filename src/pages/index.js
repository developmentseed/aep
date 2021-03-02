import React from 'react';
import T from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { media, themeVal } from '@devseed-ui/theme-provider';
import { Button } from '@devseed-ui/button';

import Layout from '../components/layout';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody,
  InpageBodyInner
} from '../styles/inpage';
import Prose from '../styles/type/prose';

import logoEsmapUrl from '../media/content/logos/logo-esmap--white.png';
import logoWbUrl from '../media/content/logos/logo-wb--white.png';

const HomeInpage = styled(Inpage)`
  background: ${themeVal('color.secondary')};
  color: #ffffff;
  padding-top: 8vh;
  position: relative;

  p,
  ${Button} {
    margin-top: 1rem;
    margin-right: 1rem;
  }

  ${media.mediumUp`
    padding-top: 12vh;

    p, ${Button} {
      margin-top: 4rem;
    }

    ${InpageBodyInner} {
      max-width: 40rem;
    }
  `}
`;

const HomeTitle = styled(InpageTitle)`
  span {
    font-size: 1rem;
    text-transform: uppercase;
    display: block;
  }

  ${media.mediumUp`
    font-size: 3.5rem;
    line-height: 4rem;
  `}
`;

const Lead = styled(Prose)`
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
    <Layout location={location} title='Home'>
      <HomeInpage>
        <InpageHeader>
          <InpageHeaderInner>
            <InpageHeadline>
              <HomeTitle size='large'>{title}</HomeTitle>
            </InpageHeadline>
          </InpageHeaderInner>
        </InpageHeader>
        <InpageBody>
          <InpageBodyInner>
            <Lead>Tagline...</Lead>
            <PartnerLogos>
              <li>
                <img src={logoEsmapUrl} alt='Esmap logo' />
              </li>
              <li>
                <img src={logoWbUrl} alt='WB logo' />
              </li>
            </PartnerLogos>
          </InpageBodyInner>
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
