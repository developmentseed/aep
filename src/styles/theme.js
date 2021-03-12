const theme = (uiTheme) => {
  return {
    ...uiTheme,
    color: {
      ...uiTheme.color,
      primary: uiTheme.color.baseDark,
      secondary: '#6A6262'
    },
    layout: {
      ...uiTheme.layout,
      // The gap is defined as a multiplier of the layout.space
      // The elements that use the gap should use it as a parameter for the glsp function
      gap: {
        xsmall: 1,
        small: 1,
        medium: 2,
        large: 2,
        xlarge: 2
      },
      max: '1440px'
    }
  };
};

export default theme;
