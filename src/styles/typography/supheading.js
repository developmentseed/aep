import styled from 'styled-components';

import { themeVal } from '@devseed-ui/theme-provider';

const getHeadingColor = ({ variation, theme }) => {
  if (variation === 'base') return theme.type.base.color;
  const variationColor = theme.color[variation];
  return variationColor || 'inherit';
};

export const SupHeading = styled.h1`
  font-family: ${themeVal('type.heading.family')};
  font-size: 0.875rem;
  line-height: 1rem;
  text-transform: none;
  font-weight: normal;
  font-style: normal;
  font-variation-settings: normal;

  /* Colors */
  color: ${getHeadingColor};
`;
