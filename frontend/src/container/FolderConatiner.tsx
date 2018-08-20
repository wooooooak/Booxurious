import * as React from 'react';
import axios from 'axios';

import MakingForm from '../component/WorkFolder/MakingForm';
import FolderChoicer from '../component/WorkFolder/FolderChoicer';

interface Props {}
interface State {
  coverImgSource: string;
}

class FolderContainer extends React.Component<Props, State> {
  state = {
    coverImgSource:
      'https://cdn.pixabay.com/photo/2018/08/03/11/48/skyline-3581739__340.jpg'
  };

  onChangeCoverImgHandler = async (files: FileList) => {
    const file: File | null = files[0];
    const formData = new FormData();
    formData.append('imgFile', file, file.name);
    const token: string | null = localStorage.getItem('token');
    try {
      const result = await axios({
        method: 'post',
        url: 'http://localhost:8080/folder/folderCoverImage',
        data: formData,
        headers: { 'Auth-Header': token },
        onUploadProgress: () => {
          console.log('로딩 중입니다');
        }
      });
      this.setState({
        coverImgSource: result.data.location
      });
    } catch (error) {
      alert(error);
    }
  };

  render () {
    const { coverImgSource } = this.state;
    return (
      <React.Fragment>
        <MakingForm
          onChangeCoverImgHandler={this.onChangeCoverImgHandler}
          coverImgSource={coverImgSource}
        />
        <FolderChoicer />
      </React.Fragment>
    );
  }
}

export default FolderContainer;
