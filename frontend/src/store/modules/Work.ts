import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

// folder store는 따로 필요없다. 폴더를 선택할 때 마다, 여기 work스토어에서
// 선택된 folder를 저장해 두면 될듯
const ON_CHANGE_FOLDER_INFO = 'folder/OnChangeFolderInfo';
const ADD_NEW_FOLDER_SUCCESS = 'folder/AddNewFolderSucceess';
const ADD_NEW_FOLDER_FAIL = 'folder/AddNewFolderFail';

export interface FolderState {
  folderName: string;
  folderCoverImage: string;
  category: string;
}

export interface WorkState extends FolderState {
  currentChapter: number;
  content: string | null;
  author: string;
}

const initialState: WorkState = {
  folderName: '',
  folderCoverImage:
    'https://cdn.pixabay.com/photo/2018/08/03/11/48/skyline-3581739__340.jpg',
  category: '',
  currentChapter: 1,
  content: null,
  author: ''
};

export const addNewFolder = (folder: FolderState) => {
  const token: string | null = localStorage.getItem('token');
  return (disptach: any) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/folder/newFolder',
      data: folder,
      headers: { 'Auth-Header': token }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log('addNewFolder');
  };
};

export const actionCreators = {
  addNewFolder,
  addNewFolderSuccess: createAction<FolderState>(ADD_NEW_FOLDER_SUCCESS),
  addNewFolderFail: createAction<FolderState>(ADD_NEW_FOLDER_FAIL),
  onChangeFolderInfo: createAction<FolderState>(ON_CHANGE_FOLDER_INFO)
};

export default handleActions<WorkState, typeof actionCreators>(
  {
    [ON_CHANGE_FOLDER_INFO]: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
    [ADD_NEW_FOLDER_SUCCESS]: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
    [ADD_NEW_FOLDER_FAIL]: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    }
  },
  initialState
);
