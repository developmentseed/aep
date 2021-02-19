import React from 'react';
import styled from 'styled-components';

import { media, themeVal, visuallyHidden } from '@devseed-ui/theme-provider';

import App from '../common/app';

import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageTitle,
  InpageBody,
  InpageBodyInner
} from '../../styles/inpage';
import Dl from '../../styles/type/definition-list';

const AboutPageBodyInner = styled(InpageBodyInner)`
  max-width: 60rem;
  margin-top: 6rem;

  p {
    margin-bottom: 1rem;
  }
`;

const LogoList = styled(Dl)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 0 1rem;
  list-style: none;
  padding: 0;
  margin: 0;

  dt {
    grid-column: 1 / span 12;

    &:not(:first-child) {
      margin-top: 1rem;
    }
  }

  dd {
    grid-column: auto / span 6;

    ${media.smallUp`
      grid-column: auto / span 4;
    `}
  }

  a {
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    height: 6rem;
    position: relative;
    z-index: 1;
    border-radius: ${themeVal('shape.rounded')};
    box-shadow: inset 0 0 0 1px ${themeVal('color.baseAlphaC')};
    transition: all 0.16s ease 0s;
  }

  span {
    ${visuallyHidden()}
  }

  img {
    display: inline-flex;
    width: auto;
    max-width: 100%;
    max-height: 3rem;
  }

  /* Compensate DevSeed logo proportions and alignment */
  .logo-devseed img {
    max-height: 2rem;
  }

  /* Compensate ESMAP logo proportions and alignment */
  .logo-esmap img {
    max-height: 2.25rem;
  }
`;

function About() {
  return (
    <App pageTitle='About'>
      <Inpage>
        <InpageHeader>
          <InpageHeaderInner>
            <InpageTitle>About the Africa Electrification Platform</InpageTitle>
          </InpageHeaderInner>
        </InpageHeader>
        <InpageBody>
          <AboutPageBodyInner>
            <p>Content to be provided.</p>
          </AboutPageBodyInner>
          <InpageBodyInner>
            <LogoList>
              <dt>Partners</dt>
              <dd>
                <a
                  href='https://www.worldbank.org/'
                  title='Visit World Bank'
                  target='_blank'
                  rel='noreferrer'
                >
                  <img
                    alt='WBG Logo'
                    src='/assets/graphics/content/logos/logo-wbg.png'
                  />
                  <span>World Bank Group</span>
                </a>
              </dd>
              <dd>
                <a
                  href='https://www.esmap.org/'
                  title='Visit Energy Sector Management Assistance Program'
                  className='logo-esmap'
                  target='_blank'
                  rel='noreferrer'
                >
                  <img
                    alt='ESMAP Logo'
                    src='/assets/graphics/content/logos/logo-esmap.png'
                  />
                  <span>ESMAP</span>
                </a>
              </dd>
            </LogoList>
            <LogoList>
              <dt>Developed by</dt>
              <dd>
                <a
                  href='https://www.developmentseed.org/'
                  title='Visit Development Seed'
                  className='logo-devseed'
                  target='_blank'
                  rel='noreferrer'
                >
                  <img
                    alt='DevSeedLogo'
                    src='/assets/graphics/content/logos/logo-devseed.png'
                  />
                  <span>Development Seed</span>
                </a>
              </dd>
              <dd>
                <a
                  href='https://www.derilinx.com/'
                  title='Visit Derilinx'
                  className='logo-esmap'
                  target='_blank'
                  rel='noreferrer'
                >
                  <img
                    alt='Derilinx Logo'
                    src='/assets/graphics/content/logos/logo-derilinx.png'
                  />
                  <span>Derilinx</span>
                </a>
              </dd>
            </LogoList>
          </InpageBodyInner>
        </InpageBody>
      </Inpage>
    </App>
  );
}

export default About;
