import * as React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  margin-left: 20px;
  position: fixed;
  right: 300px;
`;

interface Props {
  workId: string | null;
  onClickSaveWork(): void;
  onClickDeleteButton(workId: string | null): void;
}

const ButtonGroup: React.SFC<Props> = ({
  onClickSaveWork,
  onClickDeleteButton,
  workId
}) => (
  <Layout>
    <Button type="primary" onClick={onClickSaveWork}>
      저장
    </Button>
    <Button type="danger" onClick={() => onClickDeleteButton(workId)}>
      삭제
    </Button>
  </Layout>
);

export default ButtonGroup;
