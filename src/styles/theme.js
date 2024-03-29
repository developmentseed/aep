import defaultsDeep from 'lodash.defaultsdeep';
import { tint } from 'polished';

export default function theme(uiTheme) {
  const baseColor = '#14213d';
  const fontFamily = '"Rubik", sans-serif';

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
          color: tint(0.16, baseColor),
          family: fontFamily,
          light: '300',
          regular: '300',
          medium: '500',
          bold: '500',
          weight: '300'
        },
        heading: {
          family: fontFamily,
          weight: '500'
        },
        button: {
          family: fontFamily,
          weight: '500',
          case: 'uppercase'
        }
      },
      layout: {
        min: '368px',
        // The gap is defined as a multiplier of the layout.space
        // The elements that use the gap should use it as a parameter for the glsp function
        gap: {
          xsmall: 1,
          small: 1,
          medium: 1.5,
          large: 1.5,
          xlarge: 1.5
        }
      }
    },
    uiTheme
  );
}
