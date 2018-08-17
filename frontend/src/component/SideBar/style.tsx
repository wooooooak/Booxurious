import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ItemConatiner = styled.div`
  margin-top: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Item = styled(Link)`
  margin-top: 30px;
  text-decoration: none;
  color: black;
`;
