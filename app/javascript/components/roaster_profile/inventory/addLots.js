import React, { Component, Fragment as F } from "react";
import { Container, Segment, Form, Header, Icon } from "semantic-ui-react";

import Matcher from "./matcher";

import fileHandler from "../../utilities/fileReader";
import csvToJSON from "../../utilities/csvToJSON";

/******* TODOs
- Remove static keys array in favor of actual fields
- Error handling
-- Including a warning if the same field is chosed twice
-- Should we limit the dropdowns in the Matcher to unselected options?
- Does there need to be a confirmation? With possibly a sample to reassure that import is mapped correctly
**********/
const keys = [
    { name: "key_producer_name" },
    { name: "key_crop_name" },
    { name: "key_pounds_on_contract" },
    { name: "key_pounds_on_hand" },
    { name: "key_pounds_roasted_to_date" },
    { name: "key_harvest_year" },
    { name: "key_price_per_pound" },
    { name: "key_total_contract_value" }
];

class AddLots extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    uploadFile = async event => {
        if (!event.target || !event.target.files) {
            return;
        }
        const file = event.target.files[0];

        try {
            const fileContents = await fileHandler(file);
            const json = csvToJSON(fileContents);
            this.setState({ file: file.name, data: json });
        } catch (e) {
            // eslint-disable-next-line
            console.log(e);
        }
    };

    render() {
        const { file, data } = this.state;
        return (
            <Container>
                <Segment>
                    <h1>Add Multiple Lots</h1>
                    <Form>
                        <Form.Field>
                            <Header icon textAlign="center">
                                <Icon name="file excel outline" />
                                {file ? file : "No .xls, .xlsx, .csv added"}
                            </Header>
                            {!file && (
                                <F>
                                    <input
                                        type="file"
                                        onChange={this.uploadFile}
                                        className="input-file"
                                        id="csvLotFileInput"
                                        accept=".csv"
                                    />
                                    <label htmlFor="csvLotFileInput" className="ui huge green button">
                                        <i className="ui upload icon" />
                                        Upload file
                                    </label>
                                </F>
                            )}
                        </Form.Field>
                    </Form>
                    {file && <Matcher data={data} dbKeys={keys} />}
                </Segment>
            </Container>
        );
    }
}

export default AddLots;
