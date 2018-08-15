import styled from 'styled-components';

export const EditorBox = styled.div`
  box-sizing: border-box;
  border: 1px solid #ddd;
  cursor: text;
  padding: 20px;
  border-radius: 2px;
  margin-bottom: 2em;
  box-shadow: inset 0px 1px 8px -3px #ababab;
  background: #fefefe;
  display: flex;

  &:global(.public-DraftEditor-content) {
    min-height: 140px;
  }
`;
