import * as React from "react";
import { Modal as AntModal, Input, Tooltip } from "antd";

interface Props {
  visible: boolean;
  username: string;
  title: string;
  onCancel(): void;
  onOk(username: string): void;
}

interface State {
  username: string;
}

class Modal extends React.Component<Props, State> {
  state = {
    username: ""
  };

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      username: e.currentTarget.value
    });
  };

  render () {
    const { title, username, visible, onCancel, onOk } = this.props;
    return (
      <AntModal
        title={title}
        visible={visible}
        onOk={() => onOk(this.state.username)}
        // confirmLoading={confirmLoading}
        onCancel={onCancel}
      >
        <Tooltip placement="left" title="변경할 닉네임">
          <Input placeholder={username} onChange={this.onChange} />
        </Tooltip>
      </AntModal>
    );
  }
}

export default Modal;
