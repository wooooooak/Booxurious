import * as React from 'react';
import styled from 'styled-components';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton
} from 'draft-js-buttons';

import 'node_modules/draft-js-inline-toolbar-plugin/lib/plugin.css';

import Cover, { CoverProps } from '../component/Wite/Cover';

const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton
  ]
});
const { InlineToolbar } = inlineToolbarPlugin;

const Layout = styled.div`
  width: 800px;
  background-color: white;
  display: flex;
`;

interface State extends CoverProps {
  editorState: any;
}

class WrtingBookReviewContainer extends React.Component<{}, State> {
  state = {
    editorState: createEditorStateWithText(''),
    postTitle: '안나 카레리나',
    subTitle: '안나 카레리나는 명작입니다'
  };

  onChange = (editorState: any) => {
    this.setState({
      editorState
    });
  };

  render () {
    return (
      <React.Fragment>
        <Cover postTitle={this.state.postTitle} subTitle={this.state.subTitle} />
        <Layout>
          <Editor
            editorState={this.state.editorState}
            placeholder="Tell a story..."
            onChange={this.onChange}
            plugins={[ inlineToolbarPlugin ]}
          />
          <InlineToolbar />
        </Layout>
      </React.Fragment>
    );
  }
}

export default WrtingBookReviewContainer;
