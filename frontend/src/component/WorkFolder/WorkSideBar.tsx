import * as React from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";

import { device } from "../../styled/device";
import { AngleLeft } from "styled-icons/fa-solid/AngleLeft";
import { AngleRight } from "styled-icons/fa-solid/AngleRight";
import { WorkState } from "../../store/modules/Work";

interface ContainerProps {
  showSideBarState: boolean;
}

const Container = styledTS<ContainerProps>(styled.div)`
  position: fixed;
  display: flex;
  width: 420px;
  transition: left 0.3s linear;
  left: ${(props) => (props.showSideBarState ? "0px" : "-390px")};
  top: 70px;
  height: 100%;
  
  @media ${device.laptopL} {
    left: ${(props) => (props.showSideBarState ? "0px" : "-350px")};
  }
`;

const BarLayout = styled.div`
  width: 400px;
  background-color: #e5e5e5;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.laptopL} {
    width: 350px;
  }
`;
const ButtonLine = styled.div`
  width: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface ImgProps {
  image: string;
}

const Img = styledTS<ImgProps>(styled.div)`
  width: 100%;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
  height: 250px;
`;

const FolderName = styled.h1`color: black;`;

const Ul = styled.ul`margin-bottom: 1.5em;`;

const WorkListTitle = styled.li`
  @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic');
  list-style: none;
  height: 1.2em;
  font-size: 1.2em;
  font-family: 'Nanum Gothic', sans-serif;
  margin-bottom: 5px;
`;

const ListWrapper = styled.ul`
  margin-left: -5em;
  display: flex;
  position: relative;
`;

interface ActiveMakerProps {
  offset?: number;
}

export const ActiveMaker = styledTS<ActiveMakerProps>(styled.i)`
  width: 7px;
  height: 7px;
  background-image: linear-gradient(90deg, #ff5e5e, #f54985);
  background-size: 100%;
  margin-left: -1px;
  margin-top: 10px;
  border-radius: 50%;
  transition: transform 0.4s;
  transform: translateY(${(props) => props.offset}px);
`;

interface Props {
  folderName: string;
  image: string;
  workList: WorkState[];
  onClickOtherChapter(chapterNumber: number): void;
  onClickAddWorkButton(): void;
  onClickChoiceFolder(): void;
}

interface State {
  showSidebarState: boolean;
  activeMakerOffset: number;
}

class WorkSideBar extends React.Component<Props, State> {
  state = {
    showSidebarState: true,
    activeMakerOffset: 0
  };

  onClickToggleSideBar = () => {
    this.setState({
      showSidebarState: !this.state.showSidebarState
    });
  };

  togleActive = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    const offset: number = this.getItemOffset(e.currentTarget);
    this.setState({
      activeMakerOffset: offset
    });
    this.props.onClickOtherChapter(index);
  };

  getItemOffset = (item: EventTarget & HTMLElement): number => {
    return item.offsetTop;
  };

  mapWorkListToChapterli = (workList: WorkState[]) => {
    return workList.map((work, index) => {
      return (
        <WorkListTitle style={{ cursor: "pointer" }} key={index} onClick={(e) => this.togleActive(e, index)}>
          <span>{work.title}</span>
        </WorkListTitle>
      );
    });
  };

  render () {
    console.log(this.state.activeMakerOffset);
    return (
      <Container showSideBarState={this.state.showSidebarState}>
        <BarLayout>
          <Img image={this.props.image} />
          <FolderName>{this.props.folderName}</FolderName>
          {this.props.workList.length !== 0 ? (
            <React.Fragment>
              <ListWrapper>
                <ActiveMaker offset={this.state.activeMakerOffset} />
                <Ul>{this.mapWorkListToChapterli(this.props.workList)}</Ul>
              </ListWrapper>
              <button onClick={this.props.onClickAddWorkButton}>추가하기</button>
            </React.Fragment>
          ) : (
            <p>오른쪽 에디터에서 첫 원고를 작성해 보세요!</p>
          )}
          <button onClick={this.props.onClickChoiceFolder}>돌아가기</button>
        </BarLayout>
        <ButtonLine>
          {this.state.showSidebarState ? (
            <AngleLeft size={40} onClick={this.onClickToggleSideBar} style={{ cursor: "pointer" }} />
          ) : (
            <AngleRight size={40} onClick={this.onClickToggleSideBar} style={{ cursor: "pointer" }} />
          )}
        </ButtonLine>
      </Container>
    );
  }
}

export default WorkSideBar;
