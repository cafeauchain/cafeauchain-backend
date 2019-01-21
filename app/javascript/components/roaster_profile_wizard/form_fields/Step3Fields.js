import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button, Form, Grid, Icon, Input } from 'semantic-ui-react'
import IconHeader from '../../shared/IconHeader';

class Step3Fields extends Component {
    state = {}

    saveAndContinue = (e) => {
        const { nextStep } = this.props

        e.preventDefault()
        nextStep()
    }

    goBack = (e) => {
        const { previousStep } = this.props
        
        e.preventDefault()
        previousStep()
    }

    render() {
        const {values, renderErrors, handleChange} = this.props
        return (
            <Grid centered>
                <Grid.Column width={12}>
                    <IconHeader iconName='coffee' header="Step 3: Website & Social" />
                    <Form>
                        {renderErrors()}
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label htmlFor="form-input-url">What is your website address?</label>
                                <Input 
                                    id="form-input-url" 
                                    label='http://' 
                                    placeholder='URL' 
                                    onChange={handleChange('url')} 
                                    defaultValue={values.url}
                                />
                            </Form.Field>       
                            <Form.Field 
                                control={Input} 
                                label='What is your Twitter handle?' 
                                placeholder='Twitter' 
                                onChange={handleChange('twitter')} 
                                defaultValue={values.twitter} 
                            />
                            <Form.Field 
                                control={Input} 
                                label='What is your Facebook link?' 
                                placeholder='Facebook' 
                                onChange={handleChange('facebook')} 
                                defaultValue={values.facebook}    
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

Step3Fields.propTypes = {
    renderErrors: func,
    handleChange: func,
    nextStep: func,
    previousStep: func,
    values: object
};

export default Step3Fields;