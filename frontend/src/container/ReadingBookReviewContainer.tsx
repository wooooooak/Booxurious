import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { message } from 'antd';

import { actionCreators as postActionCreator } from '../store/modules/Post';
import { IStoreState } from '../store/modules';

import Cover from '../component/Write/Cover';
import ImageUploader from '../component/Write/ImageUploader';
import { PostState } from '../store/modules/Post';
import { EditorBoxLayout } from 'src/component/Write/style';

type State = PostState;

interface OwnProps {
	postId: string;
}
type Props = OwnProps & StoreProps & DispatchProps & RouteComponentProps<OwnProps>;

class ReadingBookReviewContainer extends React.Component<Props, State> {
	state = {
		id: '',
		editorState: '',
		fk_user_id: '',
		fk_category_id: '',
		postTitle: '',
		subTitle: '',
		category: '',
		createdAt: '',
		updatedAt: '',
		rate: 2.5,
		like: 0,
		bookCoverImg: null
	};

	async componentDidMount() {
		const { data } = await axios({
			method: 'get',
			url: `${process.env.REACT_APP_DOMAIN}/post/post_id`,
			params: { postId: this.props.postId }
		});
		this.setState({
			...data
		});
	}

	onClickModifyButton = (): void => {
		this.props.duplicatePost(this.state);
		this.props.history.push(`/write_review?postId=${this.state.id}`);
	};

	onClickDeleteButton = async () => {
		try {
			const token: string | null = localStorage.getItem('token');
			await axios({
				method: 'delete',
				url: `${process.env.REACT_APP_DOMAIN}/post`,
				params: { id: this.state.id },
				headers: { 'Auth-Header': token }
			});
			message.success('해당 글 삭제 완료!');
			this.props.history.goBack();
		} catch (error) {
			message.error('무언가 잘못되었어요!');
			console.log(error);
		}
	};

	render() {
		const {
			postTitle,
			subTitle,
			bookCoverImg,
			editorState,
			fk_user_id
		} = this.state;
		let isWriter: boolean = false;
		if (fk_user_id === this.props.id) {
			isWriter = true;
		}
		return (
			<div>
				<Cover
					type="read"
					postTitle={postTitle}
					subTitle={subTitle}
					isWriter={isWriter}
					onClickModifyButton={this.onClickModifyButton}
					onClickDeleteButton={this.onClickDeleteButton}
				>
					<ImageUploader
						bookCoverImg={bookCoverImg}
						uploadingImg={false}
						type="read"
					/>
				</Cover>
				<EditorBoxLayout isAffixToolbar={false}>
					<div dangerouslySetInnerHTML={{ __html: editorState }} />
				</EditorBoxLayout>
			</div>
		);
	}
}

interface StoreProps {
	id: string;
}
interface DispatchProps {
	duplicatePost(postState: PostState): void;
	// postAction: typeof postActionCreator;
}

const mapStateToProps = (state: IStoreState): StoreProps => {
	return {
		id: state.User.id
	};
};

const mapDispathToProps = (dispatch: Dispatch): any => {
	return {
		duplicatePost: (postState: PostState) => {
			dispatch(postActionCreator.duplicatePost(postState));
		}
	};
};

export default withRouter<any>(
	connect<StoreProps, DispatchProps, {}>(mapStateToProps, mapDispathToProps)(
		ReadingBookReviewContainer
	)
);
