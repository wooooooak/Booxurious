import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
// import produce from 'immer';

const SOCIAL_LOGIN_SUCCESS = 'user/SocailLogin';
const SOCIAL_LOGIN_FAIL = 'user/SocialLoginFail';

export const socialLoginAsync = (socialEmail: string) => {
  console.log('socialLogin');
  return async (dispatch: any) => {
    axios({
      method: 'post',
      url:
        // 'https://2bu3ko5b6j.execute-api.ap-northeast-2.amazonaws.com/dev/auth/login/social',
        'http://localhost:8080/auth/login/social',
      data: {
        // email: socialEmail
        email: `aasss@aa.com`
      }
    })
      .then((result) => {
        // email이 존재해서 바로 로그인 된다면
        if (result.data.code === 1) {
          console.log(result.data);
          dispatch(
            actionCreators.socialLoginSuccess({
              email: result.data.user.email,
              username: result.data.user.username,
              social: {
                provider: result.data.user.provider
              }
            })
          );
        } else {
          dispatch(
            actionCreators.socialLoginFail({
              email: result.data.email,
              goToSignUpPage: true
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const actionCreators = {
  // 원래 작업은,
  // const localLogin = (payload) =>{type:'user/LocalLogin', payload:payload}
  socialLoginSuccess: createAction<IUserState>(SOCIAL_LOGIN_SUCCESS),
  socialLoginFail: createAction<IUserState>(SOCIAL_LOGIN_FAIL),
  socialLoginAsync
};

export interface IUserState {
  email: string;
  username?: string | null;
  social?: {
    provider?: string;
  };
  message?: string;
  goToSignUpPage?: boolean;
}

const initialState: IUserState = {
  email: '',
  username: '',
  social: {
    provider: ''
  },
  message: '',
  goToSignUpPage: false
};

// <A,B> A는 STATE의 타입이고, B는 payload의 타입
export default handleActions<IUserState, any>(
  {
    [SOCIAL_LOGIN_SUCCESS]: (state, action): IUserState => {
      console.log(action);
      return {
        email: action.payload.email,
        username: action.payload.username,
        social: {
          provider: action.payload.provider
        }
      };
    },
    [SOCIAL_LOGIN_FAIL]: (state, action): IUserState => {
      console.log('social fail');
      console.log(action.payload);
      return {
        email: action.payload.email,
        goToSignUpPage: action.payload.goToSignUpPage
      };
    }
  },
  initialState
);
