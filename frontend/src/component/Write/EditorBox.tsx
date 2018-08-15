import * as React from 'react';

import { EditorBoxLayout } from './style';

interface Props {
  focus(): void;
}

const EditorBox: React.SFC<Props> = ({ focus, children }) => {
  return <EditorBoxLayout onClick={focus}>{children}</EditorBoxLayout>;
};

export default EditorBox;
