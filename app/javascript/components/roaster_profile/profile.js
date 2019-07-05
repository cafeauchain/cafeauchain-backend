import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Image, Header, Segment } from "semantic-ui-react";
import * as Showdown from "showdown";

/* eslint-disable */
import ManageCutoff from "wholesale/actions/manageCutoff";
import Modal from "shared/modal";

import { callMeDanger } from "utilities";

import withContext from "contexts/withContext";
/* eslint-enable */

const LongText = ({ children }) => {
    const converter = new Showdown.Converter();
    return callMeDanger(converter.makeHtml(children), "div");
};

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            profile: {
                attributes: {
                    name,
                    about,
                    facebook,
                    twitter,
                    url,
                    logo_image_url,
                    primary_address: { street_1, street_2, city, state, postal_code }
                }
            }
        } = this.props;
        // TODO This needs to look better.

        return (
            <Segment>
                <Header as="h2">Roaster Profile</Header>
                <Modal
                    text="Manage Order Cutoff"
                    title="Manage Order Cutoff Times"
                    icon="clipboard list"
                    component={<ManageCutoff />}
                />
                <Header as="h3">
                    <Image src={logo_image_url} size="huge" verticalAlign="middle" />
                    {name}
                </Header>
                <Header as="h4">About Us</Header>
                <LongText>{about}</LongText>

                <Header as="h4">Address</Header>
                <p>
                    {street_1}
                    <br />
                    {street_2 && (
                        <span>
                            {street_2}
                            <br />
                        </span>
                    )}
                    {`${city}, ${state} ${postal_code}`}
                </p>

                <Header as="h4">Website</Header>
                <p>{url}</p>
                {facebook && (
                    <F>
                        <Header as="h4">Facebook</Header>
                        <p>{facebook}</p>
                    </F>
                )}
                {twitter && (
                    <F>
                        <Header as="h4">Twitter</Header>
                        <p>{twitter}</p>
                    </F>
                )}
            </Segment>
        );
    }
}

const { object } = PropTypes;
Profile.propTypes = {
    profile: object.isRequired
};

export default withContext(Profile);
