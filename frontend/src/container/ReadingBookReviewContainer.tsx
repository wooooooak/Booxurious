import * as React from "react";

import Cover from "../component/Write/Cover";
import ImageUploader from "../component/Write/ImageUploader";
import { PostState } from "../store/modules/Post";
import axios from "axios";
import { EditorBoxLayout } from "src/component/Write/style";

type State = PostState;

interface Props {
  postId: string;
}

class ReadingBookReviewContainer extends React.Component<Props, State> {
  state = {
    id: "",
    editorState: "",
    fk_user_id: "",
    fk_category_id: "",
    postTitle: "",
    subTitle: "",
    category: "",
    createdAt: "",
    updatedAt: "",
    rate: 2.5,
    like: 0,
    bookCoverImg: null
  };

  async componentDidMount () {
    const { data } = await axios({
      method: "get",
      url: `${process.env.REACT_APP_DOMAIN}/post/post_id`,
      params: { postId: this.props.postId }
    });
    this.setState({
      ...data
    });
  }

  render () {
    const { postTitle, subTitle, bookCoverImg, editorState } = this.state;
    return (
      <React.Fragment>
        <Cover type="read" postTitle={postTitle} subTitle={subTitle}>
          <ImageUploader bookCoverImg={bookCoverImg} uploadingImg={false} type="read" />
        </Cover>
        <EditorBoxLayout isAffixToolbar={false}>
          <div dangerouslySetInnerHTML={{ __html: editorState }} />
        </EditorBoxLayout>
      </React.Fragment>
    );
  }
}

export default ReadingBookReviewContainer;
