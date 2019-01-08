import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Dimmer, Image, Container } from "semantic-ui-react";

import ImageUpload from "./ImageUpload";

class ImageChange extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleShow = () => this.setState({ active: true });
    handleHide = () => this.setState({ active: false });

    render() {
        const { active } = this.state;
        const { src, profile } = this.props;
        const inner = (
            <Dimmer
                active={active}
                verticalAlign="bottom"
                style={{ padding: 0, background: "rgba(0,0,0,0.6)", border: "1px solid rgba(0,0,0,0.4)" }}
            >
                <Container style={{ background: "#d9d9d9", padding: "20px 10px" }}>
                    {/* Once this is working, it should re-render.
                        Which propoably means that this.props.src should become state.
                        Also, there probably needs to be a Confirm action/button
                        so that and the old logo isnt destroyed is the new one gets scrambled
                        during the upload process */}
                    <ImageUpload profile={profile} />
                </Container>
            </Dimmer>
        );

        return (
            <Fragment>
                <Dimmer.Dimmable
                    as={Image}
                    dimmed={active}
                    onMouseEnter={this.handleShow}
                    onMouseLeave={this.handleHide}
                >
                    <Image src={src} />
                    {inner}
                </Dimmer.Dimmable>
            </Fragment>
        );
    }
}

const { string, object } = PropTypes;
ImageChange.propTypes = {
    src: string,
    profile: object
};

export default ImageChange;
