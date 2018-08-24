import * as React from 'react';
import * as ReactQuill from 'react-quill';
import axios from 'axios';

import WorkSideBar from '../component/WorkFolder/WorkSideBar';
// import WorkWriter from '../component/WorkFolder/WorkWriter';
import { FolderState, WorkState } from '../store/modules/Work';
import { QuillStyle } from '../component/WorkFolder/style';

interface Props {
  folder: FolderState;
}

interface State {
  workList: WorkState[];
  content: string;
  currentWork: WorkState;
}

const Quill = ReactQuill as any;

let modules: object = {};
const toolbarContainer: any[] = [
  [ { font: [ 'miraza', 'roboto', 'amam' ] } ],
  [ { header: [ 1, 2, false ] } ],
  [ 'bold', 'italic', 'underline', 'strike', 'blockquote' ],
  [ { list: 'ordered' }, { list: 'bullet' } ],
  [ 'link', 'image' ],
  [ { align: [] } ],
  [ 'clean' ]
];
const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'align'
];

// todos
// quill에디터를 붙여서 work쓰기 작업완성하고
// 사이드바의 챕터를 선택시
// work의 내용 바뀌게 하기.
// 사이드바를 누를 경우 현재 작성중인 글을 저장할지 물어보고 이동 시켜야 할듯
class WorkContainer extends React.Component<Props, State> {
  state = {
    workList: [],
    content: '',
    currentWork: {
      id: null,
      content: '',
      chapter: 1,
      title: ''
    }
  };
  componentDidMount () {
    modules = {
      toolbar: {
        container: toolbarContainer
      }
    };
    this.fetchWorkList(this.props.folder.id);
    this.setState({});
  }

  fetchWorkList = async (id: string | null) => {
    const workList = await axios({
      method: 'get',
      url: 'http://localhost:8080/work/list',
      params: { id }
    });
    console.log(workList);
    if (workList[0]) {
      this.setState({
        currentWork: workList[0]
      });
    } else {
      this.setState({
        currentWork: {
          ...this.state.currentWork,
          title: '첫 작성을 하세요'
        }
      });
    }
  };

  onClickOtherChapter = (chapterNumber: number) => {
    console.log(`챕터 ${chapterNumber} 을 클릭하였습니다. `);
    if (!this.state.workList[chapterNumber]) {
      console.log('그러나 실제 db에 해당 폴더의 작품 리스트가 없습니다.');
      return;
    }
    this.setState({
      currentWork: this.state.workList[chapterNumber]
    });
  };

  render () {
    return (
      <div
        style={{
          display: 'flex',
          alignSelf: 'flex-start',
          height: '100vh',
          marginTop: '80px'
        }}
      >
        <WorkSideBar
          folderName={this.props.folder.folderName}
          image={this.props.folder.folderCoverImage}
          workList={this.state.workList}
          onClickOtherChapter={this.onClickOtherChapter}
        />
        {/* <WorkWriter /> */}
        <QuillStyle>
          <div>
            <h2>{this.state.currentWork.title}</h2>
          </div>
          <Quill
            theme="snow"
            value={this.state.content}
            modules={modules}
            formats={formats}
          />
        </QuillStyle>
      </div>
    );
  }
}

export default WorkContainer;
