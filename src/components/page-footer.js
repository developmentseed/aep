import React from 'react';
import styled from 'styled-components';

import { visuallyHidden } from '@devseed-ui/theme-provider';

const PageFooterSelf = styled.footer`
  ${visuallyHidden()}
`;

function PageFooter() {
  return (
    <PageFooterSelf role='contentinfo'>
      <p>
        <time dateTime={new Date().getFullYear()}>
          {new Date().getFullYear()}
        </time>
      </p>
    </PageFooterSelf>
  );
}

export default PageFooter;
