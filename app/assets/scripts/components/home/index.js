import React from 'react';
import styled from 'styled-components';

import { Button } from '@devseed-ui/button';
import { media, themeVal } from '@devseed-ui/theme-provider';

import App from '../common/app';

import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody,
  InpageBodyInner
} from '../../styles/inpage';
import Prose from '../../styles/type/prose';

import config from '../../config';

const { appTitle } = config;

const HomeInpage = styled(Inpage)`
  background: ${themeVal('color.secondary')};
  color: ${themeVal('color.background')};
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

function Home() {
  return (
    <App pageTitle='Home'>
      <HomeInpage>
        <InpageHeader>
          <InpageHeaderInner>
            <InpageHeadline>
              <HomeTitle size='large'>{appTitle}</HomeTitle>
            </InpageHeadline>
          </InpageHeaderInner>
        </InpageHeader>
        <InpageBody>
          <InpageBodyInner>
            <Lead>Tagline...</Lead>
            <PartnerLogos>
              <li>
                <img src='./assets/graphics/content/logos/logo-esmap--white.png' />
              </li>
              <li>
                <img src='./assets/graphics/content/logos/logo-wb--white.png' />
              </li>
            </PartnerLogos>
          </InpageBodyInner>
        </InpageBody>
      </HomeInpage>
    </App>
  );
}

export default Home;
