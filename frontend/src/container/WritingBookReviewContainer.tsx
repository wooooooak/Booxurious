import * as React from 'react';
import axios from 'axios';
import * as ReactQuill from 'react-quill'; // Typescript

import Cover from '../component/Write/Cover';
import ImageUploader from '../component/Write/ImageUploader';
import EditorBox from '../component/Write/EditorBox';

import 'react-quill/dist/quill.snow.css';

interface State {
  editorState: any;
  postTitle: string;
  subTitle?: string;
  bookCoverImg?: string | null;
  uploadingImg: boolean;
}

const modules = {
  toolbar: [
    [ { font: [ { label: 'Monospace', value: 'monospace' } ] } ],
    [ { header: [ 1, 2, false ] } ],
    [ 'bold', 'italic', 'underline', 'strike', 'blockquote' ],
    [ { list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' } ],
    [ 'link', 'image' ],
    [ 'clean' ]
  ]
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image'
];

class WrtingBookReviewContainer extends React.Component<{}, State> {
  state = {
    editorState: '',
    postTitle: '',
    subTitle: '',
    bookCoverImg: null,
    uploadingImg: false
  };

  constructor (props: any) {
    super(props);
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
    console.log('focus');
  };

  render () {
    const Quill = ReactQuill as any;
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
          <Quill
            theme="snow"
            value={this.state.editorState}
            onChange={this.onChange}
            modules={modules}
            formats={formats}
          />
        </EditorBox>
      </React.Fragment>
    );
  }
}

export default WrtingBookReviewContainer;
