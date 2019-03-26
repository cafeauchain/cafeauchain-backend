import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Button } from "semantic-ui-react";

/* eslint-disable */
import Flex from "shared/flex";
import { requester, url as API_URL } from "utilities/apiUtils";
import withContext from "contexts/withContext";
/* eslint-enable */

class OnboardFooter extends React.Component {
    handleStatusUpdate = async (e, item) => {
        // TODO Decide if I need onboard_status for customers
        const { profile } = this.props;
        const url = API_URL + "/customers/" + profile.id + "/update_onboard_status";
        const status = item["data-status"];
        const response = await requester({ url, body: { status }, method: "PUT" });
        if (response instanceof Error) {
            // eslint-disable-next-line
            console.log(response);
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                // eslint-disable-next-line
                console.log(response);
            }
        }
    };
    render(){
        const { left, right } = this.props;
        return (
            <React.Fragment>
                <Divider />
                <Flex spacing="20" spacebetween>
                    <div>
                        {left.text && (
                            <Button
                                as="a"
                                href={left.href}
                                content={left.text}
                                icon="left arrow"
                                labelPosition="left"
                            />
                        )}
                    </div>
                    <div>
                        <Button
                            as={right.as ? right.as : undefined}
                            href={right.as ? right.href : undefined}
                            primary
                            data-status={right.href}
                            content={right.text}
                            icon="right arrow"
                            labelPosition="right"
                            onClick={right.as ? undefined : this.handleStatusUpdate}
                            disabled={right.disabled}
                        />
                    </div>
                </Flex>
            </React.Fragment>
        );
    }
}
const { object } = PropTypes;
OnboardFooter.propTypes = {
    left: object,
    right: object,
    profile: object,
    roaster: object
};

export default withContext(OnboardFooter);