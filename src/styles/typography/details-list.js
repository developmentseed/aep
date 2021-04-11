import styled from 'styled-components';

import { glsp, media, themeVal } from '@devseed-ui/theme-provider';
import { headingAlt } from '@devseed-ui/typography';

const DetailsList = styled.dl`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${glsp(0, 1)};

  ${media.smallUp`
    grid-template-columns: minmax(min-content, max-content) 1fr;
    grid-gap: ${glsp(0.25, 2)};
  `}

  dt {
    ${headingAlt()}
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: ${glsp(0.125, 0)};
  }

  dd {
    font-weight: ${themeVal('type.base.bold')};
    font-size: 1rem;
    line-height: 1.5rem;

    &:not(:last-child) {
      margin-bottom: ${glsp(0.5)};

      ${media.smallUp`
        margin-bottom: 0;
      `}
    }
  }
`;

export default DetailsList;
