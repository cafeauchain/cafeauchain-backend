import React, { Component } from 'react'
import { Button, Grid, Icon, Form, Input, Select } from 'semantic-ui-react'
import IconHeader from '../../shared/IconHeader';
import usStates from '../../utilities/usStates';

class Step2Fields extends Component {

  state= {}

  handleChange = state => {
    console.log(state)
    this.props.handleState(state)
  }

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
          <IconHeader iconName='coffee' header="Step 2: Location" />
          <Form>
            {this.props.renderErrors()}
            <Form.Group widths='equal'>
              <Form.Field
                id='form-input-address-1'
                control={Input}
                label="Address"
                placeholder="Address"
                onChange={this.props.handleChange('address_1')}
                defaultValue={values.address_1}
              />
              <Form.Field
                id='form-input-address-2'
                control={Input}
                label="Suite, PO Box, etc"
                placeholder="Suite, PO Box, etc"
                onChange={this.props.handleChange('address_2')}
                defaultValue={values.address_2}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field
                id='form-input-control-city'
                control={Input}
                label='City'
                placeholder='City'
                onChange={this.props.handleChange('city')}
                defaultValue={values.city}
              />
              <Form.Field
                control={Select}
                options={usStates}
                label={{ children: 'State', htmlFor: 'form-select-control-state' }}
                placeholder='State'
                search
                searchInput={{ id: 'form-select-control-state' }}
                onChange={(e, {value}) => this.handleChange(value)}
                defaultValue={values.state}
              />
              <Form.Field
                id='form-input-control-zip-code'
                control={Input}
                label='Zip Code'
                placeholder='Zip Code'
                onChange={this.props.handleChange('zip_code')}
                defaultValue={values.zip_code}
              />
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

export default Step2Fields;