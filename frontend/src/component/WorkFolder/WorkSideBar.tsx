import * as React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { AngleLeft } from 'styled-icons/fa-solid/AngleLeft';
import { AngleRight } from 'styled-icons/fa-solid/AngleRight';
import { WorkState } from '../../store/modules/Work';

interface ContainerProps {
  showSideBarState: boolean;
}

const Container = styledTS<ContainerProps>(styled.div)`
  position: fixed;
  display: flex;
  width: 420px;
  transition: left 0.3s linear;
  left: ${(props) => (props.showSideBarState ? '0px' : '-390px')};
  top: 70px;
  height: 100%;
`;

const BarLayout = styled.div`
  width: 400px;
  background-color: #e5e5e5;
  display: flex;
  flex-direction: column;
  align-items: center;
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

interface Props {
  folderName: string;
  image: string;
  workList: WorkState[];
  onClickOtherChapter(chapterNumber: number): void;
}

interface State {
  showSidebarState: boolean;
}

class WorkSideBar extends React.Component<Props, State> {
  state = {
    showSidebarState: true
  };

  onClickToggleSideBar = () => {
    this.setState({
      showSidebarState: !this.state.showSidebarState
    });
  };

  mapWorkListToChapterli = (workList: WorkState[]) => {
    return workList.map((work, index) => {
      <li key={index} onClick={() => this.props.onClickOtherChapter(0)}>
        <span>{work.chapter} </span> {work.title}{' '}
      </li>;
    });
  };

  // todos
  // li에 work마다 id를 걸어놓고 클릭하면 그 내용을 편집할 수 있게 하기
  render () {
    console.log(this.props.workList.length);
    return (
      <Container showSideBarState={this.state.showSidebarState}>
        <BarLayout>
          <Img image={this.props.image} />
          <FolderName>{this.props.folderName}</FolderName>
          {this.props.workList.length !== 0 ? (
            <ul>{this.mapWorkListToChapterli(this.props.workList)}</ul>
          ) : (
            <ul>
              {' '}
              <ul>
                <li onClick={() => this.props.onClickOtherChapter(0)}>
                  데이터가 없을 경우를 위한 샘플입니다
                </li>
                <li onClick={() => this.props.onClickOtherChapter(1)}>
                  work의 chapter이름 & id
                </li>
                <li onClick={() => this.props.onClickOtherChapter(2)}>
                  work의 chapter이름 & id
                </li>
              </ul>
            </ul>
          )}

          <button>추가하기</button>
        </BarLayout>
        <ButtonLine>
          {this.state.showSidebarState ? (
            <AngleLeft
              size={40}
              onClick={this.onClickToggleSideBar}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <AngleRight
              size={40}
              onClick={this.onClickToggleSideBar}
              style={{ cursor: 'pointer' }}
            />
          )}
        </ButtonLine>
      </Container>
    );
  }
}

export default WorkSideBar;
