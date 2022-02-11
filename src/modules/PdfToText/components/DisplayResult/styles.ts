import { createUseStyles } from 'react-jss';
import StyleTheme from 'typeDefs/styleTheme';
import { flexContainer } from 'utils/styleMixins/flex';

export default createUseStyles<string, unknown, StyleTheme>(({ spacing }) => ({
  actionsArea: {
    height: spacing(8),
    marginTop: spacing(2),
    ...flexContainer({ alignItems: 'center', justifyContent: 'flex-end' }),
  },
  buttonsGroup: {
    marginLeft: 'auto',
    ...flexContainer({}),
    '& > *': { marginLeft: spacing(2) },
  },
}));
