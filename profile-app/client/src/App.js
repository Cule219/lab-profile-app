import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import AddThing from './components/AddThing';
import Protected from "./components/Protected";

import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

import Home from "./containers/Home";
import Axios from "axios";

class App extends React.Component {
  state = {
    user: this.props.user,
    selectedFile: null
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }
  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    Axios.post('/auth/upload', fd).next(
      response => console.log(response)
    );
  }
  render() {
    return (
      <div className="App">
        <Navbar setUser={this.setUser} user={this.state.user} />
        <AddThing />
        <input type="file" onClick={this.fileSelectedHandler}/>
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    );
  }
}

export default App;

