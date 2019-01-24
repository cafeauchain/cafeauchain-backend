import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Header, Icon } from 'semantic-ui-react';

class UploadProducers extends Component {
    constructor(props){
        super(props)

        this.state= {
            files: []
        }
    }

    uploadFile = event => {
        let {uploadToServer } = this.props
        let { files } = this.state;
        files.splice(0, 1, event.target.files[0]);
        this.setState({ files });
        uploadToServer(files[0])
    };

    render = () => {
        return(
            <Form>
                <Form.Field>
                    <Header icon>
                        <Icon name="file excel outline" />
                        No .xls, .xlsx, .csv added
                    </Header>
                    <input
                        type="file"
                        onChange={event => this.uploadFile(event)}
                        className="input-file"
                        id="logoFileInput"
                    />
                    <label
                        htmlFor="logoFileInput"
                        className="ui huge green button"
                    >
                        <i className="ui upload icon" />
                        Upload file
                    </label>
                </Form.Field>
            </Form>
        )
    }
}

const { func } = PropTypes;
UploadProducers.propTypes = {
    uploadToServer: func
}

export default UploadProducers;