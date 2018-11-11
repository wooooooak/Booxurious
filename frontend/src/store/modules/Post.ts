import { createAction, handleActions } from "redux-actions";
import axios from "axios";

const WRITE_SUCCESS = "post/WriteSuccess";
const WRITE_FAIL = "post/WriteFail";
const ON_CHANGE_POST_CONTENT = "post/OnChangePostContent";
const ON_CHANGE_POST_TITLE = "post/OnChangePostTitle";
const ON_CHANGE_SUB_TITLE = "post/OnChangeSubTitle";
const ON_CHANGE_RATE = "post/OnChangeRage";
const ON_CHANGE_CATEGORY = "post/OnChangeCategory";
const ON_CHANGE_BOOK_COVER_IMG_PENDING = "post/OnChangeBookCoverImgPeding";
const ON_CHANGE_BOOK_COVER_IMG_SUCCESS = "post/OnChangeBookCoverImgSuccess";
const ON_CHANGE_BOOK_COVER_IMG_FAIL = "post/OnChangeBookCoverImgFail";

export interface PostState {
  id: string;
  editorState: string;
  postTitle: string;
  subTitle: string;
  createdAt: string;
  updatedAt: string;
  fk_user_id: string;
  fk_category_id: string;
  rate: number;
  category: string;
  bookCoverImg: string | null;
  uploadingImg?: boolean;
  like: number;
}

export const writePost = (post: PostState) => {
  const token: string | null = localStorage.getItem("token");
  const { id, ...newData } = post;
  return async (dispatch: any) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `${process.env.REACT_APP_DOMAIN}/post`,
        data: newData,
        headers: { "Auth-Header": token }
      });
      dispatch(actionCreators.writeSuccess(data));
    } catch (error) {
      console.dir(error);
    }
  };
};

export const OnChangeBookCoverImg = (files: FileList) => {
  const file = files[0];
  const formData = new FormData();
  formData.append("imgFile", file, file.name);
  return async (dispatch: any) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_DOMAIN}/post/bookCoverImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          dispatch(actionCreators.OnChangeBookCoverImgPending());
        }
      });
      dispatch(actionCreators.OnChangeBookCoverImgSuccess(data.location));
    } catch (error) {
      dispatch(actionCreators.OnChangeBookCoverImgFail());
    }
  };
};

export const actionCreators = {
  writePost,
  writeSuccess: createAction<PostState>(WRITE_SUCCESS),
  writeFail: createAction<PostState>(WRITE_FAIL),
  onChangePostContent: createAction<string>(ON_CHANGE_POST_CONTENT),
  onChangeRate: createAction<number>(ON_CHANGE_RATE),
  onChangeCategory: createAction<string>(ON_CHANGE_CATEGORY),
  onChangePostTitle: createAction<string>(ON_CHANGE_POST_TITLE),
  onChangeSubTitle: createAction<string>(ON_CHANGE_SUB_TITLE),
  OnChangeBookCoverImg,
  OnChangeBookCoverImgSuccess: createAction<string>(ON_CHANGE_BOOK_COVER_IMG_SUCCESS),
  OnChangeBookCoverImgFail: createAction(ON_CHANGE_BOOK_COVER_IMG_FAIL),
  OnChangeBookCoverImgPending: createAction(ON_CHANGE_BOOK_COVER_IMG_PENDING)
};

const initialState: PostState = {
  id: "",
  editorState: "",
  fk_user_id: "",
  fk_category_id: "",
  postTitle: "",
  subTitle: "",
  category: "",
  createdAt: "",
  updatedAt: "",
  rate: 2.5,
  like: 0,
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
    [ON_CHANGE_RATE]: (state, action): PostState => {
      return {
        ...state,
        rate: action.payload
      };
    },
    [ON_CHANGE_CATEGORY]: (state, action): PostState => {
      return {
        ...state,
        category: action.payload
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
      return {
        ...state,
        uploadingImg: true
      };
    }
  },
  initialState
);
