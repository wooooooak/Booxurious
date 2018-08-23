import * as React from 'react';
import axios from 'axios';

import WorkSideBar from '../component/WorkFolder/WorkSideBar';
import WorkWriter from '../component/WorkFolder/WorkWriter';
import { FolderState, WorkState } from '../store/modules/Work';

interface Props {
  folder: FolderState;
}

interface State {
  workList: WorkState[];
}

// todos
// quill에디터를 붙여서 work쓰기 작업완성하고
// 사이드바의 챕터를 선택시
// work의 내용 바뀌게 하기.
// 사이드바를 누를 경우 현재 작성중인 글을 저장할지 물어보고 이동 시켜야 할듯
class WorkContainer extends React.Component<Props, State> {
  state = {
    workList: []
  };
  componentDidMount () {
    console.log(this.props.folder);
    this.fetchWorks(this.props.folder.id);
  }

  fetchWorks = async (id: string | null) => {
    const result = await axios({
      method: 'get',
      url: 'http://localhost:8080/work/list',
      params: { id }
    });
    console.log(result);
  };

  render () {
    return (
      <div style={{ display: 'flex' }}>
        <WorkSideBar
          folderName={this.props.folder.folderName}
          image={this.props.folder.folderCoverImage}
          works={this.state.workList}
        />
        <WorkWriter />
      </div>
    );
  }
}

export default WorkContainer;
