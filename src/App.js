import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import News from './components/News';
import 'bootstrap-icons/font/bootstrap-icons.css';


export default class App extends Component {
  state = {
    category: ' ',
    searchTerm: ''
  };

  changeCategory = (newCategory) => {
    this.setState({ category: newCategory, searchTerm: '' });
  };

  handleSearch = (term) => {
    this.setState({ searchTerm: term });
  };

  render() {
    return (
      <>
        <Navbar
          changeCategory={this.changeCategory}
          onSearch={this.handleSearch}
          activeCategory={this.state.category}
        />
        <News
          pageSize={6}
          category={this.state.category}
          searchTerm={this.state.searchTerm}
        />
      </>
    );
  }
}
