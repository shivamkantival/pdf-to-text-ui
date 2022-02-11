import { FC } from 'react';
import { ThemeProvider } from 'react-jss';
import StyleTheme from 'typeDefs/styleTheme';

const theme: StyleTheme = {
  spacing: factor => `${factor * 0.25}rem`,
};

const StyledThemeProvider: FC<{}> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default StyledThemeProvider;
