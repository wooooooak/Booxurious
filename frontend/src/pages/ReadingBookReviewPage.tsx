import * as React from "react";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router";

import MenuContainer from "../container/MenuContainer";
import ReadingBookReviewContainer from "../container/ReadingBookReviewContainer";

interface MatchParams {
  id: string;
}

const Div = styled.div``;

const ReadingBookReviewPage: React.SFC<RouteComponentProps<MatchParams>> = ({ match }) => {
  return (
    <Div>
      <MenuContainer />
      <ReadingBookReviewContainer postId={match.params.id} />
    </Div>
  );
};

export default withRouter<any>(ReadingBookReviewPage);
