import styled from 'styled-components';

import { glsp } from '@devseed-ui/theme-provider';
import { headingAlt } from '@devseed-ui/typography';

const Dl = styled.dl`
  font-feature-settings: 'pnum' 0; /* Use proportional numbers */
  dt {
    ${headingAlt()}
    margin: ${glsp(0, 0, 1 / 4, 0)};
  }
  dd {
    margin: ${glsp(0, 0, 1, 0)};
  }
`;

export default Dl;
