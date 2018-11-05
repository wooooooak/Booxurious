import * as React from "react";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router";

import MenuContainer from "../container/MenuContainer";
import UserProfileContainer from "../container/UserProfileContainer";

export const Div = styled.div``;

interface MatchParams {
  username: string;
}

const UserPage: React.SFC<RouteComponentProps<MatchParams>> = ({ match }) => {
  return (
    <React.Fragment>
      <MenuContainer>{match.params.username}</MenuContainer>
      <Div>
        <UserProfileContainer matchedName={match.params.username} />
      </Div>
    </React.Fragment>
  );
};

export default withRouter(UserPage);
