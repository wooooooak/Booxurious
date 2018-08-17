import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const WRITE_SUCCESS = 'post/WriteSuccess';
const WRITE_FAIL = 'post/WriteFail';
const ON_CHANGE_POST_CONTENT = 'post/OnChangePostContent';
const ON_CHANGE_POST_TITLE = 'post/OnChangePostTitle';
const ON_CHANGE_SUB_TITLE = 'post/OnChangeSubTitle';

export interface PostState {
  editorState: string;
  postTitle: string;
  subTitle: string;
  bookCoverImg: string | null;
  uploadingImg?: boolean;
}

export const writePost = (post: PostState) => {
  const token: string = localStorage.token;
  return (dispatch: any) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/post/write',
      data: post,
      headers: { 'Auth-Header': token }
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(actionCreators.writeSuccess(res.data));
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const actionCreators = {
  writeSuccess: createAction<PostState>(WRITE_SUCCESS),
  writeFail: createAction<PostState>(WRITE_FAIL),
  onChangePostContent: createAction<string>(ON_CHANGE_POST_CONTENT),
  onChangePostTitle: createAction<string>(ON_CHANGE_POST_TITLE),
  onChangeSubTitle: createAction<string>(ON_CHANGE_SUB_TITLE),
  writePost
};

const initialState: PostState = {
  editorState: '',
  postTitle: '',
  subTitle: '',
  bookCoverImg: null,
  uploadingImg: false
};

export default handleActions<PostState, any>(
  {
    [WRITE_SUCCESS]: (state, action): PostState => {
      return initialState;
    },
    [WRITE_FAIL]: (state, action): PostState => {
      return {
        ...action.payload
      };
    },
    [ON_CHANGE_POST_CONTENT]: (state, action): PostState => {
      return {
        ...state,
        editorState: action.payload
      };
    },
    [ON_CHANGE_POST_TITLE]: (state, action): PostState => {
      return {
        ...state,
        postTitle: action.payload
      };
    },
    [ON_CHANGE_SUB_TITLE]: (state, action): PostState => {
      return {
        ...state,
        subTitle: action.payload
      };
    }
  },
  initialState
);
