import * as React from 'react';
import * as feather from 'styled-icons/feather';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { message } from 'antd';

import { actionCreators as userActionCreator } from '../store/modules/User';
import { IStoreState } from '../store/modules';
import { IUserState } from '../store/modules/User';

import Logo from '../component/Menu/Logo';
import MenuBarLayout from '../component/Menu/MenuBarLayout';
import SearchForm from '../component/Menu/Search';
import SideBar from '../component/SideBar';
import OuterToToggleSideBar from '../component/SideBar/OuterToToggleSideBar';
import LogoutButton from '../component/SideBar/LogoutButton';
import SignInButton from '../component/SideBar/SignInButton';
import LinkItems from '../component/SideBar/LinkItems';

interface StoreProps {
	id: string;
	username: string | null;
	email: string;
	profileImg: string;
}

interface DispatchProps {
	userAction: typeof userActionCreator;
}

interface OwnProps {
	titleColor: string;
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

type Props = StoreProps &
	DispatchProps &
	RouteComponentProps<OwnProps> &
	OwnProps;

class MenuContainer extends React.Component<Props, IState> {
	state: IState = {
		prevYOffset: 0,
		menuLayoutColor: 'transparent',
		showInputBox: false,
		showSideBar: false,
		user: {
			id: '',
			email: '',
			username: this.props.username ? this.props.username : null,
			code: null,
			profileImg: '',
			socialProvider: ''
		}
	};

	// 스크롤 내릴 때 마다 rendering 되는 것을 방지
	// 하나의 false 때문에 이 메서드가 너무 지저분해 진게 아닌가 싶다.
	// 더 좋은 방법이 떠오르지 않는데 언젠가는 한번 깊게 고민해봐야 할듯...
	shouldComponentUpdate(nextProps: StoreProps, nextState: IState): boolean {
		const { menuLayoutColor, showSideBar, showInputBox } = this.state;
		const {
			menuLayoutColor: nextMenuLayoutColor,
			showSideBar: nextShowSideBar,
			showInputBox: nextShowInputBox
		} = nextState;

		if (showInputBox !== nextShowInputBox) {
			return true;
		}
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

	componentDidMount(): void {
		window.addEventListener('scroll', (): void => {
			if (window.pageYOffset === 0) {
				this.setState({
					menuLayoutColor: 'transparent'
				});
			} else {
				this.setState({
					menuLayoutColor: '#f8f4f3'
					// menuLayoutColor: '#95807F'
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
		userAction.logout();
		message.config({
			top: 100,
			duration: 2
		});
		this.props.history.push('/');
		message.success('로그아웃 되었습니다.');
		this.setState({
			showSideBar: false
		});
	};

	render() {
		const { menuLayoutColor, showInputBox, showSideBar } = this.state;
		const { username, profileImg, children, titleColor } = this.props;
		return (
			<React.Fragment>
				<MenuBarLayout
					backgroundColor={menuLayoutColor}
					showSideBar={showSideBar}
				>
					<HambergerIcon
						size="48"
						onClick={this.onClickHambergerButton}
						color="#1F2124"
					/>
					<Logo marginLeft="50px" fontSize={'1.3rem'} />
					{showInputBox ? null : (
						<div
							style={{
								textAlign: 'center',
								width: '77%',
								color: titleColor
							}}
						>
							{children}
						</div>
					)}
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
						style={{ marginLeft: '-1px' }}
					/>
					<LinkItems username={username} profileImg={profileImg} />
					{localStorage.getItem('token') ? (
						<LogoutButton onLogoutSuccess={this.onClickLogout} />
					) : (
						<SignInButton />
					)}
				</SideBar>
				<OuterToToggleSideBar
					showSideBar={showSideBar}
					onClickEmptySpace={this.onClickEmptySpace}
				/>
			</React.Fragment>
		);
	}
}

export default withRouter<any>(
	connect<StoreProps, DispatchProps, OwnProps>(
		({ User }: IStoreState): StoreProps => ({
			id: User.id,
			email: User.email,
			username: User.username,
			profileImg: User.profileImg
		}),
		(dispatch: any) => ({
			userAction: bindActionCreators(userActionCreator, dispatch)
		})
	)(MenuContainer)
);
