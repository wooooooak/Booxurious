import styled from "styled-components";
import styledTS from "styled-components-ts";

interface Props {
  isAffixToolbar: boolean;
}

export const EditorBoxLayout = styledTS<Props>(styled.div)`
  margin: 30px auto;
  min-width: 600px;
  max-width: 700px;
  box-sizing: border-box;
  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin-bottom: 2em;
  background: transparent;
  font-size: 1.5em;
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
    z-index: 999;
    position: ${(props) => (props.isAffixToolbar ? "fixed" : "static")};
    top: 70px;
    background: ${(props) => (props.isAffixToolbar ? "#F0E5DE" : "")}
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
