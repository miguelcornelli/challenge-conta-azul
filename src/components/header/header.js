import React, {Component} from 'react';
import './header.scss';

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="logo">
          <img src="/img/logo.svg" alt="Logo" height="25" />
        </div>
      </header>
    );
  }

}
