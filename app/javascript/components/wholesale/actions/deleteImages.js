import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Dimmer, Icon, Confirm } from "semantic-ui-react";

/* eslint-disable */
import { requester, url as API_URL } from 'utilities/apiUtils';
/* eslint-enable */

// eslint-disable-next-line react/prop-types
const Deleter = ({ active }) => {
    return <Dimmer active={active}><Icon name="close" size="large" /></Dimmer>;
};

class DeleteImage extends Component {
    state = {
        active: false,
        open: false
    }
    onImageClick = () => {
        this.setState({ open: true });
    }
    onClose = () => {
        this.setState({ open: false });
    }
    onConfirm = async (e) => {
        const { target } = e;
        e.preventDefault();
        target.blur();
        const { id, getCtxData } = this.props;
        const url = API_URL + "/delete_image/" + id;
        const response = await requester({ url, method: "DELETE" });
        // console.log( response );
        // TODO FIgure out how to update the modal only after delete
        // Also, get file upload inside modal working correctly
        getCtxData('products');
    }
    onMouseEnter = () => {
        this.setState({ active: true });
    } 
    onMouseLeave = () => {
        this.setState({ active: false });
    }
    render(){
        const { url } = this.props;
        const { active, open } = this.state;
        return (
            <React.Fragment>
                <Image
                    src={url}
                    size="small"
                    // data-id={id}
                    rounded
                    inline
                    style={{ margin: 4 }}
                    onClick={this.onImageClick}
                    wrapped
                    className="delete-img-container"
                    dimmer={<Deleter active={active} />}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                />
                <Confirm 
                    open={open}
                    onCancel={this.onClose}
                    onConfirm={this.onConfirm}
                    content='Are you sure you want to delete this image? This cannot be undone.'
                />
            </React.Fragment>
            
        );
    }
}
const { string, number, oneOfType, func } = PropTypes;
DeleteImage.propTypes = {
    url: string,
    id: oneOfType([ string, number ]),
    getCtxData: func
};

export default DeleteImage;