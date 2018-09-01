import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Select from 'react-select';

import { actionCreators as folderActionCreator } from '../store/modules/Work';
import { FolderState, CurrentWorkAndFolderState } from '../store/modules/Work';
import { IStoreState } from '../store/modules';

import WorkContainer from './WorkContainer';

import MakingForm from '../component/WorkFolder/MakingForm';
import FolderChoicer from '../component/WorkFolder/FolderChoicer';

interface DispatchProps {
  folderAction: typeof folderActionCreator;
}
interface OwnProps {}

type Props = DispatchProps;
interface State {
  folder: FolderState;
  goToWritePage: boolean;
  myFolderList: FolderState[] | null;
}

const selectorStyle = {
  control: (styles: any) => ({
    ...styles,
    background: 'transparent',
    width: '180px',
    marginTop: '15px',
    borderColor: 'black'
  }),
  input: (styles: any) => ({ ...styles, color: 'black' }),
  placeholder: (styles: object) => ({ ...styles, color: 'black' }),
  singleValue: (styles: any) => ({ ...styles, color: 'black' })
};

interface Category {
  value: string;
  label: string;
}

const categories: Category[] = [
  { value: '문학', label: '문학' },
  { value: '소설', label: '소설' },
  { value: '자기계발', label: '자기계발' },
  { value: 'IT서적', label: 'IT서적' },
  { value: '경영', label: '경영' },
  { value: '경제', label: '경제' },
  { value: '여행', label: '여행' },
  { value: '수험서', label: '수험서' },
  { value: '자격증', label: '자격증' },
  { value: '외국어', label: '외국어' },
  { value: '시', label: '시' },
  { value: '에세이', label: '에세이' }
];

class FolderContainer extends React.Component<Props, State> {
  state = {
    folder: {
      folderCoverImage:
        'https://cdn.pixabay.com/photo/2018/08/03/11/48/skyline-3581739__340.jpg',
      folderName: '',
      category: '',
      id: null
    },
    currentChapter: 1,
    content: null,
    author: '',
    goToWritePage: false,
    myFolderList: null
  };

  onChangeCoverImgHandler = async (files: FileList) => {
    const file: File | null = files[0];
    const formData = new FormData();
    formData.append('imgFile', file, file.name);
    const token: string | null = localStorage.getItem('token');
    try {
      const result = await axios({
        method: 'post',
        url: 'http://localhost:8080/folder/folderCoverImage',
        data: formData,
        headers: { 'Auth-Header': token },
        onUploadProgress: () => {
          console.log('로딩 중입니다');
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
    const token: string | null = localStorage.getItem('token');
    const result = await axios({
      method: 'get',
      url: 'http://localhost:8080/folder/myFolderList',
      headers: { 'Auth-Header': token }
    });
    const myFolderList: FolderState[] = result.data;
    this.setState({
      myFolderList
    });
  };

  onClickExistFolder = (folder: FolderState) => {
    this.props.folderAction.onClickExistFolder(folder);
    this.setState({
      goToWritePage: true
    });
  };

  onClickChoiceFolder = () => {
    this.setState({
      goToWritePage: false
    });
  };

  render () {
    const { folderCoverImage } = this.state.folder;
    const { goToWritePage } = this.state;
    if (goToWritePage) {
      return (
        <WorkContainer
          // folder={this.state.folder}
          onClickChoiceFolder={this.onClickChoiceFolder}
        />
      );
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
