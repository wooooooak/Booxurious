import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const WRITE_SUCCESS = 'post/WriteSuccess';
const WRITE_FAIL = 'post/WriteFail';

export interface PostState {
  editorState: string;
  postTitle: string;
  subTitle: string;
  bookCoverImg: string | null;
  uploadingImg: boolean;
}

export const writePost = (post: PostState) => {
  const token: string = localStorage.token;
  return (dispatch: any) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/post/write',
      data: post,
      headers: { 'Auth-Header': token }
    }).then((res) => {
      console.log(res);
    });
  };
};

export const actionCreators = {
  writeSuccess: createAction<PostState>(WRITE_SUCCESS),
  writeFail: createAction<PostState>(WRITE_FAIL),
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
    }
  },
  initialState
);
