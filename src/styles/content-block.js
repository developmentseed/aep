import styled, { css } from 'styled-components';

import { glsp, media, multiply, themeVal } from '@devseed-ui/theme-provider';

import UniversalGridder from './universal-gridder';
import Prose from './typography/prose';

const renderContentBlockLayout = ({ layout }) => {
  switch (layout) {
    case 'asided':
      return css`
        > ${Prose} {
          grid-column: content-start / content-end;

          ${media.largeUp`
            grid-column: content-start / span 8;
          `}

          ${media.xlargeUp`
            grid-column: content-start / span 7;
          `}
        }
      `;
    // Default: single column
    default:
      return css`
        > ${Prose} {
          grid-column: content-start / content-end;

          ${media.largeUp`
            grid-column: content-3 / span 8;
          `}
        }
      `;
  }
};

export const ContentBlock = styled(UniversalGridder).attrs({
  as: 'div',
  grid: {
    smallUp: ['full-start', 'full-end'],
    mediumUp: ['full-start', 'full-end'],
    largeUp: ['full-start', 'full-end']
  }
})`
  padding: ${glsp(themeVal('layout.gap.xsmall'), 0)};
  grid-row-gap: ${glsp(themeVal('layout.gap.xsmall'))};

  ${media.smallUp`
    padding: ${glsp(themeVal('layout.gap.small'), 0)};
    grid-row-gap: ${glsp(themeVal('layout.gap.small'))};
  `}

  ${media.mediumUp`
    padding: ${glsp(themeVal('layout.gap.medium'), 0)};
    grid-row-gap: ${glsp(themeVal('layout.gap.medium'))};
  `}

  ${media.largeUp`
    padding: ${glsp(themeVal('layout.gap.large'), 0)};
    grid-row-gap: ${glsp(themeVal('layout.gap.large'))};
    grid-template-rows: min-content;
    grid-auto-rows: 1fr;
  `}

  ${media.xlargeUp`
    padding: ${glsp(multiply(themeVal('layout.gap.xlarge'), 2), 0)};
    grid-row-gap: ${glsp(themeVal('layout.gap.xlarge'))};
  `}

  ${renderContentBlockLayout}
`;

export const Aside = styled.aside`
  grid-column: content-start / content-end;

  ${media.largeUp`
    grid-column: content-9 / span 4;
    grid-row: 1 / span 2;
  `}

  ${media.xlargeUp`
    grid-column: content-9 / span 4;
  `}
`;
