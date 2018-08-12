import * as React from 'react';
import styled from 'styled-components';
import { Upload } from 'styled-icons/feather/Upload';

const Conatiner = styled.div`
  width: 180px;
  height: 280px;
  margin-left: auto;
`;
const Img = styled.div`
  position: absolute;
  background-color: #f8f4f3;
  height: 280px;
  width: 180px;
  /* margin-left: auto; */
  border-radius: 10px;
  box-shadow: 5px 5px 5px grey;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FileUploaderButton = styled.input.attrs({
  type: 'file'
})`
  position: absolute;
  height: 280px;
  width: 180px;
  opacity: 0;
  background-color: white;
  cursor: pointer;
`;

interface Props {
  fileChangedHandler(e: FileList | null): void;
}

class ImageUploader extends React.Component<Props, {}> {
  render () {
    return (
      <Conatiner>
        <Img>
          <Upload size={40} />
          <p>Book Cover Image</p>
        </Img>
        <FileUploaderButton
          onChange={(e) => this.props.fileChangedHandler(e.target.files)}
        />
      </Conatiner>
    );
  }
}

export default ImageUploader;
