import * as React from 'react';
import MakingForm from '../component/WorkFolder/MakingForm';
import FolderChoicer from '../component/WorkFolder/FolderChoicer';

interface Props {}
interface State {}

class FolderContainer extends React.Component<Props, State> {
  render () {
    return (
      <React.Fragment>
        <MakingForm />
        <FolderChoicer />
      </React.Fragment>
    );
  }
}

export default FolderContainer;
