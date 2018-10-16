import * as React from "react";
import styled from "styled-components";

const Input = styled.input`
  margin-left: auto;
  margin-bottom: 15px;
  min-height: 25px;
  font-size: 2em;
  width: 100%;
  text-align: center;
  background-color: transparent;
  border: none;
`;

interface Props {
  title: string;
  onChangeWorkTitle(e: React.FormEvent<HTMLInputElement>): void;
}

const WorkWriter: React.SFC<Props> = ({ onChangeWorkTitle, title, children }) => {
  return (
    <div>
      <div>
        <Input type="text" onChange={onChangeWorkTitle} value={title} placeholder="제목" />
      </div>
      {children}
    </div>
  );
};

export default WorkWriter;
