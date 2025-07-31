import React, { Component } from 'react';
import './Navbar.css'; 

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.searchText);
  };

  render() {
    const categories = ['Business', 'Technology', 'Health', 'Science', 'Sports', 'Entertainment', 'General'];

    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center" href="/">
              <i className="bi bi-newspaper" style={{ fontSize: '1.5rem', color: '#0d6efd' }}></i>
              <strong className="ms-2">NewsMonkey</strong>
            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
  <span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navbarContent">

              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"><button className="btn btn-link nav-link" onClick={() => this.props.changeCategory('general')}>Home</button></li>
                <li className="nav-item"><button className="btn btn-link nav-link" onClick={() => this.props.changeCategory('about')}>About</button></li>
                <li className="nav-item"><button className="btn btn-link nav-link" onClick={() => this.props.changeCategory('saved')}>Saved</button></li>
              </ul>

              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search news..."
                  value={this.state.searchText}
                  onChange={this.handleInputChange}
                />
                <button className="btn btn-outline-primary" onClick={this.handleSearch}>🔍</button>
              </div>
            </div>
          </div>
        </nav>

        {/* Category Button Row */}
        <div className="category-bar px-3 py-2 shadow-sm bg-white">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${this.props.activeCategory === cat.toLowerCase() ? 'active' : ''}`}
              onClick={() => this.props.changeCategory(cat.toLowerCase())}
            >
              {cat}
            </button>
          ))}
        </div>
      </>
    );
  }
}

export default Navbar;
