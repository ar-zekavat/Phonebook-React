import React, { Component } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
`;
const InputArea = styled.div`
  flex: 1;
  padding: 10px 0;
  padding-left: 100px;
  box-sizing: border-box;
`;

const NameInput = styled.input`
  width: 90px;
  height: 25px;
  padding-left: 15px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 700;
`;
const PhoneInput = styled.input`
  margin-top: 5px;
  height: 25px;
  padding-left: 15px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 700;
`;
const LineSelect = styled.select`
  margin-left: 5px;
  height: 20px;
`;

const ButtonArea = styled.div`
  flex: 1;
  padding-top: 15px;
  padding-left: 10px;
  box-sizing: border-box;
`;
const SubmitButton = styled.button`
  width: 90px;
  height: 40px;
  font-size: 22px;
  font-weight: 700;
  border-radius: 10px;

  background-color: #fff;
  box-shadow: 0 1px 1px #ddd;
  transition: background-color 0.3s;
  cursor: pointer;

  &:disabled {
    background-color: #ddd;
    box-shadow: 0 1px 0 #ddd;
    cursor: auto;
  }
`;

export default class PhoneForm extends Component {
  state = {
    name: "",
    phone: "",
    line: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.input.focus();
    this.props.onCreate(this.state);
    this.setState({
      name: "",
      phone: "",
      line: ""
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputArea>
          <NameInput
            name="name"
            placeholder="Name"
            onChange={this.handleChange}
            value={this.state.name}
            autoComplete="off"
            ref={ref => (this.input = ref)}
          />
          <LineSelect
            name="line"
            onChange={this.handleChange}
            value={this.state.line}
          >
            <option value="">Select</option>
            <option value="Phone">Phone</option>
            <option value="Home">Home</option>
          </LineSelect>
          <PhoneInput
            name="phone"
            placeholder="phone"
            onChange={this.handleChange}
            value={this.state.phone}
            autoComplete="off"
          />
        </InputArea>
        <ButtonArea>
          <SubmitButton
            type="submit"
            disabled={!this.state.line || !this.state.name || !this.state.phone}
          >
            Add
          </SubmitButton>
        </ButtonArea>
      </Form>
    );
  }
}
