import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button, Grid, Icon, Form, Input, Select } from 'semantic-ui-react'
import IconHeader from '../../shared/IconHeader';
import usStates from '../../utilities/usStates';

class Step2Fields extends Component {

  state= {}

    handleChange = state => {
        const {handleState} = this.props
        handleState(state)
    }

    saveAndContinue = (e) => {
        const {nextStep} = this.props
        
        e.preventDefault()
        nextStep()
    }

    goBack = (e) => {
        const {previousStep} = this.props

        e.preventDefault()
        previousStep()
    }

    render() {
        const {values, renderErrors, handleChange} = this.props
        return (
            <Grid centered>
                <Grid.Column width={12}>
                    <IconHeader iconName='coffee' header="Step 2: Location" />
                    <Form>
                        {renderErrors()}
                        <Form.Group widths='equal'>
                            <Form.Field
                                id='form-input-address-1'
                                control={Input}
                                label="Address"
                                placeholder="Address"
                                onChange={handleChange('address_1')}
                                defaultValue={values.address_1}
                            />
                            <Form.Field
                                id='form-input-address-2'
                                control={Input}
                                label="Suite, PO Box, etc"
                                placeholder="Suite, PO Box, etc"
                                onChange={handleChange('address_2')}
                                defaultValue={values.address_2}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field
                                id='form-input-control-city'
                                control={Input}
                                label='City'
                                placeholder='City'
                                onChange={handleChange('city')}
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
                                onChange={handleChange('zip_code')}
                                defaultValue={values.zip_code}
                            />
                        </Form.Group>
                        <Button
                            type='submit' 
                            onClick={this.goBack} 
                            className="ui left floated" 
                            icon 
                            labelPosition='left'
                        >
                            Previous Step
                            <Icon name='left arrow' />
                        </Button>
                        <Button 
                            type='submit' 
                            onClick={this.saveAndContinue} 
                            className="ui primary right floated" 
                            icon 
                            labelPosition='right'
                        >
                            Next Step
                            <Icon name='right arrow' />
                        </Button>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}

const { func, object } = PropTypes;
Step2Fields.propTypes = {
    renderErrors: func,
    handleChange: func,
    handleState: func,
    nextStep: func,
    previousStep: func,
    values: object
};

export default Step2Fields;