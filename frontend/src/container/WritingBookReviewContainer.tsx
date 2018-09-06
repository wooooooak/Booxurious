import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as ReactQuill from 'react-quill';

import { IStoreState } from '../store/modules';
import { actionCreators as postActionCreator } from '../store/modules/Post';
import { PostState } from '../store/modules/Post';

import Cover from '../component/Write/Cover';
import ImageUploader from '../component/Write/ImageUploader';
import EditorBox from '../component/Write/EditorBox';
import SendButton from '../component/Write/SendButton';

import 'react-quill/dist/quill.snow.css';

interface State extends PostState {}

type StoreProps = PostState;

interface DispatchProps {
  postAction: typeof postActionCreator;
}

interface OwnProps {}

type Props = StoreProps & DispatchProps & OwnProps;
const Quill = ReactQuill as any;

let modules: object = {};
const toolbarContainer: any[] = [
  [ { font: [ 'miraza', 'roboto', 'amam' ] } ],
  [ { header: [ 1, 2, false ] } ],
  [ 'bold', 'italic', 'underline', 'strike', 'blockquote' ],
  [ { list: 'ordered' }, { list: 'bullet' } ],
  [ 'link', 'image' ],
  [ { align: [] } ],
  [ 'clean' ]
];
const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'align'
];

class WrtingBookReviewContainer extends React.Component<Props, State> {
  static getDerivedStateFromProps (nextProps: Props) {
    return nextProps;
  }

  state = {
    editorState: '',
    postTitle: '',
    subTitle: '',
    category: '',
    bookCoverImg: null,
    uploadingImg: false,
    rate: 0
  };
  private quill: typeof Quill;

  constructor (props: any) {
    super(props);
    this.quill = React.createRef();
  }

  componentDidMount () {
    modules = {
      toolbar: {
        container: toolbarContainer,
        handlers: {
          image: this.imageHandler
        }
      }
    };
    const { postTitle, subTitle, editorState, bookCoverImg } = this.props;
    this.setState({
      postTitle,
      subTitle,
      editorState,
      bookCoverImg
    });
  }

  imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const token: string | null = localStorage.getItem('token');
      const quill = this.quill.current.getEditor();
      try {
        if (input.files) {
          const file: File | null = input.files[0];
          const formData = new FormData();
          formData.append('imgFile', file, file.name);
          const result = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_DOMAIN}/post/contetImage`,
            data: formData,
            headers: { 'Auth-Header': token },
            onUploadProgress: () => {
              console.log('로딩 중입니다');
            }
          });
          const source: string = result.data.location;
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', source);
        }
      } catch (error) {
        alert(error);
      }
    };
  };

  onChangeContent = (editorState: string) => {
    this.props.postAction.onChangePostContent(editorState);
  };

  onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.postAction.onChangePostTitle(e.currentTarget.value);
  };
  onChangeSubTitle = (e: React.FormEvent<HTMLTextAreaElement>) => {
    this.props.postAction.onChangeSubTitle(e.currentTarget.value);
  };

  bookCoverImageChangedHandler = (files: FileList) => {
    this.props.postAction.OnChangeBookCoverImg(files);
  };

  onClickWritePost = () => {
    this.props.postAction.writePost(this.state);
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
            fileChangedHandler={this.bookCoverImageChangedHandler}
            bookCoverImg={this.state.bookCoverImg}
            uploadingImg={this.state.uploadingImg}
          />
        </Cover>
        <EditorBox>
          <Quill
            ref={this.quill}
            theme="snow"
            value={this.state.editorState}
            onChange={this.onChangeContent}
            modules={modules}
            formats={formats}
          />
        </EditorBox>
        <SendButton onClickSubmit={this.onClickWritePost} />
      </React.Fragment>
    );
  }
}

export default connect<StoreProps, DispatchProps, OwnProps>(
  ({ Post }: IStoreState): StoreProps => ({
    editorState: Post.editorState,
    postTitle: Post.postTitle,
    subTitle: Post.subTitle,
    category: Post.category,
    bookCoverImg: Post.bookCoverImg,
    uploadingImg: Post.uploadingImg,
    rate: Post.rate
  }),
  (dispatch: any) => ({
    postAction: bindActionCreators(postActionCreator, dispatch)
  })
)(WrtingBookReviewContainer);
