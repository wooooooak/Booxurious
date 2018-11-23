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
  background-color: ${(props) => (props.bookCoverImge ? null : 'transparent')};
  background-image: url('${(props) => props.bookCoverImge}');
  background-repeat: no-repeat;
  background-size: cover;
  height: 280px;
  width: 180px;
  /* margin-left: auto; */
  border-radius: 10px;
  box-shadow: ${(props) =>
		props.bookCoverImge ? '5px 5px 5px grey' : 'transparent'};
  cursor: ${(props) => (props.bookCoverImge ? 'pointer' : null)};
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
	type: 'write' | 'read';
	bookCoverImg: string | null;
	uploadingImg: boolean;
	fileChangedHandler?(e: FileList | null): void;
}

const ImageUploader: React.SFC<Props> = ({
	bookCoverImg,
	uploadingImg,
	fileChangedHandler,
	type
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
						{type === 'write' ? (
							<React.Fragment>
								<Upload size={40} />
								<p>Book Cover Image</p>
							</React.Fragment>
						) : null}
					</React.Fragment>
				)}
			</Img>
			{fileChangedHandler ? (
				<FileUploaderButton
					onChange={(e) => fileChangedHandler(e.target.files)}
				/>
			) : null}
		</Conatiner>
	);
};

export default ImageUploader;
