import styled, { css } from 'styled-components';

import {
  glsp,
  media,
  themeVal,
  truncated,
  visuallyHidden
} from '@devseed-ui/theme-provider';

export const Inpage = styled.article`
  display: grid;
  height: 100%;
  grid-template-rows: min-content 1fr;

  /**
   * Make Inpage map-centric
   *
   * Visually hides inpageHeader and sets the grid layout to a single row.
   * The latter is needed so that inpageBody can be displayed in full height.
   */

  ${({ isMapCentric }) =>
    isMapCentric &&
    css`
      grid-template-rows: 1fr;
      ${InpageHeader} {
        ${visuallyHidden()}
      }
    `}
`;

export const InpageHeader = styled.header`
  /* Visually hidden */
  ${({ isHidden }) =>
    isHidden &&
    css`
      ${visuallyHidden()}
    `}
`;

export const InpageHeaderInner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${glsp(1, themeVal('layout.gap.xsmall'))};
  align-items: end;
  padding: ${glsp(1, themeVal('layout.gap.xsmall'))};
  background-color: ${themeVal('color.primary')};
  color: ${themeVal('color.baseLight')};

  ${media.mediumUp`
    grid-template-columns: repeat(8, 1fr);
    padding: ${glsp(1, themeVal('layout.gap.medium'))};
    grid-gap: ${glsp(1, themeVal('layout.gap.medium'))};
  `}

  ${media.largeUp`
    grid-template-columns: repeat(12, 1fr);
    grid-column: content-2 / content-12;
  `}
`;

export const InpageHeadline = styled.div`
  grid-column: 1 / span 4;
  display: flex;
  flex-flow: column;
  min-width: 0;

  ${media.mediumUp`
    grid-column: 1 / span 4;
  `}

  ${media.largeUp`
    grid-column: 1 / span 8;
  `}

  > *:last-child {
    margin-bottom: 0;
  }
`;

export const InpageNav = styled.nav`
  grid-column: 1 / span 4;

  ${media.mediumUp`
    grid-column: 5 / span 4;
    text-align: right;
  `}

  ${media.largeUp`
    grid-column: 9 / span 4;
  `}
`;

export const InpageTitleWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  min-width: 0;
  margin-bottom: ${glsp(1.5)};
`;

export const InpageTitle = styled.h1`
  ${truncated()}
  font-size: 1.5rem;
  line-height: 2rem;
  margin: 0;
`;

export const InpageSubtitle = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  margin: 0;
`;

export const InpageBody = styled.div`
  background: transparent;
`;
