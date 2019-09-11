import React, { Component } from "react";
import styled from "styled-components";

const CardContent = styled.div`
  display: flex;
  flex: 2.5;
  padding: 10px 0 0 20px;
  box-sizing: border-box;
`;
const Input = styled.input`
  font-size: 18px;
  font-weight: 700;
  background-color: #eee;
`;
const CardButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const DelButton = styled.button`
  margin-left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 2em;
  background-color: #ff0000;
  opacity: 0.7;
  line-height: 1;
  cursor: pointer;
  transition: opacity 0.4s;
  &:hover {
    opacity: 1;
  }
`;
const EditButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 2em;
  opacity: 0.7;
  line-height: 1;
  cursor: pointer;
  transition: opacity 0.4s;
  &:hover {
    opacity: 1;
  }
`;

export default class PhoneInfo extends Component {
  state = {
    editing: false,
    name: "",
    phone: "",
    line: ""
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    //scu를 통해 같은 데이터를 가진 컴포넌트를 re-rendering 하지않음으로서 성능을 올림
    if (this.state !== nextState) {
      return true;
    }
    return this.props.info !== nextProps.info;
  };

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  };

  handleToggleEdit = () => {
    const { info, onUpdate } = this.props;
    if (this.state.editing) {
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone,
        line: this.state.line
      });
    } else {
      this.setState({
        name: info.name,
        phone: info.phone,
        line: info.line
      });
    }

    this.setState({
      editing: !this.state.editing
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { name, phone, line } = this.props.info;
    const { editing } = this.state;

    const style = {
      display: "flex",
      height: "60px",
      padding: "8px",
      margin: "8px",
      background: "#fff",
      borderRadius: "10px"
    };

    return (
      <div style={style}>
        {editing ? (
          <CardContent>
            <div>
              <Input
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
              <Input
                name="phone"
                onChange={this.handleChange}
                value={this.state.phone}
              />
            </div>
            <div>
              <select
                name="line"
                onChange={this.handleChange}
                value={this.state.line}
              >
                <option value="Phone">Phone</option>
                <option value="Home">Home</option>
              </select>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <div>
              <h3>{name}</h3>
              {phone}
            </div>
            <div>{line}</div>
          </CardContent>
        )}
        <CardButton>
          <EditButton onClick={this.handleToggleEdit}>
            {editing ? "\u270E	" : `\u2692`}
          </EditButton>
          <DelButton onClick={this.handleRemove}>&times;</DelButton>
        </CardButton>
      </div>
    );
  }
}
