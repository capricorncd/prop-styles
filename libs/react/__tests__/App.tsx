import { usePropStyles, type ReactBaseProps } from '../src';

interface Props extends ReactBaseProps {}

export const App = (props: Props) => {
  const { style } = usePropStyles(props);

  return <div style={style}>{props.children}</div>;
};
