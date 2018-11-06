import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal } from "antd";
import axios from "axios";
import Select from "react-select";

import { actionCreators as folderActionCreator } from "../store/modules/Work";
import { FolderState, CurrentWorkAndFolderState } from "../store/modules/Work";
import { IStoreState } from "../store/modules";

import WorkContainer from "./WorkContainer";

import MakingForm from "../component/WorkFolder/MakingForm";
import FolderChoicer from "../component/WorkFolder/FolderChoicer";

interface DispatchProps {
  folderAction: typeof folderActionCreator;
}
interface OwnProps {}

type Props = DispatchProps;
interface State {
  folder: FolderState;
  goToWritePage: boolean;
  myFolderList: FolderState[];
}

const selectorStyle = {
  control: (styles: any) => ({
    ...styles,
    background: "transparent",
    width: "180px",
    marginTop: "15px",
    borderColor: "black"
  }),
  input: (styles: any) => ({ ...styles, color: "black" }),
  placeholder: (styles: object) => ({ ...styles, color: "black" }),
  singleValue: (styles: any) => ({ ...styles, color: "black" })
};

const confirm = Modal.confirm;

interface Category {
  value: string;
  label: string;
}

const categories: Category[] = [
  { value: "문학", label: "문학" },
  { value: "소설", label: "소설" },
  { value: "자기계발", label: "자기계발" },
  { value: "IT서적", label: "IT서적" },
  { value: "경영", label: "경영" },
  { value: "경제", label: "경제" },
  { value: "여행", label: "여행" },
  { value: "수험서", label: "수험서" },
  { value: "자격증", label: "자격증" },
  { value: "외국어", label: "외국어" },
  { value: "시", label: "시" },
  { value: "에세이", label: "에세이" }
];

class FolderContainer extends React.Component<Props, State> {
  state = {
    folder: {
      folderCoverImage: "",
      folderName: "",
      category: "",
      id: ""
    },
    currentChapter: 1,
    content: null,
    author: "",
    goToWritePage: false,
    myFolderList: []
  };

  onChangeCoverImgHandler = async (files: FileList) => {
    const file: File | null = files[0];
    const formData = new FormData();
    formData.append("imgFile", file, file.name);
    const token: string | null = localStorage.getItem("token");
    try {
      const result = await axios({
        method: "post",
        url: `${process.env.REACT_APP_DOMAIN}/folder/folderCoverImage`,
        data: formData,
        headers: { "Auth-Header": token },
        onUploadProgress: () => {
          console.log("로딩 중입니다");
        }
      });
      this.setState({
        folder: {
          ...this.state.folder,
          folderCoverImage: result.data.location
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  onChangeFolderName = (e: React.FormEvent<HTMLInputElement>) => {
    const folderName = e.currentTarget.value;
    this.setState({
      folder: {
        ...this.state.folder,
        folderName
      }
    });
  };

  onChangeCategory = (category: Category) => {
    const { value } = category;
    this.setState({
      folder: {
        ...this.state.folder,
        category: value
      }
    });
  };

  onClickMakeFolder = () => {
    this.props.folderAction.addNewFolder(this.state.folder);
    this.setState({
      goToWritePage: true
    });
  };

  componentDidMount () {
    this.fetchFolders();
  }

  fetchFolders = async () => {
    const token: string | null = localStorage.getItem("token");
    const result = await axios({
      method: "get",
      url: `${process.env.REACT_APP_DOMAIN}/folder/myList`,
      headers: { "Auth-Header": token }
    });
    const myFolderList: FolderState[] = result.data;
    this.setState({
      myFolderList,
      goToWritePage: false
    });
  };

  onClickExistFolder = (folder: FolderState) => {
    this.props.folderAction.onClickExistFolder(folder);
    this.setState({
      goToWritePage: true
    });
  };

  onClickChoiceFolder = () => {
    this.fetchFolders();
  };

  onClickFolderDeleteButton = async (id: string) => {
    const self = this;
    confirm({
      title: "정말로 해당 폴더를 삭제하시겠습니까?",
      content: "삭제하면 되돌릴 수 없습니다.",
      okText: "예",
      okType: "danger",
      cancelText: "아뇨",
      async onOk () {
        const token: string | null = localStorage.getItem("token");
        await axios({
          method: "delete",
          url: `${process.env.REACT_APP_DOMAIN}/folder`,
          headers: { "Auth-Header": token },
          data: {
            folderId: id
          }
        });
        const newList = self.state.myFolderList;
        const removeIndex = newList.findIndex((el: FolderState) => el.id === id);
        newList.splice(removeIndex, 1);
        self.setState({
          myFolderList: newList
        });
      },
      onCancel () {
        console.log("cancle");
      }
    });
  };

  render () {
    const { folderCoverImage } = this.state.folder;
    const { goToWritePage } = this.state;
    if (goToWritePage) {
      return <WorkContainer onClickChoiceFolder={this.onClickChoiceFolder} />;
    } else {
      return (
        <React.Fragment>
          <MakingForm
            onChangeCoverImgHandler={this.onChangeCoverImgHandler}
            coverImgSource={folderCoverImage}
            onChangeFolderName={this.onChangeFolderName}
            makeFolderHandler={this.onClickMakeFolder}
          >
            <Select
              options={categories}
              styles={selectorStyle}
              onChange={this.onChangeCategory}
              defaultValue={categories[0]}
            />
          </MakingForm>
          <FolderChoicer
            folderList={this.state.myFolderList}
            onClickExistFolder={this.onClickExistFolder}
            onClickFolderDeleteButton={this.onClickFolderDeleteButton}
          />
        </React.Fragment>
      );
    }
  }
}

export default connect<{}, DispatchProps, OwnProps>(
  ({ CurrentWorkAndFolder }: IStoreState): CurrentWorkAndFolderState => ({
    currentFolder: CurrentWorkAndFolder.currentFolder,
    currentWork: CurrentWorkAndFolder.currentWork
  }),
  (dispatch: any) => ({
    folderAction: bindActionCreators(folderActionCreator, dispatch)
  })
)(FolderContainer);
