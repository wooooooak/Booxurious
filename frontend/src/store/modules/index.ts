import { combineReducers } from 'redux';
import User, { IUserState } from './User';

export default combineReducers({ User });

// 컨테이너에서 State불러올때 타입 체크할 용도
export interface IStoreState {
  User: IUserState;
}
