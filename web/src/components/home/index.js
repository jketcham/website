import React, { Component } from 'react';


class HomePage extends Component {
  renderSomething() {
    return <span>something</span>;
  }

  render() {
    return (
      <div className="home-page">
        <h1>Jack Ketcham</h1>
        <div>
          {this.renderSomething()}
        </div>
      </div>
    );
  }
}


export default HomePage;
