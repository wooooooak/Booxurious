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
import Cover from '../component/Write/Cover';
import ImageUploader from '../component/Write/ImageUploader';

/// css style
import 'node_modules/draft-js-inline-toolbar-plugin/lib/plugin.css';

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

interface State {
  editorState: any;
  postTitle: string;
  subTitle?: string;
  bookCoverImg?: File | null;
}

class WrtingBookReviewContainer extends React.Component<{}, State> {
  state = {
    editorState: createEditorStateWithText(''),
    postTitle: '',
    subTitle: '',
    bookCoverImg: null
  };

  onChange = (editorState: any) => {
    this.setState({
      editorState
    });
  };

  onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      postTitle: e.currentTarget.value
    });
  };
  onChangeSubTitle = (e: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({
      subTitle: e.currentTarget.value
    });
  };

  fileChangedHandler = (files: FileList) => {
    const file = files[0];
    this.setState({
      bookCoverImg: file
    });
  };
  render () {
    console.log(this.state);
    return (
      <React.Fragment>
        <Cover
          postTitle={this.state.postTitle}
          onChangeTitle={this.onChangeTitle}
          subTitle={this.state.subTitle}
          onChangeSubTitle={this.onChangeSubTitle}
        >
          <ImageUploader fileChangedHandler={this.fileChangedHandler} />
        </Cover>
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
