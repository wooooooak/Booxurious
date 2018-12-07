import * as React from 'react';
import styled, { keyframes } from 'styled-components';

import { Avatar } from 'antd';

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 130px;
	height: 450px;
	background: #c6ffdd; /* fallback for old browsers */
	background: -webkit-linear-gradient(
		to right,
		#f7797d,
		#fbd786,
		#c6ffdd
	); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(
		to right,
		#f7797d,
		#fbd786,
		#c6ffdd
	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const showUp = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

const CenterButton = styled.button`
	width: 200px;
	height: 60px;
	position: relative;
	top: 85px;
	border-radius: 50px;
	box-shadow: 1px 2px 30px grey;
	border: none;
	cursor: pointer;
	opacity: 0;
	animation: ${showUp} 0.2s linear 0.2s forwards;
`;

const FollowButton = styled(CenterButton)`
  background: pink;
`;

const SettingButton = styled(CenterButton)`
  background: pink;
`;

const UserName = styled.h2``;

interface Props {
	username: string | null;
	profileImg: string;
	isMe: boolean;
	onClickSettingButton(): void;
}

const InputForm: React.SFC<Props> = ({
	username,
	profileImg,
	isMe,
	onClickSettingButton
}) => {
	if (isMe) {
		return (
			<Layout>
				<Avatar size={160} icon="user" src={profileImg} />
				<UserName>{username}</UserName>
				<SettingButton onClick={() => onClickSettingButton()}>
					수정하기
				</SettingButton>
			</Layout>
		);
	} else {
		return (
			<Layout>
				<Avatar size={160} icon="user" src={profileImg} />
				<p>{username}</p>
				<FollowButton>팔로우하기</FollowButton>
			</Layout>
		);
	}
};

export default InputForm;
