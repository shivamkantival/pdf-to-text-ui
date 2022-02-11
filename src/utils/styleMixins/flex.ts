export function flexContainer(
  options: {
    justifyContent?: 'flex-start' | 'center' | 'space-between' | 'flex-end';
    flexDirection?: 'row' | 'column';
    alignItems?: 'flex-start' | 'center' | 'stretch';
  } = {}
) {
  return {
    display: 'flex',
    flexDirection: 'row',
    ...options,
  };
}
