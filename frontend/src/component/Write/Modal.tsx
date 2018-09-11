import * as React from 'react';
import { Modal as AntdModal, Rate, Select } from 'antd';

const Option = Select.Option;

interface Props {
  rate: number;
  category: string;
  modalState: boolean;
  onClickModalCancle(): void;
  onClickModalOk(): void;
  onChangeRate(value: number): void;
  onChangeCategory(category: string): void;
  onClickModalButton(): void;
}

const cateories = [
  '문학',
  '소설',
  '자기계발',
  'IT서적',
  '경영',
  '경제',
  '여행',
  '수험서',
  '자격증',
  '외국어',
  '시',
  '에세이'
];

const mapCaegoriesToOption = (array: string[]) => {
  return array.map((cateory, index) => {
    return (
      <Option key={index} value={cateory}>
        {cateory}
      </Option>
    );
  });
};

const Modal: React.SFC<Props> = ({
  rate,
  category,
  onClickModalCancle,
  onClickModalOk,
  modalState,
  onChangeRate,
  onChangeCategory,
  onClickModalButton
}) => (
  <div>
    <button onClick={onClickModalButton}> finish</button>
    <AntdModal
      title="Modal"
      visible={modalState}
      onOk={onClickModalOk}
      onCancel={onClickModalCancle}
      okText="확인"
      cancelText="취소"
    >
      <h2>평점을 매겨보세요.</h2>
      <Rate
        allowHalf={true}
        defaultValue={2.5}
        onChange={(value: number) => onChangeRate(value)}
      />
      <h2>어떤 카테고리에 속하나요?</h2>
      <Select
        defaultValue="문학"
        style={{ width: 120 }}
        onSelect={(value) => onChangeCategory(value as string)}
      >
        {mapCaegoriesToOption(cateories)}
      </Select>
    </AntdModal>
  </div>
);

export default Modal;
