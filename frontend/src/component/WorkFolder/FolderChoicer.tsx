import * as React from 'react';
import { LayoutRightBox, Title } from './style';

const FolderCoicer: React.SFC = () => (
  <LayoutRightBox>
    <Title>기존 폴더에서 작업하기</Title>
    <ul>
      <li>폴더 1</li>
      <li>폴더 2</li>
      <li>폴더 3</li>
      <li>폴더 4</li>
    </ul>
  </LayoutRightBox>
);

export default FolderCoicer;
