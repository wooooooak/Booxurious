import * as React from 'react';

import { EditorBoxLayout } from './style';
import 'react-quill/dist/quill.snow.css'; // ES6

interface Props {
  isAffixToolbar: boolean;
}

const EditorBox: React.SFC<Props> = ({ children, isAffixToolbar }) => {
  return (
    <EditorBoxLayout isAffixToolbar={isAffixToolbar} onClick={focus}>
      {children}
    </EditorBoxLayout>
  );
};

export default EditorBox;
