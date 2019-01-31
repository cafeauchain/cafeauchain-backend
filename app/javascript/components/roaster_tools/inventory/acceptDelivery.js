import React, {Component} from 'react';
import { Segment, Header, Input, Form } from 'semantic-ui-react';
import ProducerSelect from '../../shared/producers/producerSelect';
import CropSelect from '../../shared/crops/cropSelect';

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

    render() {
        const { roasterId } = this.props
        return(
            <Segment>
                <Header as='h2' content="Accept delivery" />
                <Form>
                    <Form.Group widths='equal'>
                        <CropSelect roasterId={roasterId} parentState={this.parentState} />
                        <Form.Field>
                            <Input fluid placeholder='Amount delivered (in lbs)' />
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }
}

export default AcceptDelivery