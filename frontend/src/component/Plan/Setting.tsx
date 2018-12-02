import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import * as moment from 'moment';
// import { InputNumber } from 'antd';
import { Select } from 'antd';

import WeekCalendar from '../Plan/WeekCalendar';

const Option = Select.Option;
const showUp = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Wrapper = styled.div`
	font-family: 'Noto Sans KR', sans-serif;
	margin: 0 auto;
	width: 700px;
	height: calc(100vh - 70px);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding-bottom: 100px;
	text-align: center;
	h2 {
		font-size: 3.5rem;
		animation: ${showUp} 0.8s linear forwards;
	}
	p {
		opacity: 0;
		font-size: 1.7rem;
		animation: ${showUp} 0.8s 0.4s linear forwards;
	}
	span {
		font-size: 1.5em;
		margin-bottom: 1em;
	}
	div {
		opacity: 0;
		animation: ${showUp} 0.5s linear forwards;
	}
`;

const NextButton = styled.div`
	opacity: 0;
	width: 60px;
	height: 30px;
	background-color: #00b894;
	animation: ${showUp} 0.8s 0.5s linear forwards;
	border-radius: 5px;
	text-align: center;
	font-size: 1.3em;
	cursor: pointer;
`;

interface Props {
	settingPlan(term: number): void;
}

interface State {
	term: number | null;
	stage: number;
}

// 여기서 3단계 화면
class Settings extends React.PureComponent<Props, State> {
	state = {
		term: null,
		stage: 0
	};
	onClickNextStageButton = (): void => {
		this.setState({
			stage: this.state.stage + 1
		});
	};

	onChangeDay = (term: string): void => {
		this.setState({
			term: parseInt(term, 10)
		});
	};

	showFeedBackText = (term: number): string => {
		switch (term) {
			case 3:
				return '정말 지킬수 있나요?!';
			case 7:
				return '훌륭하군요!';
			case 14:
				return '적당한 선택인 것 같아요';
			case 30:
				return '마지노선입니다..';
			default:
				return '';
		}
	};

	render() {
		const { term, stage } = this.state;
		if (stage === 0) {
			return (
				<Wrapper>
					<h2>안녕하세요.</h2>
					<p>새로운 계획을 세울때가 왔군요.</p>
					<p>이번엔 계획대로 성공해봅시다 :D</p>
					<NextButton onClick={this.onClickNextStageButton}>
						다음
					</NextButton>
				</Wrapper>
			);
		} else if (stage === 1) {
			return (
				<Wrapper>
					<h2>주기를 설정해야 해요.</h2>
					<p>몇 일마다 한 권을 읽을건가요?</p>
					<Select
						style={{ width: 120, marginBottom: 15 }}
						showSearch={true}
						placeholder="선택하기"
						optionFilterProp="children"
						onChange={this.onChangeDay}
						// defaultValue= {null}
					>
						<Option value="3">3일</Option>
						<Option value="7">일주일</Option>
						<Option value="14">이주일</Option>
						<Option value="30">한 달</Option>
					</Select>
					{term ? (
						<React.Fragment>
							<span>{this.showFeedBackText(term)}</span>
							<NextButton onClick={this.onClickNextStageButton}>
								다음
							</NextButton>
						</React.Fragment>
					) : null}
				</Wrapper>
			);
		} else if (stage === 2) {
			// 일주일 짜리 달력을 보여주고 시작날짜를 정하자.
			// 일반적으로 월요일부터 하는 것을 권장하자

			return (
				<Wrapper>
					<WeekCalendar date={moment().add(3, 'days')} />
				</Wrapper>
			);
			// return <Wrapper onClick={() => this.props.settingPlan(term)} />;
		} else {
			return null;
		}
	}
}

export default Settings;
