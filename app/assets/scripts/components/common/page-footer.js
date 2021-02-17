import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import {
  glsp,
  stylizeFunction,
  themeVal,
  visuallyHidden
} from '@devseed-ui/theme-provider';

const _rgba = stylizeFunction(rgba);

const PageFoot = styled.footer`
  ${visuallyHidden()}
  background-color: ${themeVal('color.surface')};
  font-size: 0.875rem;
  line-height: 1rem;
`;

const PageFootInner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: ${glsp(1.5, 2)};
`;

const PageCredits = styled.p`
  color: ${_rgba(themeVal('color.primary'), 0.64)};
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

PageFooter.propTypes = {};

export default PageFooter;
