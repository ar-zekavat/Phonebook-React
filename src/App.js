import React, { Component } from "react";
import PhoneForm from "./components/PhoneForm";
import PhoneInfoList from "./components/PhoneInfoList";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body{
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
  };
  body{
    background-color: #333;
  };
  h1,h3{
    margin:0;
  };
  #root{
    height:100%;
    padding: 100px 0;
    box-sizing:border-box;
  };
  ::-webkit-scrollbar { 
    display: none; 
};
  input{
    outline:none;
    border:none;
    border-radius: 25px;
  };
  select{
    outline:none;
    border:none;
  }
  button{
    outline:none;
    border:none;
  }
  `;

const PhoneBook = styled.div`
  margin: auto;
  width: 500px;
  height: 100%;
  background: linear-gradient(45deg, #ffc3cd, #ffeff2);
  border-radius: 50px;
  overflow-y: scroll;
  user-select: none;
`;
const BookHead = styled.div`
  position: fixed;
  width: 500px;
  height: 100px;
  padding-top: 10px;
  background-color: #ffeff2;
  border-radius: 40px 40px 0 0;
  text-align: center;
  z-index: 9999;
`;
const Title = styled.div`
  text-align: center;
`;
const SearchInput = styled.input`
  width: 340px;
  height: 35px;
  font-size: 20px;
  margin-top: 10px;
  padding: 0 25px;

  text-align: center;
  box-sizing: border-box;
  background: #ddd;
  transition: background 0.3s;

  &:focus {
    background: #fff;
  }
`;
const BookBottom = styled.div`
  position: fixed;
  bottom: 100px;
  width: 500px;
  height: 80px;

  background: linear-gradient(45deg, #ffc3cd, #ffeff2);
  border-radius: 0 0 40px 40px;
  z-index: 9999;
`;

class App extends Component {
  id = 3;
  state = {
    information: [
      {
        id: 0,
        name: "Alireza",
        phone: "010-0000-0001",
        line: "Phone"
      },
      {
        id: 1,
        name: "Mohammad",
        phone: "010-0000-0001",
        line: "Home"
      }
    ],
    keyword: ""
  };
  componentDidMount() {
    this.searchInput.focus();
  }
  handleChange = e => {
    this.setState({
      keyword: e.target.value
    });
  };

  handleCreate = data => {
    // 리액트는 불변성을 유지해야 한다.
    const { information } = this.state;
    this.setState({
      information: information.concat({
        ...data,
        id: this.id++
      })
    });
  };
  handleRemove = id => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  };

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(info => {
        if (info.id === id) {
          return {
            id,
            ...data
          };
        }
        return info;
      })
    });
  };

  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <PhoneBook>
          <BookHead>
            <Title>
              <h1>Phone Book</h1>
            </Title>
            <SearchInput
              value={this.state.keyword}
              onChange={this.handleChange}
              placeholder="Search Contact"
              ref={ref => (this.searchInput = ref)}
            />
          </BookHead>
          <PhoneInfoList
            data={this.state.information.filter(
              info => info.name.indexOf(this.state.keyword) > -1
            )}
            onRemove={this.handleRemove}
            onUpdate={this.handleUpdate}
          />
          <BookBottom>
            <PhoneForm onCreate={this.handleCreate} />
          </BookBottom>
        </PhoneBook>
      </React.Fragment>
    );
  }
}

export default App;
