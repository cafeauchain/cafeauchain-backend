import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Image, Container, Header, Divider } from "semantic-ui-react";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { profile } = this.props;
        const {
            name,
            about,
            address_1,
            address_2,
            city,
            facebook,
            // eslint-disable-next-line
            id,
            state,
            twitter,
            url,
            zip_code,
            img_url
        } = profile;

        // TODO This needs to look better.
        // Also, we should consider a WYSIWYG or Markdown editor on edit
        // so the about section can have multiple paragraphs

        return (
            <Container className="form roaster-wizard">
                <Header as="h2">Roaster Profile</Header>
                <Container>
                    <Header as="h3">
                        <Image src={img_url} size="small" verticalAlign="middle" />
                        {name}
                    </Header>
                </Container>

                <Divider style={{ clear: "both" }} />
                <Container>
                    <Header as="h4">About Us</Header>
                    <p>{about}</p>

                    <Header as="h4">Address</Header>
                    <p>
                        {address_1}
                        <br />
                        {address_2 && (
                            <span>
                                {address_2}
                                <br />
                            </span>
                        )}
                        {`${city}, ${state} ${zip_code}`}
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
                </Container>
            </Container>
        );
    }
}

const { object } = PropTypes;
Profile.propTypes = {
    profile: object.isRequired
};

export default Profile;
