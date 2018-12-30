import React, { Component } from 'react'
import { Button, Form, TextArea } from 'semantic-ui-react'
import IconHeader from '../../shared/IconHeader';

class Step2Fields extends Component {
  state = {
    files: []
  }

  handleChange = (e, { value }) => this.setState({ value })

  uploadFile = (event) => {
    let {files} = this.state
    files.splice(0, 1, event.target.files[0])
    this.setState({files})
  }

  render() {
    const {value} = this.state
    return (
      <Form>
        <IconHeader iconName='coffee' header="Step 2: Logo and Description" />
        <Form.Field control={TextArea} label='About' placeholder='Tell us more about your roaster...' onChange={this.handleChange} />
        <input type="file" onChange={(event)=>this.uploadFile(event)} className="inputfile" id="logoFileInput" />
        <label htmlFor="logoFileInput" className="ui huge green floated button">
          <i className="ui upload icon"></i> 
          Upload Logo
        </label>
      </Form>
    )
  }
}

export default Step2Fields;