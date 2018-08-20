import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const WRITE_SUCCESS = 'post/WriteSuccess';
const WRITE_FAIL = 'post/WriteFail';
const ON_CHANGE_POST_CONTENT = 'post/OnChangePostContent';
const ON_CHANGE_POST_TITLE = 'post/OnChangePostTitle';
const ON_CHANGE_SUB_TITLE = 'post/OnChangeSubTitle';
const ON_CHANGE_BOOK_COVER_IMG_PENDING = 'post/OnChangeBookCoverImgPeding';
const ON_CHANGE_BOOK_COVER_IMG_SUCCESS = 'post/OnChangeBookCoverImgSuccess';
const ON_CHANGE_BOOK_COVER_IMG_FAIL = 'post/OnChangeBookCoverImgFail';

export interface PostState {
  editorState: string;
  postTitle: string;
  subTitle: string;
  bookCoverImg: string | null;
  uploadingImg?: boolean;
}

export const writePost = (post: PostState) => {
  const token: string | null = localStorage.getItem('token');
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

export const OnChangeBookCoverImg = (files: FileList) => {
  const file = files[0];
  const formData = new FormData();
  formData.append('imgFile', file, file.name);
  return (dispatch: any) => {
    axios
      .post('http://localhost:8080/post/bookCoverImage', formData, {
        onUploadProgress: (progressEvent) => {
          dispatch(actionCreators.OnChangeBookCoverImgPending());
        }
      })
      .then((result) => {
        dispatch(actionCreators.OnChangeBookCoverImgSuccess(result.data.location));
      })
      .catch((err) => {
        dispatch(actionCreators.OnChangeBookCoverImgFail());
      });
  };
};

export const actionCreators = {
  writePost,
  writeSuccess: createAction<PostState>(WRITE_SUCCESS),
  writeFail: createAction<PostState>(WRITE_FAIL),
  onChangePostContent: createAction<string>(ON_CHANGE_POST_CONTENT),
  onChangePostTitle: createAction<string>(ON_CHANGE_POST_TITLE),
  onChangeSubTitle: createAction<string>(ON_CHANGE_SUB_TITLE),
  OnChangeBookCoverImg,
  OnChangeBookCoverImgSuccess: createAction<string>(ON_CHANGE_BOOK_COVER_IMG_SUCCESS),
  OnChangeBookCoverImgFail: createAction(ON_CHANGE_BOOK_COVER_IMG_FAIL),
  OnChangeBookCoverImgPending: createAction(ON_CHANGE_BOOK_COVER_IMG_PENDING)
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
    },
    [ON_CHANGE_BOOK_COVER_IMG_SUCCESS]: (state, action): PostState => {
      return {
        ...state,
        bookCoverImg: action.payload,
        uploadingImg: false
      };
    },
    [ON_CHANGE_BOOK_COVER_IMG_FAIL]: (state, action): PostState => {
      return {
        ...state
      };
    },
    [ON_CHANGE_BOOK_COVER_IMG_PENDING]: (state, action): PostState => {
      console.log('pending');
      return {
        ...state,
        uploadingImg: true
      };
    }
  },
  initialState
);
