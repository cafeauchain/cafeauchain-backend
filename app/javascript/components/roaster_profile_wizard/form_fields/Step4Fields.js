import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import IconHeader from '../../shared/IconHeader';

class Step4Fields extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const {value} = this.state
    return (
      <Form>
        <IconHeader iconName='coffee' header="Create your roaster's profile" />
        <Form.Group inline>
          <Form.Field control={Input} label='What is the name of your roaster?' placeholder='Roaster name' />
        </Form.Group>
      </Form>
    )
  }
}

export default Step4Fields;