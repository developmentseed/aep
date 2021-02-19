import React from 'react';
import styled from 'styled-components';

import {
  glsp,
  themeVal,
  visuallyHidden,
  rgba
} from '@devseed-ui/theme-provider';

const PageFoot = styled.footer`
  ${visuallyHidden()}
`;

const PageFootInner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: ${glsp(1.5, 2)};
`;

const PageCredits = styled.p`
  color: ${rgba(themeVal('color.primary'), 0.64)};
`;

function PageFooter() {
  return (
    <PageFoot role='contentinfo'>
      <PageFootInner>
        <PageCredits>2021 Development Seed</PageCredits>
      </PageFootInner>
    </PageFoot>
  );
}

export default PageFooter;
