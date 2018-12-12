import * as React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router';

import MenuContainer from '../container/MenuContainer';
import WritingBookReviewContainer from '../container/WritingBookReviewContainer';

const PageLayout = styled.div`
	padding: 70px 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

interface MatchParams {
	postId: string;
}

const WritingBookReviewPage: React.SFC<RouteComponentProps<MatchParams>> = ({
	location
}) => (
	<React.Fragment>
		<MenuContainer />
		<PageLayout>
			<WritingBookReviewContainer toBeUpdateId={location.search} />
		</PageLayout>
	</React.Fragment>
);

export default withRouter<any>(WritingBookReviewPage);
