import styled from 'styled-components';

import { themeVal, glsp } from '@devseed-ui/theme-provider';
import { SupHeading } from './typography/supheading';

export const Panel = styled.section`
  display: flex;
  flex-flow: column nowrap;
  width: 18rem;
`;

export const PanelHeader = styled.header``;

export const PanelTitle = styled.h1``;

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
`;

export const PanelSectionHeadline = styled.div``;

export const PanelSectionTitle = styled.h1`
  font-size: 1.25rem;
  line-height: 2rem;
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
`;

export const PanelGroupHeader = styled.header`
  padding: ${glsp(0.25, themeVal('layout.gap.xsmall'))};
  background: ${themeVal('color.baseAlphaC')};
`;

export const PanelGroupTitle = styled(SupHeading).attrs({
  as: 'h1',
  variation: 'primary'
})`
  margin: 0;
`;

export const PanelGroupBody = styled.div`
  flex: 1;
  overflow: scroll;
`;