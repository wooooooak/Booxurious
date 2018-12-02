import * as React from 'react';

import styled from 'styled-components';
import styledTS from 'styled-components-ts';

import { Moment } from 'moment';
import * as moment from 'moment';

const DAY = {
	0: '일',
	1: '월',
	2: '화',
	3: '수',
	4: '목',
	5: '금',
	6: '토'
};

interface Props {
	date: Moment;
	onSetStartDate(startDate: Moment): void;
}

const Container = styled.div`
	display: flex;
	width: 100%;
	height: 5em;
	border-color: black;
	margin-bottom: 4em;
`;

interface BoxProps {
	backgroundColor: string;
}

const Box = styledTS<BoxProps>(styled.div)`
    flex: 1;
    background-color: ${(props) => props.backgroundColor};
    border-color: black;
    text-align: center;
`;

const NextButton = styled.div`
	opacity: 0;
	width: 10em;
	height: 2em;
	background-color: #00b894;
	border-radius: 5px;
	text-align: center;
	font-size: 1.3em;
	cursor: pointer;
	font-weight: bold;
`;

const RightButton = styled(NextButton)`
    background-color:#10ac84;
`;

const ButtonGroup = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-around;
	margin-bottom: 2em;
`;

// const Button = styled(NextButton)`width: 40%;`;

const genDayBox = (day: Moment) => {
	const boxs = [];
	for (let i = 0; i < 7; i++) {
		if (day.day() === i) {
			boxs.push(
				<Box key={i} backgroundColor="#58B19F">
					{DAY[i]}
					<p>{moment().add(i - day.day(), 'days').date()}</p>
				</Box>
			);
		} else {
			boxs.push(
				<Box key={i} backgroundColor="transparent">
					{DAY[i]}
					<p>{moment().add(i - day.day(), 'days').date()}</p>
				</Box>
			);
		}
	}

	return boxs;
};

const daySelector = (date: Moment, onSetStartDate: any) => {
	const day: number = date.day();
	if (day === 0) {
		return (
			<div>
				<p>한 주의 시작이군요.</p>
				<p>그럼 오늘부터 시작하겠습니다.</p>
				<ButtonGroup>
					<NextButton onClick={() => onSetStartDate(date)}>
						시작!
					</NextButton>
				</ButtonGroup>
			</div>
		);
	} else if (0 < day && day < 3) {
		return (
			<div>
				<p>한 주가 시작된지 얼마 안됬군요.</p>
				<p>지난 일요일을 시작 날짜로 할까요? 달력이 깔끔해 져요!</p>
				<ButtonGroup>
					<NextButton
						onClick={() => onSetStartDate(date.add(-day, 'days'))}
					>
						네. 그렇게 할래요.
					</NextButton>
					<RightButton onClick={() => onSetStartDate(date)}>
						오늘부터 할래요.
					</RightButton>
				</ButtonGroup>
			</div>
		);
	} else {
		return (
			<div>
				<p>한 주의 절반이 지나갔네요.</p>
				<p>다음 주 일요일을 시작 날짜로 할까요? 달력이 깔끔해 져요!</p>
				<ButtonGroup>
					<NextButton
						onClick={() =>
							onSetStartDate(date.add(7 - day, 'days'))}
					>
						네. 그렇게 할래요.
					</NextButton>
					<RightButton onClick={() => onSetStartDate(date)}>
						오늘부터 할래요.
					</RightButton>
				</ButtonGroup>
				<span>클릭하면 끝납니다!</span>
			</div>
		);
	}
};

const WeekCalendar: React.SFC<Props> = ({ date, onSetStartDate }) => {
	return (
		<React.Fragment>
			<p>
				오늘은 {date.month() + 1}월 {date.date()}일 {DAY[date.day()]}요일 입니다.
			</p>
			<Container>{genDayBox(date)}</Container>
			{daySelector(date, onSetStartDate)}
		</React.Fragment>
	);
};

export default WeekCalendar;
