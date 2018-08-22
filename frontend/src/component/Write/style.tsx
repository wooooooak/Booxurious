import styled from 'styled-components';

export const EditorBoxLayout = styled.div`
  margin-top: 30px;
  min-width: 600px;
  box-sizing: border-box;
  /* border: 1px solid #ddd; */
  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin-bottom: 2em;
  /* box-shadow: inset 0px 1px 8px -3px #ababab; */
  background: transparent;
  @import url('https://fonts.googleapis.com/css?family=Mirza');

  .quill {
    font-family: "Aref Ruqaa";
    font-size: 25px;
  }

  .ql-editor {
    font-family: "Aref Ruqaa";
    font-size: 1.5em;
  }

  .ql-toolbar {
    /* background-color: red; */
    /* position: fixed;
    z-index: 998;
    top: 70px; */
  }

  .ql-container.ql-snow {
    margin-top: 20px;
    border: none;
  }

  .ql-toolbar .ql-font span[data-value="Aref Ruqaa"]::before {
    font-family: "Aref Ruqaa";
  }
  .ql-toolbar .ql-font span[data-value="Mirza"]::before {
    font-family: "Mirza";
  }
  .ql-toolbar .ql-font span[data-value="Roboto"]::before {
    font-family: "Roboto";
  }

  /* Set content font-families */
  .ql-font-miraza {
    font-family: "Mirza";
  }
  .ql-font-roboto {
    font-family: "Roboto";
  }
`;

export const Button = styled.button`
  height: 50px;
  width: 100px;
  background-color: green;
`;
