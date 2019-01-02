import React, { Component } from 'react'
import { Button, Form, Input, Image, Icon, Grid, Segment, Header, TextArea } from 'semantic-ui-react'
import IconHeader from '../../shared/IconHeader';

class Step1Fields extends Component {
  state = {
    files: [],
    tempFileUrl: ""
  }

  getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      console.log("in function",reader.result)
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  uploadFile = (event) => {
    let {files} = this.state
    files.splice(0, 1, event.target.files[0])
    // const logo = URL.createObjectURL(event.target.files[0])
    this.setState({files})
    let logo = ''
    this.getBase64(event.target.files[0], (result) => {
      logo = result;
      this.props.setLogo(result)
      console.log("in upload",result)
    });
    console.log(logo)
    // this.props.setLogo(logo)
  }

  fileURL = file => {
    const tempFileUrl = URL.createObjectURL(file)
    return tempFileUrl
  }

  saveAndContinue = (e) => {
    e.preventDefault()
    this.props.nextStep()
  }

  render() {
    const {value} = this.state
    const { values } = this.props
    return (
      <Grid centered>
        <Grid.Column width={12}>
          <IconHeader iconName='coffee' header="Create your roaster's profile" />
          <Form>
            {this.props.renderErrors()}
            <Form.Field control={Input} label='What is the name of your roaster?' placeholder='Roaster name' onChange={this.props.handleChange('name')} defaultValue={values.name} />
            <Form.Field control={TextArea} label='About' placeholder='Tell us more about your roaster...' onChange={this.props.handleChange('about')} defaultValue={values.about} />
            {values.logo.length == 0 ? 
              <Segment placeholder>
                <Form.Field>
                  <Header icon>
                    <Icon name="image outline"/>
                    No logo added
                  </Header>
                  <input type="file" onChange={(event)=>this.uploadFile(event)} className="inputfile" id="logoFileInput" />
                  <label htmlFor="logoFileInput" className="ui huge green button">
                    <i className="ui upload icon"></i> 
                    Upload Logo
                  </label>
                </Form.Field>
              </Segment>
            :
              <Segment textAlign="center" >
                <Image src={values.logo} size='medium' rounded centered spaced />
              </Segment>
            }
            <Button type='submit' onClick={this.saveAndContinue} className="ui primary right floated" icon labelPosition='right'>
              Next Step
              <Icon name='right arrow' />
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Step1Fields;