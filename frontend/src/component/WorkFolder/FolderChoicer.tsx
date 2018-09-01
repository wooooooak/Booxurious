import * as React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { LayoutRightBox, Title } from './style';
import { FolderState } from '../../store/modules/Work';

const FolderContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  justify-content: space-around;
  /* overflow-x: hidden; */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Folder = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.5s 0s linear;
  :hover {
    background-color: white;
    h3 {
      color: black;
    }
  }
`;

interface FolderImageProps {
  image: string;
}

const FolderImage = styledTS<FolderImageProps>(styled.div)`
  width: 100%;
  height: 70%;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
`;

const FolderName = styled.h3`
  color: black;
  padding-top: 15px;
`;

interface Props {
  folderList: FolderState[] | null;
  onClickExistFolder(folder: FolderState): void;
}

const mapFolderListToCard = (
  folderList: FolderState[],
  onClickExistFolder: (folder: FolderState) => void
) => {
  return folderList.map((folder, index) => {
    return (
      <Folder key={index} onClick={() => onClickExistFolder(folder)}>
        <FolderImage image={folder.folderCoverImage} />
        <FolderName>{folder.folderName}</FolderName>
      </Folder>
    );
  });
};

const FolderCoicer: React.SFC<Props> = ({ folderList, onClickExistFolder }) => {
  return (
    <LayoutRightBox>
      <Title>기존 폴더에서 작업하기</Title>
      <FolderContainer>
        {folderList ? (
          mapFolderListToCard(folderList, onClickExistFolder)
        ) : (
          <h2>첫 작품을 담을 폴더를 생성해보세요</h2>
        )}
      </FolderContainer>
    </LayoutRightBox>
  );
};

export default FolderCoicer;
