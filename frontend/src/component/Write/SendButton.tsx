import * as React from 'react';
import { Button } from './style';

interface Props {
  onClickSubmit(): void;
}

const SendButton: React.SFC<Props> = ({ onClickSubmit }) => {
  return <Button onClick={onClickSubmit}>작성완료</Button>;
};

export default SendButton;
