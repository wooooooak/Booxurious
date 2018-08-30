import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

// folder store는 따로 필요없다. 폴더를 선택할 때 마다, 여기 work스토어에서
// 선택된 folder를 저장해 두면 될듯
const ON_CHANGE_FOLDER_INFO = 'folder/OnChangeFolderInfo';
const ADD_NEW_FOLDER_SUCCESS = 'folder/AddNewFolderSucceess';
const ADD_NEW_FOLDER_FAIL = 'folder/AddNewFolderFail';
const CHANGE_WORK = 'work/changeWork';
const ON_CLICK_EXIST_FOLDER = 'folder/onClickExistFolder';

export interface FolderState {
  folderName: string;
  folderCoverImage: string;
  category: string;
  id: string | null;
}

export interface WorkState {
  id: string | null;
  content: string | null;
  title: string;
}

export interface CurrentWorkAndFolderState {
  currentFolder: FolderState;
  currentWork: WorkState;
}

const initialState: CurrentWorkAndFolderState = {
  currentFolder: {
    id: null,
    folderName: '',
    folderCoverImage:
      'https://cdn.pixabay.com/photo/2018/08/03/11/48/skyline-3581739__340.jpg',
    category: ''
  },
  currentWork: {
    id: null,
    content: null,
    title: ''
  }
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
        disptach(actionCreators.addNewFolderSuccess(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const actionCreators = {
  addNewFolder,
  addNewFolderSuccess: createAction<FolderState>(ADD_NEW_FOLDER_SUCCESS),
  addNewFolderFail: createAction<FolderState>(ADD_NEW_FOLDER_FAIL),
  onChangeFolderInfo: createAction<CurrentWorkAndFolderState>(ON_CHANGE_FOLDER_INFO),
  changeWork: createAction<WorkState>(CHANGE_WORK),
  onClickExistFolder: createAction<FolderState>(ON_CLICK_EXIST_FOLDER)
};

export default handleActions<CurrentWorkAndFolderState, any>(
  {
    [ON_CHANGE_FOLDER_INFO]: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
    [ADD_NEW_FOLDER_SUCCESS]: (state, action) => {
      const { id, folderName, folderCoverImage, category } = action.payload;
      return {
        ...state,
        currentFolder: {
          id,
          folderName,
          folderCoverImage,
          category
        }
      };
    },
    [ADD_NEW_FOLDER_FAIL]: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
    [CHANGE_WORK]: (state, action) => {
      return {
        ...state,
        currentWork: {
          ...action.payload
        }
      };
    },
    [ON_CLICK_EXIST_FOLDER]: (state, action) => {
      return {
        ...state,
        currentFolder: {
          ...action.payload
        }
      };
    }
  },
  initialState
);
