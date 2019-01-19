import React, { Component } from "react";
import PropTypes from "prop-types";
import shortid from 'shortid';
import { Button, Form, Grid, Icon, List, Image } from "semantic-ui-react";
import humanize from "../../utilities/humanize";
import IconHeader from "../../shared/IconHeader";

class Confirmation extends Component {
    state = {};

    saveAndContinue = e => {
        const { submitProfile } = this.props

        e.preventDefault();
        submitProfile();
    };

    goBack = e => {
        const { previousStep } = this.props

        e.preventDefault();
        previousStep();
    };

    renderProfileItems = () => {
        const { values } = this.props;
        return Object.keys(values).map((key) => {
            switch (key){
            case "logo":
                return (
                    <List.Item key={shortid.generate()}>
                        <Image src={values[key]} size="small" />
                        <List.Content>
                            <List.Header>{humanize(key)}</List.Header>
                        </List.Content>
                    </List.Item>
                );
            default:
                return (
                    <List.Item key={shortid.generate()}>
                        <List.Header>{humanize(key)}</List.Header>
                        {values[key]}
                    </List.Item>
                );
            }
        })
    }

    render() {
        return (
            <Grid centered>
                <Grid.Column width={12}>
                    <Form>
                        <IconHeader iconName="coffee" header="Confirm your profile info" />
                        <List>
                            {this.renderProfileItems()}
                        </List>
                        <Button
                            type="submit"
                            onClick={this.goBack}
                            className="ui left floated"
                            icon
                            labelPosition="left"
                        >
                            Previous Step
                            <Icon name="left arrow" />
                        </Button>
                        <Button
                            type="submit"
                            onClick={this.saveAndContinue}
                            className="ui primary right floated"
                            icon
                            labelPosition="right"
                        >
                            Next Step
                            <Icon name="right arrow" />
                        </Button>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

const { func, object } = PropTypes;
Confirmation.propTypes = {
    submitProfile: func,
    previousStep: func,
    values: object
};

export default Confirmation;
