import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import Axios from 'axios';


const path = require('path');
const multer = require('multer');
const GridFSStorage = require('multer-gridfs-storage');
const grid = require('multer-gridfs-stream');



export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      imageUrl: ""
    };
  }
  handleUpload (theFile) {
    // console.log('file in service: ', theFile)
    return Axios.post('/api/upload', theFile)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  saveNewThing (newThing) {
    // console.log('new thing is: ', newThing)
    return Axios.post('/things/create', newThing)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  handleChange = e => {  
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    
    this.handleUpload(uploadData)
    .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  // this method submits the form
  handleSubmit = e => {
      e.preventDefault();
      
      this.saveNewThing(this.state)
      .then(res => {
          console.log('added: ', res);
          // here you would redirect to some other page 
      })
      .catch(err => {
          console.log("Error while adding the thing: ", err);
      });
  }  
  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
      <label>Name</label>
      <input 
          type="text" 
          name="name" 
          value={ this.state.name } 
          onChange={ e => this.handleChange(e)} />
      <label>Description</label>
      <textarea 
          type="text" 
          name="description" 
          value={ this.state.description } 
          onChange={ e => this.handleChange(e)} />
      <input 
          type="file" 
          onChange={(e) => this.handleFileUpload(e)} /> 
      <button type="submit">Save new thing</button>
  </form>
    // <Form action="/api/upload" method="POST" encType="multipart/form-data">
    //  <Form.Group>
    //  <Form.Label htmlFor="file">File:</Form.Label>
    //   <Form.Control type="file" id="file"/>
    //   <Button type="submit">Upload</Button>
    //  </Form.Group>
    // </Form>
    )
  }
}
