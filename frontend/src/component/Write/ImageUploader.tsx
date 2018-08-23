import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import styledTS from 'styled-components-ts';
import { Upload } from 'styled-icons/feather/Upload';
import { Loader } from 'styled-icons/feather/Loader';

const Conatiner = styled.div`
  width: 180px;
  height: 280px;
  margin-left: auto;
`;

interface ImgProps {
  bookCoverImge: string | null;
}

const Img = styledTS<ImgProps>(styled.div)`
  position: absolute;
  background-color: #f8f4f3;
  background-image: url('${(props) => props.bookCoverImge}');
  background-repeat: no-repeat;
  background-size: cover;
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

const lodingAnimation = keyframes`
    from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loding = Loader.extend`animation: ${lodingAnimation} 2s linear infinite;`;

interface Props {
  bookCoverImg: string | null;
  uploadingImg: boolean;
  fileChangedHandler(e: FileList | null): void;
}

const ImageUploader: React.SFC<Props> = ({
  bookCoverImg,
  uploadingImg,
  fileChangedHandler
}) => {
  return (
    <Conatiner>
      <Img bookCoverImge={bookCoverImg}>
        {uploadingImg ? (
          <React.Fragment>
            <Loding size={70} />
            <p>이미지 등록 중!</p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Upload size={40} />
            <p>Book Cover Image</p>
          </React.Fragment>
        )}
      </Img>
      <FileUploaderButton onChange={(e) => fileChangedHandler(e.target.files)} />
    </Conatiner>
  );
};

export default ImageUploader;
