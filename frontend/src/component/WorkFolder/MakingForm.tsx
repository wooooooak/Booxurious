import * as React from 'react';
import styled from 'styled-components';
import { LayoutLeftBox, Title } from './style';

const FormArea = styled.div`
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MakingForm: React.SFC<{}> = () => (
  <LayoutLeftBox>
    <Title>새로운 책 폴더 만들기</Title>
    <FormArea>
      <input type="text" />
      <input type="text" />
    </FormArea>
  </LayoutLeftBox>
);

export default MakingForm;
