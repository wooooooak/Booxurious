import * as React from 'react';

import axios from 'axios';

import Settings from '../component/Plan/Setting';

interface Props {}

interface Plan {
	id: string;
	bookTitle: string;
	author: string;
	rating: number;
	createdAt: string;
	updatedAt: string;
	startDate: string;
}

interface State {
	isWriter: boolean;
	Plans: Plan[];
}

class PlanContainer extends React.PureComponent<Props, State> {
	state = {
		isWriter: false,
		Plans: []
	};
	async componentDidMount() {
		const token: string | null = localStorage.getItem('token');
		// writer인지와 데이터를 한번에 받아오자.
		// writer가 아니면 빈 배열과 false를 넣고
		// writer라면 데이터와 true를 넣자
		const { data } = await axios({
			method: 'get',
			url: `${process.env.REACT_APP_DOMAIN}/plan`,
			headers: { 'Auth-Header': token }
		});
		this.setState(data);
	}

	settingPlan = async (term: number | null, startDate: string) => {
		try {
			const token: string = localStorage.getItem('token') || '';
			const { data } = await axios({
				method: 'post',
				url: `${process.env.REACT_APP_DOMAIN}/plan/init`,
				headers: { 'Auth-Header': token },
				data: { term, startDate }
			});
			this.setState({
				...data
			});
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { isWriter } = this.state;
		if (isWriter) {
			// 작성중인 계획표 컴포넌트를 보여주기
			return 'im writer!';
		} else {
			// 몇 일 주기로 작성할 것인지 등
			// setting을 하는 컴포넌트 보여주기
			return <Settings settingPlan={this.settingPlan} />;
		}
	}
}

export default PlanContainer;
