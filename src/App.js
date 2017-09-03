import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from "@blueprintjs/core";
import Sidebar from 'infra/layout/Sidebar';
import Header from 'infra/layout/Header';
// import ComprovantePreview from 'modules/frete/emTransito/pages/ComprovanteRecebidoPage/components/ComprovantePreview';


class App extends Component {
  render() {
    return (
      <div className="default-theme wrapper">

        <Sidebar />

        <div className="main-panel">

          <Header />

          <div className="content">
            <div className="container-fluid">
              {this.props.children}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
