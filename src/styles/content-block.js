import styled from 'styled-components';

import { glsp, media, themeVal } from '@devseed-ui/theme-provider';

import UniversalGridder from './universal-gridder';
import Prose from './typography/prose';

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

  ${media.mediumUp`
    padding: ${glsp(themeVal('layout.gap.medium'), 0)};
    grid-row-gap: ${glsp(themeVal('layout.gap.medium'))};
  `}

  ${media.largeUp`
    padding: ${glsp(themeVal('layout.gap.large'), 0)};
    grid-row-gap: ${glsp(themeVal('layout.gap.large'))};
  `}

  ${media.xlargeUp`
    padding: ${glsp(themeVal('layout.gap.xlarge'), 0)};
    grid-row-gap: ${glsp(themeVal('layout.gap.xlarge'))};
  `}

  > ${Prose} {
    grid-column: content-3 / content-11;
  }
`;
