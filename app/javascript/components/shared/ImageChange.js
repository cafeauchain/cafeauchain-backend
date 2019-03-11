import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimmer, Image, Loader } from "semantic-ui-react";

import ImageUpload from "./ImageUpload";

class ImageChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: props.src,
            loading: false
        };
    }

    handleShow = () => this.setState({ active: true });
    handleHide = () => this.setState({ active: false });
    handleImage = ({ src, loading }) => this.setState({ src, loading });
    handleLoader = ({ loading }, cb) => this.setState({ loading }, cb);

    render() {
        const { active, src, loading } = this.state;
        const { id } = this.props;
        const inner = (
            <Dimmer
                active={active}
                verticalAlign="bottom"
                style={{ padding: 0, background: "rgba(0,0,0,0.6)", border: "1px solid rgba(0,0,0,0.4)" }}
            >
                <div style={{ background: "#d9d9d9", padding: "20px 10px" }}>
                    {/* There probably needs to be a Confirm action/button
                        so that the old logo isnt destroyed if the new one gets scrambled
                        during the upload process */}
                    <ImageUpload id={id} handleImage={this.handleImage} handleLoader={this.handleLoader} />
                </div>
            </Dimmer>
        );

        return (
            <Dimmer.Dimmable as={Image} dimmed={active} onMouseEnter={this.handleShow} onMouseLeave={this.handleHide}>
                <Dimmer active={loading} inverted>
                    <Loader size="large">Saving</Loader>
                </Dimmer>
                <Image src={src} />
                {inner}
            </Dimmer.Dimmable>
        );
    }
}

const { string, number, oneOfType } = PropTypes;
ImageChange.propTypes = {
    src: string,
    id: oneOfType([string, number])
};

export default ImageChange;
