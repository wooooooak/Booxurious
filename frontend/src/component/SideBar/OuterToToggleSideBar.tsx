import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  showSideBar: boolean;
  onClickEmptySpace(): void;
}

const EmptySpaceToToggleSideBar = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 998;
  opacity: 0.5;
  background-color: gray;
  position: fixed;
`;

const OuterToToggleSideBar: React.SFC<IProps> = ({ showSideBar, onClickEmptySpace }) =>
  showSideBar ? <EmptySpaceToToggleSideBar onClick={onClickEmptySpace} /> : null;

export default OuterToToggleSideBar;
