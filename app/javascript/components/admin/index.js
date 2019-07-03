import React from "react";
import { Segment, Button } from "semantic-ui-react";
import PropTypes from 'prop-types';

/* eslint-disable */
import { url as API_URL, requester } from "utilities/apiUtils"
/* eslint-enable */

class AdminDashboard extends React.Component {
    state = {}
    handleRoasterChange = async (e, props) => {
        e.preventDefault();
        const { userId } = this.props;
        const url = `${API_URL}/admin/roasters/${ userId }`;
        const response = await requester({ url, body: {roaster_profile_id: props["data-id"]}, method: 'PUT' });
        this.afterSubmit(response);
    }
    afterSubmit = async response => {
        if (response instanceof Error) {
            console.log( response.response );
        } else {
            if (response.redirect) {
                window.location = await response.redirect_url;
            }
        }
    }
    render(){
        const { roasters } = this.props;
        return (
            <Segment>
                {roasters.map( roaster => {
                    return (
                        <div key={roaster.id}>
                            <Button onClick={this.handleRoasterChange} data-id={roaster.id} content={roaster.name} />
                        </div>
                    );
                })}
            </Segment>
        );
    }
}
const { oneOfType, array, number, string } = PropTypes;
AdminDashboard.propTypes = {
    roasters: array,
    userId: oneOfType([number, string])
};

export default AdminDashboard;