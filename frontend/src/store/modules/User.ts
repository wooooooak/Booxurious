import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const SOCIAL_LOGIN_SUCCESS = 'user/SocailLogin';
const SOCIAL_LOGIN_FAIL = 'user/SocialLoginFail';
const FETCH_USER_DATA_SUCCESS = 'user/FetchUserDataSuccess';
const FETCH_USER_DATA_FAIL = 'user/FetchUserDataFail';
const GO_TO_SIGN_IN_PAGE = 'user/goToSignInPage';
const SIGN_UP_SUCCESS = 'user/signUpSuccess';
const SIGN_UP_FAIL = 'user/signUpFail';
const LOGOUT = 'user/logout';

const isUserExist = (result: any): boolean => {
	return result.data.code === 1 ? true : false;
};

export const fetchUserData = (token: string) => {
	return async (dispatch: any) => {
		try {
			const { data } = await axios({
				method: 'get',
				url: `${process.env.REACT_APP_DOMAIN}/user/token`,
				headers: { 'Auth-Header': token }
			});
			dispatch(
				actionCreators.fetchUserDataSuccess({
					...data,
					code: 200
				})
			);
		} catch (error) {
			alert('token 값이 만료되었습니다. 다시 로그인해주세요.');
			dispatch(actionCreators.logout());
		}
	};
};

export const socialLoginAsync = (
	socialEmail: string,
	profileImge: string,
	socialProvider: string
) => {
	return async (dispatch: any) => {
		try {
			const { data } = await axios({
				method: 'post',
				url: `${process.env.REACT_APP_DOMAIN}/auth/login/social`,
				data: {
					email: socialEmail,
					socialProvider
				}
			});
			if (isUserExist(data)) {
				localStorage.setItem('token', data.token);
				dispatch(
					actionCreators.socialLoginSuccess({
						id: data.user.id,
						email: socialEmail,
						profileImg: profileImge,
						username: data.user.username,
						socialProvider,
						code: 200
					})
				);
			} else {
				dispatch(
					actionCreators.socialLoginFail({
						id: '',
						socialProvider,
						profileImg: profileImge,
						email: data.email,
						goToSignUpPage: true,
						code: 500,
						username: ''
					})
				);
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const signUp = (
	username: string,
	email: string,
	socialProvider: string,
	profileImg: string
) => {
	return async (dispatch: any) => {
		try {
			const { data } = await axios({
				method: 'post',
				url: `${process.env.REACT_APP_DOMAIN}/auth/register/social`,
				data: {
					email,
					username,
					profileImg,
					socialProvider
				}
			});
			localStorage.setItem('token', data.token);
			dispatch(
				actionCreators.signUpSuccess({
					id: data.user.id,
					username,
					email,
					profileImg,
					socialProvider,
					code: 200
				})
			);
		} catch (error) {
			if (error.response.status === 422 || error.status === 422) {
				dispatch(
					actionCreators.signUpFail({
						id: '',
						email,
						code: 422,
						profileImg,
						socialProvider,
						username
					})
				);
			}
		}
	};
};

export const actionCreators = {
	// 원래 작업은,
	// const localLogin = (payload) =>{type:'user/LocalLogin', payload:payload}
	socialLoginSuccess: createAction<IUserState>(SOCIAL_LOGIN_SUCCESS),
	socialLoginFail: createAction<IUserState>(SOCIAL_LOGIN_FAIL),
	fetchUserDataSuccess: createAction<IUserState>(FETCH_USER_DATA_SUCCESS),
	fetchUserDataFail: createAction(FETCH_USER_DATA_FAIL),
	signUpSuccess: createAction<IUserState>(SIGN_UP_SUCCESS),
	signUpFail: createAction<IUserState>(SIGN_UP_FAIL),
	logout: createAction(LOGOUT),
	goToSignInPage: createAction(GO_TO_SIGN_IN_PAGE),
	fetchUserData,
	socialLoginAsync,
	signUp
};

export interface IUserState {
	id: string;
	email: string;
	username: string | null;
	profileImg: string;
	socialProvider: string;
	message?: string;
	goToSignUpPage?: boolean;
	code: number | null;
}

const initialState: IUserState = {
	id: '',
	email: '',
	username: '',
	profileImg: '',
	socialProvider: '',
	goToSignUpPage: false,
	code: null
};

// <A,B> A는 STATE의 타입이고, B는 payload의 타입
export default handleActions<IUserState, any>(
	{
		[SOCIAL_LOGIN_SUCCESS]: (state, action): IUserState => {
			const {
				id,
				email,
				username,
				profileImg,
				code,
				socialProvider
			} = action.payload;
			return {
				id,
				email,
				username,
				profileImg,
				socialProvider,
				code
			};
		},
		[SOCIAL_LOGIN_FAIL]: (state, action): IUserState => {
			const {
				email,
				goToSignUpPage,
				profileImg,
				code,
				socialProvider
			} = action.payload;
			return {
				...state,
				email,
				profileImg,
				socialProvider,
				goToSignUpPage,
				code
			};
		},
		[FETCH_USER_DATA_SUCCESS]: (state, action): IUserState => {
			const {
				id,
				email,
				username,
				code,
				socialProvider,
				profileImg
			} = action.payload;
			return {
				...state,
				id,
				email,
				username,
				profileImg,
				socialProvider,
				code
			};
		},
		[FETCH_USER_DATA_FAIL]: (state, action): IUserState => {
			return {
				...initialState
			};
		},
		[GO_TO_SIGN_IN_PAGE]: (state, action): IUserState => {
			return {
				...state,
				goToSignUpPage: false
			};
		},
		[SIGN_UP_SUCCESS]: (state, action): IUserState => {
			const { id, email, username, code } = action.payload;
			return {
				...state,
				id,
				username,
				email,
				code
			};
		},
		[SIGN_UP_FAIL]: (state, action): IUserState => {
			const { email, code } = action.payload;
			return {
				...state,
				email,
				code
			};
		},
		[LOGOUT]: (state, action): IUserState => {
			localStorage.removeItem('token');
			return {
				...initialState
			};
		}
	},
	initialState
);
