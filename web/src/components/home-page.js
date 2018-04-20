import React, { Component } from 'react';


class HomePage extends Component {
  renderSomething() {
    return <span>something</span>;
  }

  render() {
    return (
      <div className="home-page">
        welcome to the home page.
        <div>
          verified
          {this.renderSomething()}
        </div>
      </div>
    );
  }
}


export default HomePage;
