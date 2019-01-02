import React, { Component } from 'react'
import { Button, Form, Grid, Icon, Input } from 'semantic-ui-react'
import IconHeader from '../../shared/IconHeader';

class Step3Fields extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  saveAndContinue = (e) => {
    e.preventDefault()
    this.props.nextStep()
  }

  goBack = (e) => {
    e.preventDefault()
    this.props.previousStep()
  }

  render() {
    const {values} = this.props
    return (
      <Grid centered>
        <Grid.Column width={12}>
          <IconHeader iconName='coffee' header="Step 3: URL & Social" />
          <Form>
            {this.props.renderErrors()}
            <Form.Group widths="equal">
              <Form.Field>
                <label htmlFor="form-input-url">What is your website address?</label>
                <Input id="form-input-url" label='http://' placeholder='URL' onChange={this.props.handleChange('url')} defaultValue={values.url} />
              </Form.Field>       
              <Form.Field control={Input} label='What is your Twitter handle?' placeholder='Twitter' onChange={this.props.handleChange('twitter')} defaultValue={values.twitter} />
              <Form.Field control={Input} label='What is your Facebook link?' placeholder='Facebook' onChange={this.props.handleChange('facebook')} defaultValue={values.facebook} />
            </Form.Group>
            <Button type='submit' onClick={this.goBack} className="ui left floated" icon labelPosition='left'>
              Previous Step
              <Icon name='left arrow' />
            </Button>
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

export default Step3Fields;