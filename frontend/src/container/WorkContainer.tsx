import * as React from 'react';
import * as ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { CurrentWorkAndFolderState } from '../store/modules/Work';
import { actionCreators as workActionCreator } from '../store/modules/Work';
import { IStoreState } from '../store/modules';

import WorkSideBar from '../component/WorkFolder/WorkSideBar';
import { WorkState } from '../store/modules/Work';
import { QuillStyle } from '../component/WorkFolder/style';
import ButtonGroup from '../component/WorkFolder/ButtonGroup';

type StoreProps = CurrentWorkAndFolderState;

interface DispatchProps {
  workAndFolderAction: typeof workActionCreator;
}

interface OwnProps {}

interface Props extends StoreProps, DispatchProps {
  onClickChoiceFolder(): void;
}

interface State {
  workList: WorkState[];
  isAddWorkMode: boolean;
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
    workList: [] as WorkState[],
    isAddWorkMode: false,
    currentWork: {
      id: null,
      content: '',
      title: ''
    }
  };

  private quill: typeof Quill;

  constructor (props: any) {
    super(props);
    this.quill = React.createRef();
  }
  componentDidMount () {
    modules = {
      toolbar: {
        container: toolbarContainer
      }
    };
    this.fetchWorkList(this.props.currentFolder.id);
  }

  fetchWorkList = async (id: string | null) => {
    const result = await axios({
      method: 'get',
      url: 'http://localhost:8080/work/list',
      params: { id }
    });
    if (this.isWorkExist(result.data)) {
      this.setState({
        workList: result.data,
        currentWork: result.data[result.data.length - 1]
      });
      this.props.workAndFolderAction.changeWork(result.data[result.data.length - 1]);
    } else {
      this.setState({
        workList: [] as WorkState[],
        currentWork: {
          id: null,
          content: '',
          title: ''
        }
      });
    }
  };

  isWorkExist = (workList: WorkState[]): boolean => {
    return workList[0] ? true : false;
  };

  onClickOtherChapter = (chapterNumber: number) => {
    this.setState({
      currentWork: this.state.workList[chapterNumber]
    });
  };

  onChangeContent = (content: string): void => {
    this.setState({
      currentWork: {
        ...this.state.currentWork,
        content
      }
    });
  };

  onChangeWorkTitle = (e: React.FormEvent<HTMLInputElement>): void => {
    const title = e.currentTarget.value;
    this.setState({
      currentWork: {
        ...this.state.currentWork,
        title
      }
    });
  };

  onClickSaveWork = async () => {
    const token: string | null = localStorage.getItem('token');
    const folderId: string | null = this.props.currentFolder.id;
    const workId: string | null = this.state.currentWork.id;
    const toBeSendData = {
      ...this.state.currentWork,
      folderId,
      workId
    };
    await axios({
      method: 'post',
      url: 'http://localhost:8080/work/newWork',
      data: toBeSendData,
      headers: { 'Auth-Header': token }
    });
    this.fetchWorkList(this.props.currentFolder.id);
  };

  onClickDeleteButton = async (workId: string) => {
    const token: string | null = localStorage.getItem('token');
    await axios({
      method: 'delete',
      url: 'http://localhost:8080/work/',
      data: { workId },
      headers: { 'Auth-Header': token }
    });
    this.fetchWorkList(this.props.currentFolder.id);
  };

  onClickAddWorkButton = async () => {
    const token: string | null = localStorage.getItem('token');
    const workList: WorkState[] = this.state.workList;
    const newWork = {
      folderId: this.props.currentFolder.id,
      workId: null,
      content: '',
      title: ''
    };
    const result = await axios({
      method: 'post',
      url: 'http://localhost:8080/work/newWork',
      data: newWork,
      headers: { 'Auth-Header': token }
    });
    workList.push(result.data);
    this.setState({
      workList,
      currentWork: {
        id: result.data.id as string,
        content: result.data.content as string,
        title: result.data.title as string
      }
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
          folderName={this.props.currentFolder.folderName}
          image={this.props.currentFolder.folderCoverImage}
          workList={this.state.workList}
          onClickOtherChapter={this.onClickOtherChapter}
          onClickAddWorkButton={this.onClickAddWorkButton}
          onClickChoiceFolder={this.props.onClickChoiceFolder}
        />
        {/* <WorkWriter /> */}
        <QuillStyle>
          <div>
            <input
              type="text"
              onChange={this.onChangeWorkTitle}
              value={this.state.currentWork.title}
              placeholder="제목"
            />
          </div>
          <Quill
            ref={this.quill}
            theme="snow"
            value={this.state.currentWork.content}
            onChange={this.onChangeContent}
            modules={modules}
            formats={formats}
          />
        </QuillStyle>
        <ButtonGroup
          onClickSaveWork={this.onClickSaveWork}
          onClickDeleteButton={this.onClickDeleteButton}
          workId={this.state.currentWork.id}
        />
      </div>
    );
  }
}

export default connect<StoreProps, DispatchProps, OwnProps>(
  ({ CurrentWorkAndFolder }: IStoreState): StoreProps => ({
    currentFolder: CurrentWorkAndFolder.currentFolder,
    currentWork: CurrentWorkAndFolder.currentWork
  }),
  (dispatch: any) => ({
    workAndFolderAction: bindActionCreators(workActionCreator, dispatch)
  })
)(WorkContainer);
