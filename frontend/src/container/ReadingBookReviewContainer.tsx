import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators as postActionCreator } from '../store/modules/Post';
import { IStoreState } from '../store/modules';

import Cover from '../component/Write/Cover';
import ImageUploader from '../component/Write/ImageUploader';
import { PostState } from '../store/modules/Post';
import axios from 'axios';
import { EditorBoxLayout } from 'src/component/Write/style';
import { withRouter, RouteComponentProps } from 'react-router';

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

	onClickModifyButton = () => {
		console.log('asdf');
		this.props.postAction.duplicatePost(this.state);
		this.props.history.push(`/write_review`);
	};

	render() {
		const { postTitle, subTitle, bookCoverImg, editorState, fk_user_id } = this.state;
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
	postAction: typeof postActionCreator;
}

export default withRouter<any>(
	connect<StoreProps, DispatchProps, {}>(
		({ User }: IStoreState): StoreProps => ({
			id: User.id
		}),
		(dispatch: any) => ({
			postAction: bindActionCreators(postActionCreator, dispatch)
		})
	)(ReadingBookReviewContainer)
);
