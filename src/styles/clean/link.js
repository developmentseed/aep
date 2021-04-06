import { Link as Link$ } from 'gatsby';

import { filterComponentProps } from '../utils/general';

// See documentation of filterComponentProp as to why this is
const propsToFilter = [
  'variation',
  'size',
  'hideText',
  'useIcon',
  'active',
  'visuallyDisabled'
];

export const Link = filterComponentProps(Link$, propsToFilter);
