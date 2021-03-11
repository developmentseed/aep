import styled from 'styled-components';

import { themeVal, glsp } from '@devseed-ui/theme-provider';

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
  padding: ${glsp(2, 0)};
  grid-row-gap: ${glsp(themeVal('layout.gap.xsmall'))};

  > ${Prose} {
    grid-column: content-3 / content-11;
  }
`;
