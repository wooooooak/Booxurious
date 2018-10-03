import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { IStoreState } from "../store/modules";
// import { IUserState } from "../store/modules/User";
import { actionCreators as userActionCreator } from "../store/modules/User";

import InputForm from "../component/Profile/InputForm";
import { PostState } from "../store/modules/Post";
import { WorkState } from "../store/modules/Work";
import { Modal } from "antd";
import axios from "axios";

interface StoreProps {
  email: string;
  username: string | null;
  profileImg: string;
}

interface DispatchProps {
  userAction: typeof userActionCreator;
}

interface OwnProps {
  matchedName: string;
}

type Props = StoreProps & DispatchProps & OwnProps;

interface State {
  userInfo: {
    username: string;
    followerCount: number;
    profileImage: string;
    reviews: PostState[];
    works: WorkState[];
  };
  isMe: boolean;
  modalVisible: boolean;
}

class UserProfileContainer extends React.Component<Props, State> {
  static getDerivedStateFromProps (nextProps: Props, prevState: Props) {
    if (nextProps.username === nextProps.matchedName) {
      return {
        isMe: true
      };
    } else {
      return {
        isMe: false
      };
    }
  }

  state = {
    userInfo: {
      username: "",
      followerCount: 0,
      profileImage: "",
      reviews: [],
      works: []
    },
    isMe: false,
    modalVisible: false
  };

  componentDidMount () {
    const { matchedName } = this.props;
    axios({
      method: "get",
      url: `${process.env.REACT_APP_DOMAIN}/user/${matchedName}`
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onClickSettingButton = (): void => {
    this.setState({
      modalVisible: true
    });
  };
  onClickSettingCancle = (): void => {
    this.setState({
      modalVisible: false
    });
  };

  render () {
    const { username, profileImg } = this.props;
    const { isMe, modalVisible } = this.state;
    return (
      <React.Fragment>
        <InputForm
          username={username}
          profileImg={profileImg}
          isMe={isMe}
          onClickSettingButton={this.onClickSettingButton}
        />
        <Modal
          title="프로필 수정"
          visible={modalVisible}
          // onOk={this.handleOk}
          // confirmLoading={confirmLoading}
          onCancel={this.onClickSettingCancle}
        >
          <p>modify</p>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect<StoreProps, DispatchProps, OwnProps>(
  ({ User }: IStoreState): StoreProps => ({
    email: User.email,
    username: User.username,
    profileImg: User.profileImg
  }),
  (dispatch: any) => ({
    userAction: bindActionCreators(userActionCreator, dispatch)
  })
)(UserProfileContainer);
