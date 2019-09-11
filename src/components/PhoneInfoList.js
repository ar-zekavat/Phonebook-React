import React, { Component } from "react";
import PhoneInfo from "./PhoneInfo";
import styled from "styled-components";

const InfoList = styled.div`
  margin-top: 130px;
  margin-bottom: 100px;
`;

export default class PhoneInfoList extends Component {
  static defaultProps = {
    data: []
  };
  render() {
    const { data, onRemove, onUpdate } = this.props;

    const list = data.map(info => (
      <PhoneInfo
        onRemove={onRemove}
        onUpdate={onUpdate}
        info={info}
        key={info.id}
      />
    ));
    // key값을 통해 내부적으로 제거하거나, 업데이트를 하거나, 추가할 떄 효율적으로 사용,

    return <InfoList>{list}</InfoList>;
  }
}
