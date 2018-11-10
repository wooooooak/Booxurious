import * as React from "react";
import * as ReactQuill from "react-quill";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { message, Modal } from "antd";

import { CurrentWorkAndFolderState } from "../store/modules/Work";
import { actionCreators as workActionCreator } from "../store/modules/Work";
import { IStoreState } from "../store/modules";

import WorkSideBar from "../component/WorkFolder/WorkSideBar";
import { WorkState } from "../store/modules/Work";
import { QuillStyle } from "../component/WorkFolder/style";
import ButtonGroup from "../component/WorkFolder/ButtonGroup";
import WorkWriter from "../component/WorkFolder/WorkWriter";

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
  isAffixToolbar: boolean;
  currentWorkTitleOffset: number;
}

const Quill = ReactQuill as any;

let modules: object = {};
const toolbarContainer: any[] = [
  [ { font: [ "miraza", "roboto", "amam" ] } ],
  [ { header: [ 1, 2, false ] } ],
  [ "bold", "italic", "underline", "strike", "blockquote" ],
  [ { list: "ordered" }, { list: "bullet" } ],
  [ "link", "image" ],
  [ { align: [] } ],
  [ "clean" ]
];
const formats = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "align"
];

const confirm = Modal.confirm;

class WorkContainer extends React.Component<Props, State> {
  state = {
    workList: [] as WorkState[],
    isAddWorkMode: false,
    currentWork: {
      id: null,
      content: "",
      title: ""
    },
    isAffixToolbar: false,
    currentWorkTitleOffset: 0
  };

  private quill: typeof Quill;

  constructor (props: any) {
    super(props);
    this.quill = React.createRef();
  }

  showDeleteConfirm = (workId: string) => {
    const fetchWorkList = this.fetchWorkList;
    const id: string | null = this.props.currentFolder.id;
    confirm({
      title: "정말로 해당 글을 삭제하시겠습니까?",
      content: "삭제하면 되돌릴 수 없습니다.",
      okText: "예",
      okType: "danger",
      cancelText: "아뇨",
      async onOk () {
        const token: string | null = localStorage.getItem("token");
        const result = await axios({
          method: "delete",
          url: `${process.env.REACT_APP_DOMAIN}/work/`,
          params: { workId },
          headers: { "Auth-Header": token }
        });
        if (result.status === 200) {
          message.success("삭제 완료!");
        }
        fetchWorkList(id);
      },
      onCancel () {
        console.log("cancle");
      }
    });
  };

  componentDidMount () {
    modules = {
      toolbar: {
        container: toolbarContainer
      }
    };
    this.onDetectScroll();
    this.fetchWorkList(this.props.currentFolder.id);
  }

  onDetectScroll = () => {
    window.addEventListener("scroll", (): void => {
      if (window.pageYOffset > 140) {
        this.setState({
          isAffixToolbar: true
        });
      } else {
        this.setState({
          isAffixToolbar: false
        });
      }
    });
  };

  fetchWorkList = async (id: string | null) => {
    const { data } = await axios({
      method: "get",
      url: `${process.env.REACT_APP_DOMAIN}/work/list`,
      params: { id }
    });
    const markOffsetGap: number = (data.length - 1) * 25;
    if (this.isWorkExist(data)) {
      this.setState({
        workList: data,
        currentWork: data[data.length - 1],
        currentWorkTitleOffset: markOffsetGap
      });
      this.props.workAndFolderAction.changeWork(data[data.length - 1]);
    } else {
      this.setState({
        workList: [] as WorkState[],
        currentWork: {
          id: null,
          content: "",
          title: ""
        }
      });
    }
  };

  isWorkExist = (workList: WorkState[]): boolean => {
    return workList[0] ? true : false;
  };

  onClickOtherChapter = (chapterNumber: number, offset: number) => {
    this.setState({
      currentWork: this.state.workList[chapterNumber],
      currentWorkTitleOffset: offset
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
    const token: string | null = localStorage.getItem("token");
    const folderId: string | null = this.props.currentFolder.id;
    const workId: string | null = this.state.currentWork.id;
    const toBeSendData = {
      ...this.state.currentWork,
      folderId,
      workId
    };
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_DOMAIN}/work`,
      data: toBeSendData,
      headers: { "Auth-Header": token }
    });
    message.success("저장 완료!");
    this.fetchWorkList(this.props.currentFolder.id);
  };

  onClickAddWorkButton = async (titleOffset: number) => {
    const token: string | null = localStorage.getItem("token");
    const workList: WorkState[] = this.state.workList;
    const newWork = {
      folderId: this.props.currentFolder.id,
      workId: null,
      content: "",
      title: "제목을 작성해 주세요!"
    };
    const result = await axios({
      method: "post",
      url: `${process.env.REACT_APP_DOMAIN}/work`,
      data: newWork,
      headers: { "Auth-Header": token }
    });
    workList.push(result.data);
    this.setState({
      workList,
      currentWork: {
        id: result.data.id as string,
        content: result.data.content as string,
        title: newWork.title
      },
      currentWorkTitleOffset: titleOffset
    });
  };

  componentWillUnmount () {
    window.removeEventListener("scroll", () => {
      return null;
    });
  }

  render () {
    const { isAffixToolbar } = this.state;
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          marginTop: "80px"
        }}
      >
        <WorkSideBar
          folderName={this.props.currentFolder.folderName}
          image={this.props.currentFolder.folderCoverImage}
          workList={this.state.workList}
          onClickOtherChapter={this.onClickOtherChapter}
          onClickAddWorkButton={this.onClickAddWorkButton}
          onClickChoiceFolder={this.props.onClickChoiceFolder}
          currentWorkTitleOffset={this.state.currentWorkTitleOffset}
        />
        <QuillStyle isAffixToolbar={isAffixToolbar}>
          <WorkWriter onChangeWorkTitle={this.onChangeWorkTitle} title={this.state.currentWork.title}>
            <Quill
              ref={this.quill}
              theme="snow"
              value={this.state.currentWork.content}
              onChange={this.onChangeContent}
              modules={modules}
              formats={formats}
            />
          </WorkWriter>
        </QuillStyle>
        <ButtonGroup
          onClickSaveWork={this.onClickSaveWork}
          onClickDeleteButton={this.showDeleteConfirm}
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
