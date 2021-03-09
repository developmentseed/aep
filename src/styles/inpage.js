import styled, { css } from 'styled-components';

import {
  truncated,
  themeVal,
  visuallyHidden,
  glsp
} from '@devseed-ui/theme-provider';

export const Inpage = styled.article`
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr;

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
  grid-template-columns: repeat(12, 1fr);
  grid-gap: ${glsp(1, themeVal('layout.gap.xsmall'))};
  padding: ${glsp(themeVal('layout.gap.xsmall'))};
  align-items: end;
  background-color: ${themeVal('color.primary')};
  color: ${themeVal('color.baseLight')};
`;

export const InpageHeadline = styled.div`
  grid-column: 1 / span 6;
  display: flex;
  flex-flow: column;
  min-width: 0;

  > *:last-child {
    margin-bottom: 0;
  }
`;

export const InpageToolbar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding-left: ${glsp(2)};
  margin-left: auto;
`;

export const InpageNav = styled.nav`
  grid-column: 7 / span 6;
  text-align: right;
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

export const InpageBodyInner = styled.div`
  height: 100%;
`;
