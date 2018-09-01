import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import styledTS from 'styled-components-ts';

import { LayoutLeftBox, Title } from './style';
import { Upload } from 'styled-icons/feather/Upload';

interface FolderCoverProps {
  source: string | null;
}

const FolderCoverArea = styledTS<FolderCoverProps>(styled.div)`
  width: 700px;
  height: 300px;
  background-image: url('${(props) => props.source}');
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FileUploaderButton = styled.input.attrs({
  type: 'file'
})`
  position: absolute;
  width: 700px;
  height: 300px;
  opacity: 0;
  background-color: white;
  cursor: pointer;
`;

const P = styled.p`color: black;`;

const FormArea = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input.attrs({
  placeholder: '책 제목'
})`
  height: 1.5em;
  background: transparent;
  color: black;
  border: none;
  border-bottom-color: black;
  border-bottom-width: 1px;
  border-bottom-style: solid;
`;

const buttonHover = keyframes`
  0%{
    background-color: transparent;
    color: black;
  }
  100%{
    background-color: black;
    color: white;
  }
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  background-color: transparent;
  margin-top: 25px;
  color: black;
  border-radius: 15px;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  cursor: pointer;
  &:hover {
    animation: ${buttonHover} 0.5s 0s forwards;
  }
`;

interface Props {
  coverImgSource: string;
  onChangeCoverImgHandler(e: FileList | null): void;
  onChangeFolderName(e: React.FormEvent<HTMLInputElement>): void;
  makeFolderHandler(): void;
}

const MakingForm: React.SFC<Props> = ({
  onChangeCoverImgHandler,
  onChangeFolderName,
  coverImgSource,
  makeFolderHandler,
  children
}) => (
  <LayoutLeftBox>
    <Title>새로운 책 폴더 만들기</Title>
    <FileUploaderButton onChange={(e) => onChangeCoverImgHandler(e.target.files)} />
    <FolderCoverArea source={coverImgSource}>
      <Upload size={40} color="#E0E3DA" />
      <P>책과 어울리는 대표 이미지를 선택할 수 있어요</P>
    </FolderCoverArea>
    <FormArea>
      <Input type="text" onChange={onChangeFolderName} />
      {children}
      <Button onClick={makeFolderHandler}>make folder</Button>
    </FormArea>
  </LayoutLeftBox>
);

export default MakingForm;
