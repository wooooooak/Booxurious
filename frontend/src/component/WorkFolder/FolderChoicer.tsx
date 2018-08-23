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
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface FolderImageProps {
  image: string;
}

const FolderImage = styledTS<FolderImageProps>(styled.div)`
  width: 100%;
  height: 60%;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
`;

const FolderName = styled.p`color: white;`;

interface Props {
  folderList: FolderState[] | null;
}

const mapFolderListToCard = (folderList: FolderState[]) => {
  return folderList.map((folder, index) => {
    return (
      <Folder key={index}>
        <FolderImage image={folder.folderCoverImage} />
        <FolderName>{folder.folderName}</FolderName>
      </Folder>
    );
  });
};

const FolderCoicer: React.SFC<Props> = ({ folderList }) => {
  console.log(folderList);
  return (
    <LayoutRightBox>
      <Title>기존 폴더에서 작업하기</Title>
      <FolderContainer>
        {folderList ? mapFolderListToCard(folderList) : <h2>첫 작품을 담을 폴더를 생성해보세요</h2>}
      </FolderContainer>
    </LayoutRightBox>
  );
};

export default FolderCoicer;
