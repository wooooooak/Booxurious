import * as React from 'react';
// import styled from 'styled-components';
import axios from 'axios';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';

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
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
// import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import EditorBox from '../component/Write/EditorBox';
import PluginsEditor from 'draft-js-plugins-editor';

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

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

interface State {
  editorState: any;
  postTitle: string;
  subTitle?: string;
  bookCoverImg?: string | null;
  uploadingImg: boolean;
}

class WrtingBookReviewContainer extends React.Component<{}, State> {
  state = {
    editorState: createEditorStateWithText(''),
    postTitle: '',
    subTitle: '',
    bookCoverImg: null,
    uploadingImg: false
  };

  private editor: React.RefObject<PluginsEditor>;
  constructor (props: any) {
    super(props);
    this.editor = React.createRef();
  }

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
    const file = files[0]; // const config = {
    //   headers: { 'content-type': 'multipart/form-data' }
    // };
    const formData = new FormData();
    formData.append('imgFile', file, file.name);
    axios
      .post('http://localhost:8080/post/uploadImage', formData, {
        onUploadProgress: (progressEvent) => {
          this.setState({
            uploadingImg: true
          });
        }
      })
      .then((data) => {
        console.log(data);
        this.setState({
          bookCoverImg: data.data.location,
          uploadingImg: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  focus = () => {
    (this.editor.current as any).focus();
  };

  render () {
    return (
      <React.Fragment>
        <Cover
          postTitle={this.state.postTitle}
          onChangeTitle={this.onChangeTitle}
          subTitle={this.state.subTitle}
          onChangeSubTitle={this.onChangeSubTitle}
        >
          <ImageUploader
            fileChangedHandler={this.fileChangedHandler}
            bookCoverImg={this.state.bookCoverImg}
            uploadingImg={this.state.uploadingImg}
          />
        </Cover>
        <EditorBox focus={this.focus}>
          <Editor
            editorState={this.state.editorState}
            placeholder="Tell a story"
            onChange={this.onChange}
            plugins={[ inlineToolbarPlugin, staticToolbarPlugin ]}
            ref={this.editor}
          />
          <Toolbar />
        </EditorBox>
        <InlineToolbar />
      </React.Fragment>
    );
  }
}

export default WrtingBookReviewContainer;
