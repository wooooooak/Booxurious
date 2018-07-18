import * as React from 'react';
import styled from 'styled-components';

interface IMenuBarLayoutProps {
  backgroundColor: string;
  showSideBar: boolean;
  children: any;
}

interface ILayoutProps {
  backgroundColor: string;
}

const Layout = styled.div`
  background-color: ${(props: ILayoutProps) => props.backgroundColor};
  color: white;
  position: fixed;
  width: 100vw;
  display: flex;
  align-items: center;
  height: 70px;
  top: 0;
  left: 0;
`;

const MenuBarLayout: React.SFC<IMenuBarLayoutProps> = ({
  backgroundColor,
  showSideBar,
  children
}) => {
  return showSideBar ? null : (
    <Layout backgroundColor={backgroundColor}>{children}</Layout>
  );
};

export default MenuBarLayout;
