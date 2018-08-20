import * as React from 'react';

import { EditorBoxLayout } from './style';
import 'react-quill/dist/quill.snow.css'; // ES6

interface Props {}

const EditorBox: React.SFC<Props> = ({ children }) => {
  return <EditorBoxLayout onClick={focus}>{children}</EditorBoxLayout>;
};

export default EditorBox;
