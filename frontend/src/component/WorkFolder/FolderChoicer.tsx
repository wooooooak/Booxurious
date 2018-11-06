import * as React from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";

import { LayoutRightBox, Title } from "./style";
import { X } from "styled-icons/octicons/X";

import { FolderState } from "../../store/modules/Work";

const FolderContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  margin-top: 20px;
  justify-content: space-around;
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
  margin: 0 1em;
  margin-top: 15px;
  transition: background-color 0.5s 0s linear;
  background-color: #eaeaea;
  border-radius: 10px;
  :hover {
    h3 {
      color: black;
    }
    div {
      span {
        z-index: 999;
        display: inline-block;
      }
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
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const FolderName = styled.div`
  display: fixed;
  /* justify-content: center; */
  color: black;
  padding-top: 15px;
  width: 100%;
  div {
    width: 100%;
    text-align: center;
    position: relative;
  }
  span {
    display: none;
    position: relative;
    right: 2.2em;
  }
`;

interface Props {
  folderList: FolderState[] | null;
  onClickExistFolder(folder: FolderState): void;
  onClickFolderDeleteButton(id: string | null): void;
}

const mapFolderListToCard = (
  folderList: FolderState[],
  onClickExistFolder: (folder: FolderState) => void,
  onClickFolderDeleteButton: (id: string | null) => void
) => {
  return folderList.map((folder, index) => {
    return (
      <Folder key={index} onClick={() => onClickExistFolder(folder)}>
        <FolderImage image={folder.folderCoverImage} />
        <FolderName>
          <div>{folder.folderName}</div>
          <span>
            <X
              size={23}
              color="#566270"
              onClick={(e) => {
                e.stopPropagation();
                onClickFolderDeleteButton(folder.id);
              }}
            />
          </span>
        </FolderName>
      </Folder>
    );
  });
};

const FolderCoicer: React.SFC<Props> = ({ folderList, onClickExistFolder, onClickFolderDeleteButton }) => {
  return (
    <LayoutRightBox>
      <Title>기존 폴더에서 작업하기</Title>
      <FolderContainer>
        {folderList ? (
          mapFolderListToCard(folderList, onClickExistFolder, onClickFolderDeleteButton)
        ) : (
          <h2>첫 작품을 담을 폴더를 생성해보세요</h2>
        )}
      </FolderContainer>
    </LayoutRightBox>
  );
};

export default FolderCoicer;
