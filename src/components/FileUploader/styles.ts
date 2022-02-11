import { createUseStyles } from 'react-jss';
import StyleTheme from 'typeDefs/styleTheme';

export default createUseStyles<string, unknown, StyleTheme>(({ spacing }) => ({
  uploaderContainer: {
    padding: spacing(4),
  },
}));
