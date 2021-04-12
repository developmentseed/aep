import styled, { css } from 'styled-components';

import { glsp, media, themeVal } from '@devseed-ui/theme-provider';
import { Heading } from '@devseed-ui/typography';
import { headingAlt } from '@devseed-ui/typography';

export const Panel = styled.section`
  position: relative;
  z-index: 30;
  display: flex;
  flex-flow: column nowrap;
  max-width: 0;
  width: 100vw;
  box-shadow: ${themeVal('boxShadow.elevationD')};
  transition: max-width 0.16s ease 0s;

  ${({ revealed }) =>
    revealed &&
    css`
      max-width: 20rem;

      ${media.xlargeUp`
        max-width: 22rem;
      `}
    `}
`;

export const PanelHeader = styled.header`
  padding: ${glsp(0.5, themeVal('layout.gap.xsmall'))};

  ${media.mediumUp`
    padding: ${glsp(0.5, themeVal('layout.gap.medium'))};
  `}
`;

export const PanelTitle = styled(Heading)`
  /* No styled applied */
`;

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
  display: grid;
  grid-auto-columns: 1fr min-content;
  grid-gap: ${glsp(0.5, 1)};
  padding: ${glsp(0.5, themeVal('layout.gap.xsmall'))};

  ${media.mediumUp`
    padding: ${glsp(1, themeVal('layout.gap.medium'))};
  `}
`;

export const PanelSectionHeadline = styled.div`
  overflow: hidden;
`;

export const PanelSectionTitle = styled(Heading)`
  font-size: 1rem;
  line-height: 1.25rem;
  margin: 0;
`;

export const PanelSectionBody = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
`;

export const PanelGroup = styled.section`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;

  &::before {
    position: absolute;
    top: 0;
    left: ${glsp(themeVal('layout.gap.xsmall'))};
    right: 0;
    content: '';
    pointer-events: none;
    height: 1px;
    background: ${themeVal('color.baseAlphaC')};

    ${media.mediumUp`
      left: ${glsp(themeVal('layout.gap.medium'))};
    `}
  }
`;

export const PanelGroupHeader = styled.header`
  padding: ${glsp(
    0.75,
    themeVal('layout.gap.xsmall'),
    0.25,
    themeVal('layout.gap.xsmall')
  )};

  ${media.mediumUp`
    padding: ${glsp(
      1,
      themeVal('layout.gap.medium'),
      0.5,
      themeVal('layout.gap.medium')
    )};
  `}
`;

export const PanelGroupTitle = styled.p`
  ${headingAlt()}
  font-size: 0.875rem;
  line-height: 1rem;
  margin: 0;
  overflow: hidden;
`;

export const PanelGroupBody = styled.div`
  flex: 1;
`;
