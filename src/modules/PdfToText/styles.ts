import { createUseStyles } from 'react-jss';
import StyleTheme from 'typeDefs/styleTheme';
import { flexContainer } from 'utils/styleMixins/flex';

export default createUseStyles<string, unknown, StyleTheme>(theme => ({
  moduleContainer: {
    ...flexContainer({ alignItems: 'center', flexDirection: 'column' }),
  },
  statusBarContainer: {
    padding: theme.spacing(4),
  },
  dynamicProcessSection: {
    minHeight: theme.spacing(50),
    padding: theme.spacing(4),
    width: '100%',
    ...flexContainer({
      justifyContent: 'center',
      alignItems: 'stretch',
      flexDirection: 'column',
    }),
  },
}));
