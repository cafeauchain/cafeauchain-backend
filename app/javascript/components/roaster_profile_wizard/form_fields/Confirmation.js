import React, { Component } from 'react'
import { Button, Grid, Icon, Form, Input } from 'semantic-ui-react'
import IconHeader from '../../shared/IconHeader';

class Confirmation extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  saveAndContinue = (e) => {
    e.preventDefault()
    this.props.submitProfile()
  }

  goBack = (e) => {
    e.preventDefault()
    this.props.previousStep()
  }

  render() {
    const {value} = this.state
    return (
      <Grid centered>
        <Grid.Column width={12}>
          <Form>
            <IconHeader iconName='coffee' header="Confirm your profile info" />
            
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

export default Confirmation;