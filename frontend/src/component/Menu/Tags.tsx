import * as React from 'react';
import styled from 'styled-components';

const TagsBox = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

const Tag = styled.li`
  margin-left: 15px;
  font-size: 0.9em;
  color: black;
`;

class Tags extends React.Component<{}, {}> {
  render () {
    return (
      <TagsBox>
        <Tag>소설</Tag>
        <Tag>문학</Tag>
        <Tag>자기계발</Tag>
        <Tag>IT</Tag>
        <Tag>역사</Tag>
        <Tag>경제</Tag>
        <Tag>경영</Tag>
        <Tag>여행</Tag>
        <Tag>수험서</Tag>
        <Tag>자격증</Tag>
        <Tag> ...더보기 </Tag>
      </TagsBox>
    );
  }
}

export default Tags;
