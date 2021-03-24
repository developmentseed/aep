import defaultsDeep from 'lodash.defaultsdeep';
import { tint } from 'polished';

export default function theme(uiTheme) {
  const baseColor = '#14213d';

  return defaultsDeep(
    {
      color: {
        base: baseColor,
        baseDark: baseColor,
        primary: '#5860ff',
        secondary: '#ffc700',
        link: '#5860ff'
      },
      type: {
        base: {
          color: tint(0.16, baseColor)
        }
      },
      layout: {
        // The gap is defined as a multiplier of the layout.space
        // The elements that use the gap should use it as a parameter for the glsp function
        gap: {
          xsmall: 1,
          small: 2,
          medium: 2,
          large: 2,
          xlarge: 3
        }
      }
    },
    uiTheme
  );
}
