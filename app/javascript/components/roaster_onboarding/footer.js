import React from "react";
import PropTypes from "prop-types";
import { Divider, Button } from "semantic-ui-react";

/* eslint-disable */
import Flex from "shared/flex";
import { requester, roasterUrl } from "utilities/apiUtils";
/* eslint-enable */

class OnboardFooter extends React.Component {
    handleStatusUpdate = async (e, item) => {
        const { userId } = this.props;
        const url = roasterUrl(userId) + "/update_onboard_status";
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
    render() {
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
                            primary
                            data-status={right.href}
                            content={right.text}
                            icon="right arrow"
                            labelPosition="right"
                            onClick={this.handleStatusUpdate}
                            disabled={right.disabled}
                        />
                    </div>
                </Flex>
            </React.Fragment>
        );
    }
}

const { oneOfType, string, number, object } = PropTypes;
OnboardFooter.propTypes = {
    userId: oneOfType([string, number]),
    left: object,
    right: object
};

export default OnboardFooter;
