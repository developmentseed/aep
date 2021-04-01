import styled from 'styled-components';

import { glsp, media, truncated, themeVal } from '@devseed-ui/theme-provider';
import { reveal } from '@devseed-ui/animation';
import { Heading } from '@devseed-ui/typography';
import { headingAlt } from '@devseed-ui/typography';

export const Inpage = styled.article`
  display: grid;
  height: 100%;
  grid-template-rows: min-content 1fr;
`;

export const InpageHeader = styled.header`
  position: relative;
  z-index: 20;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: ${glsp(0, themeVal('layout.gap.xsmall'))};
  align-items: center;
  background-color: ${themeVal('color.primary')};
  color: #fff;
  box-shadow: ${themeVal('boxShadow.elevationD')};
  clip-path: polygon(0 0, 100% 0, 100% 200%, 0% 200%);
  padding: ${glsp(
    0,
    themeVal('layout.gap.xsmall'),
    0.75,
    themeVal('layout.gap.xsmall')
  )};
  animation: ${reveal} 0.32s ease 0s 1;

  ${media.mediumUp`
    grid-gap: ${glsp(0, themeVal('layout.gap.medium'))};
    padding: ${glsp(
      0,
      themeVal('layout.gap.medium'),
      1,
      themeVal('layout.gap.medium')
    )};
  `}
`;

export const InpageHeadline = styled.div`
  display: inline-grid;
  grid-gap: ${glsp(0.5)};
  align-items: center;

  ${media.mediumUp`
    grid-gap: ${glsp(1)};
  `}

  > * {
    grid-row: 1;
  }
`;

export const InpageTitle = styled(Heading)`
  ${truncated()}
  font-size: 1rem;
  line-height: 1;
  margin: 0;

  ${media.mediumUp`
    font-size: 1.25rem;
  `}
`;

export const InpageSubtitle = styled.p`
  ${headingAlt()}
  grid-column: 1;
  font-size: 0.875rem;
  line-height: 1;
  margin: 0;
  transform: translateY(0.075em);

  a,
  a:visited {
    display: block;
    color: inherit;
  }

  ${media.mediumUp`
    font-size: 1rem;
  `}
`;

export const InpageActions = styled.div`
  display: inline-grid;
  grid-gap: ${glsp(0.5)};
  align-items: center;
  margin-left: auto;

  > * {
    grid-row: 1;
  }
`;

export const InpageBody = styled.div`
  background: transparent;
  animation: ${reveal} 0.48s ease 0s 1;
`;
