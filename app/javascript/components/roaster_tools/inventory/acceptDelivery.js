import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Segment, Header, Input, Form, Button } from 'semantic-ui-react';
import LotSelect from '../../shared/lots/lotSelect';

import API_URL from "../../utilities/apiUtils/url";
import requester from "../../utilities/apiUtils/requester";

class AcceptDelivery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lotDetails: {}
        }
    }

    parentState = obj => {
        this.setState(obj);
    };

    handleInputChange = (event, { value, name, checked }) => {
        let { lotDetails } = this.state;
        lotDetails = { ...lotDetails };
        if (name === "") return;
        const val = value || checked;
        lotDetails[name] = val;
        this.setState({ lotDetails });
    };

    handleSubmit = async ev => {
        ev.preventDefault();
        const { lotDetails } = this.state;
        const lotId = lotDetails.lot_id
        const { roasterId } = this.props;
        const url = `${API_URL}/roasters/${roasterId}/lots/${lotId}`;
        const method = "PUT", headers = {};
        lotDetails["accept_delivery"] = true
        let body = { lotDetails };
        let respJSON = await requester({ url, body, headers, method });
        if (respJSON instanceof Error) {
            // eslint-disable-next-line
            console.log("there was an error", respJSON.response);
        } else {
            window.location.href = await respJSON.redirect_url;
        }
    }

    render() {
        const { roasterId } = this.props
        return(
            <Segment>
                <Header as='h2' content="Accept delivery" />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <LotSelect roasterId={roasterId} parentState={this.parentState} />

                        <Form.Field>
                            <Input 
                                name="quantity" 
                                fluid 
                                placeholder='Amount delivered (in lbs)' 
                                onChange={this.handleInputChange} 
                            />
                        </Form.Field>
                        <Button size="small" primary>
                            Accept&nbsp;Delivery
                        </Button>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }
}

const { oneOfType, string, number } = PropTypes;
AcceptDelivery.propTypes = {
    roasterId: oneOfType([number, string])
};

export default AcceptDelivery