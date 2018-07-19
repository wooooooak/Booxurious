import * as React from 'react';
import styled from 'styled-components';

const LayoutDiv = styled.div`
  background-image: url('https://cdn.pixabay.com/photo/2016/01/19/14/53/book-1149031_960_720.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

// interface IProps {}

const Layout: React.SFC = () => <LayoutDiv />;

export default Layout;
