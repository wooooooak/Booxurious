import * as React from "react";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router";

import MenuContainer from "../container/MenuContainer";
import ReadingBookReviewContainer from "../container/ReadingBookReviewContainer";

interface RouterProps {
  id: string;
}

const Div = styled.div``;

const ReadingBookReviewPage: React.SFC<RouteComponentProps<RouterProps>> = ({ match }) => {
  console.log(match);
  return (
    <Div>
      <MenuContainer />
      <ReadingBookReviewContainer postId={match.params.id} />
    </Div>
  );
};

export default withRouter<any>(ReadingBookReviewPage);
