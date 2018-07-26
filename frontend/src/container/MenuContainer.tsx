import * as React from 'react';
import * as feather from 'styled-icons/feather';
import { connect } from 'react-redux';
import { IStoreState } from '../store/modules';
import { IUserState } from '../store/modules/User';
import { actionCreators as userActionCreator } from '../store/modules/User';

import Logo from '../component/Menu/Logo';
import MenuBarLayout from '../component/Menu/MenuBarLayout';
import SearchForm from '../component/Menu/Search';
import SideBar from '../component/SideBar';
import OuterToToggleSideBar from '../component/SideBar/OuterToToggleSideBar';
import { bindActionCreators } from '../../node_modules/redux';

interface IProps {
  username: string;
  email: string;
  userAction: typeof userActionCreator;
}

interface IState {
  prevYOffset: number;
  menuLayoutColor: string;
  showInputBox: boolean;
  showSideBar: boolean;
  user?: IUserState;
}

const HambergerIcon = feather.Menu.extend`
  margin-left: 20px;
  size: 50px;
  cursor: pointer;
`;

class MenuContainer extends React.Component<IProps, IState> {
  state: IState = {
    prevYOffset: 0,
    menuLayoutColor: 'transparent',
    showInputBox: false,
    showSideBar: false,
    user: {
      email: '',
      username: this.props.username ? this.props.username : null,
      code: null
    }
  };

  componentDidMount (): void {
    window.addEventListener('scroll', (): void => {
      if (window.pageYOffset === 0) {
        this.setState({
          menuLayoutColor: 'transparent'
        });
      } else {
        this.setState({
          menuLayoutColor: 'black'
        });
      }
    });
  }

  onClickSearchIcon = (): void => {
    this.setState({
      showInputBox: !this.state.showInputBox
    });
  };

  onClickHambergerButton = (): void => {
    this.setState({
      showSideBar: !this.state.showSideBar
    });
  };

  onClickEmptySpace = (): void => {
    this.setState({
      showSideBar: false
    });
  };

  onClickSignIn = (): void => {
    const { userAction } = this.props;
    userAction.goToSignInPage();
  };

  render () {
    const { menuLayoutColor, showInputBox, showSideBar } = this.state;
    return (
      <React.Fragment>
        <MenuBarLayout backgroundColor={menuLayoutColor} showSideBar={showSideBar}>
          <HambergerIcon
            size="48"
            onClick={this.onClickHambergerButton}
            color="#2EC4B6"
          />
          <Logo marginLeft="10px" />
          <SearchForm
            showInputBox={showInputBox}
            onClickSearchIcon={this.onClickSearchIcon}
            username={this.props.username}
            onClickSignIn={this.onClickSignIn}
          />
        </MenuBarLayout>
        <SideBar showSideBar={showSideBar}>
          <HambergerIcon
            size="48"
            color="#534847"
            onClick={this.onClickHambergerButton}
          />
        </SideBar>
        <OuterToToggleSideBar
          showSideBar={showSideBar}
          onClickEmptySpace={this.onClickEmptySpace}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  ({ User }: IStoreState) => ({
    email: User.email,
    username: User.username
  }),
  (dispatch) => ({
    userAction: bindActionCreators(userActionCreator, dispatch)
  })
)(MenuContainer);
