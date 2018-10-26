import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { IStoreState } from "../store/modules";
// import { IUserState } from "../store/modules/User";
import { actionCreators as userActionCreator } from "../store/modules/User";

import InputForm from "../component/Profile/InputForm";
import Modal from "../component/Profile/Modal";
import ProfileWrapper from "../component/Profile/ProfileWrapper";

import { PostState } from "../store/modules/Post";
import { WorkState } from "../store/modules/Work";
import axios from "axios";

interface StoreProps {
  id: string;
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
    id: string;
    username: string;
    followerCount: number;
    profileImg: string;
    email: string;
    reviews: PostState[];
    works: WorkState[];
  };
  modalVisible: boolean;
}

class UserProfileContainer extends React.Component<Props, State> {
  state = {
    userInfo: {
      id: "",
      username: "",
      followerCount: 0,
      profileImg: "",
      email: "",
      reviews: [],
      works: []
    },
    modalVisible: false
  };

  async componentDidMount () {
    const { matchedName } = this.props;
    try {
      const { data } = await axios({
        method: "get",
        url: `${process.env.REACT_APP_DOMAIN}/user/${matchedName}`
      });
      const { id, username, email, profileImg } = data;
      const postResult = await axios({
        method: "get",
        url: `${process.env.REACT_APP_DOMAIN}/post/user_id`,
        params: { userId: id }
      });
      this.setState({
        userInfo: {
          ...this.state.userInfo,
          id,
          username,
          email,
          reviews: postResult.data,
          profileImg
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // mapPostsToPostFormat = (posts: any): PostState[] => {
  //   return posts.map((el: any) => {
  //     return {
  //       editoState: el.editorState,
  //       authorId: el.fk_user_id,
  //       postTitle: el.postTitle,
  //       subTitle: el.subTitle,
  //       rate: el.rate,
  //       category: el.category,
  //       bookCoverImg: el.bookCoverImg,
  //       uploadingImg: el.uploadingImg,
  //       createdAt: el.createdAt,
  //       like: el.like,
  //       id: el.id
  //     };
  //   });
  // };

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

  onClickModalOk = async (username: string) => {
    try {
      const token: string = localStorage.getItem("token") || "";
      await axios({
        method: "put",
        url: `${process.env.REACT_APP_DOMAIN}/user`,
        headers: { "Auth-Header": token },
        data: { username }
      });
      this.setState({
        userInfo: {
          ...this.state.userInfo,
          username
        },
        modalVisible: false
      });
      this.props.userAction.fetchUserData(token);
    } catch (error) {
      console.log(error);
    }
  };

  render () {
    console.log(this.state);
    const { username, profileImg, reviews } = this.state.userInfo;
    const { modalVisible } = this.state;
    let Me = false;
    if (this.props.id === this.state.userInfo.id) {
      Me = true;
    }
    return (
      <React.Fragment>
        <InputForm
          username={username}
          profileImg={profileImg}
          isMe={Me}
          onClickSettingButton={this.onClickSettingButton}
        />
        <Modal
          title="프로필 수정"
          visible={modalVisible}
          username={username}
          onOk={this.onClickModalOk}
          // confirmLoading={confirmLoading}
          onCancel={this.onClickSettingCancle}
        />
        <ProfileWrapper postDatas={reviews} />
      </React.Fragment>
    );
  }
}

export default connect<StoreProps, DispatchProps, OwnProps>(
  ({ User }: IStoreState): StoreProps => ({
    id: User.id,
    email: User.email,
    username: User.username,
    profileImg: User.profileImg
  }),
  (dispatch: any) => ({
    userAction: bindActionCreators(userActionCreator, dispatch)
  })
)(UserProfileContainer);
