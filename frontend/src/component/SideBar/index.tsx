import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  showSideBar: boolean;
  children: any;
}

const SideBarLayout = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  width: 300px;
  height: 100vh;
  background-color: #f8f4f3;
  z-index: 999;
`;

const SideBar: React.SFC<IProps> = ({ showSideBar, children }) =>
  showSideBar ? <SideBarLayout>{children}</SideBarLayout> : null;

export default SideBar;
