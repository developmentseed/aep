import styled from 'styled-components';

import { glsp, media, themeVal } from '@devseed-ui/theme-provider';
import { Heading } from '@devseed-ui/typography';
import { headingAlt } from '@devseed-ui/typography';

export const Panel = styled.section`
  position: relative;
  z-index: 20;
  display: flex;
  flex-flow: column nowrap;
  width: 18rem;
  box-shadow: ${themeVal('boxShadow.elevationD')};

  ${media.mediumUp`
    width: 20rem;
  `}

  ${media.xlargeUp`
    width: 22rem;
  `}
`;

export const PanelHeader = styled.header`
  padding: ${glsp(0.5, themeVal('layout.gap.xsmall'))};

  ${media.mediumUp`
    padding: ${glsp(0.5, themeVal('layout.gap.medium'))};
  `}
`;

export const PanelTitle = styled(Heading)``;

export const PanelBody = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
`;

export const PanelSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
`;

export const PanelSectionHeader = styled.header`
  padding: ${glsp(0.5, themeVal('layout.gap.xsmall'))};

  ${media.mediumUp`
    padding: ${glsp(0.75, themeVal('layout.gap.medium'))};
  `}
`;

export const PanelSectionHeadline = styled.div``;

export const PanelSectionTitle = styled(Heading)`
  font-size: 1rem;
  line-height: 1.5rem;
  margin: 0;
`;

export const PanelSectionBody = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
`;

export const PanelGroup = styled.section`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  box-shadow: 0 -1px 0 0 ${themeVal('color.baseAlphaC')};
  padding: ${glsp(0.5, 0, 0, 0)};
`;

export const PanelGroupHeader = styled.header`
  padding: ${glsp(0.25, themeVal('layout.gap.xsmall'))};

  ${media.mediumUp`
    padding: ${glsp(0.5, themeVal('layout.gap.medium'))};
  `}
`;

export const PanelGroupTitle = styled.p`
  ${headingAlt()}
  font-size: 0.875rem;
  line-height: 1rem;
  margin: 0;
`;

export const PanelGroupBody = styled.div`
  flex: 1;
`;
