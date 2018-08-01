import * as React from 'react';
import * as feather from 'styled-icons/feather';
import { connect } from 'react-redux';
import { IStoreState } from '../store/modules';
import { IUserState } from '../store/modules/User';
import { actionCreators as userActionCreator } from '../store/modules/User';
import { bindActionCreators } from '../../node_modules/redux';

import Logo from '../component/Menu/Logo';
import MenuBarLayout from '../component/Menu/MenuBarLayout';
import SearchForm from '../component/Menu/Search';
import SideBar from '../component/SideBar';
import OuterToToggleSideBar from '../component/SideBar/OuterToToggleSideBar';
import LogoutButton from '../component/SideBar/LogoutButton';

interface StateProps {
  username: string | null;
  email: string;
  socialProvider: string | undefined;
}

interface DispatchProps {
  userAction: typeof userActionCreator;
}

interface OwnProps {}

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

type Props = StateProps & DispatchProps & OwnProps;

class MenuContainer extends React.Component<Props, IState> {
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

  // 스크롤 내릴 때 마다 rendering 되는 것을 방지
  shouldComponentUpdate (nextProps: StateProps, nextState: IState) {
    const { menuLayoutColor, showSideBar } = this.state;
    const nextMenuLayoutColor = nextState.menuLayoutColor;
    const nextShowSideBar = nextState.showSideBar;

    if (showSideBar !== nextShowSideBar) {
      return true;
    }
    if (this.props.email !== nextProps.email) {
      return true;
    }
    if (menuLayoutColor === nextMenuLayoutColor) {
      return false;
    } else {
      return true;
    }
  }

  componentDidMount (): void {
    window.addEventListener('scroll', (): void => {
      if (window.pageYOffset === 0) {
        this.setState({
          menuLayoutColor: 'transparent'
          // menuLayoutColor: '#E3DADB'
        });
      } else {
        this.setState({
          menuLayoutColor: '#BCA9AB'
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

  onClickLogout = () => {
    const { userAction } = this.props;
    localStorage.removeItem('token');
    userAction.logout();
    this.setState({
      showSideBar: false
    });
  };

  render () {
    const { menuLayoutColor, showInputBox, showSideBar } = this.state;
    const { socialProvider, username } = this.props;
    return (
      <React.Fragment>
        <MenuBarLayout backgroundColor={menuLayoutColor} showSideBar={showSideBar}>
          <HambergerIcon
            size="48"
            onClick={this.onClickHambergerButton}
            color="#1F2124"
          />
          <Logo marginLeft="50px" fontSize={'1.3rem'} />
          <SearchForm
            showInputBox={showInputBox}
            onClickSearchIcon={this.onClickSearchIcon}
            username={username}
            onClickSignIn={this.onClickSignIn}
          />
        </MenuBarLayout>
        <SideBar showSideBar={showSideBar}>
          <HambergerIcon
            size="48"
            color="#534847"
            onClick={this.onClickHambergerButton}
          />
          <LogoutButton
            socialProvider={socialProvider}
            onLogoutSuccess={this.onClickLogout}
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

export default connect<StateProps, DispatchProps, OwnProps>(
  ({ User }: IStoreState): StateProps => ({
    email: User.email,
    username: User.username,
    socialProvider: User.socialProvider
  }),
  (dispatch: any) => ({
    userAction: bindActionCreators(userActionCreator, dispatch)
  })
)(MenuContainer);
