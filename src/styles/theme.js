const theme = (uiTheme) => {
  return {
    ...uiTheme,
    color: {
      ...uiTheme.color,
      primary: uiTheme.color.baseDark,
      secondary: '#6A6262'
    }
  };
};

export default theme;
