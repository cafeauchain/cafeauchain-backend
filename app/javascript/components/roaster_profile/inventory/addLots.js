import React, { Component, Fragment as F } from "react";
import { Container, Segment, Form, Header, Icon, Button } from "semantic-ui-react";
import PropTypes from "prop-types";

import Matcher from "./matcher";

import Flex from "../../shared/flex";
import Input from "../../shared/input";

import fileHandler from "../../utilities/fileReader";
import csvToJSON from "../../utilities/csvToJSON";

/******* TODOs
- Remove static keys array in favor of actual fields
- Error handling
-- Including a warning if the same field is chosen twice
-- Should we limit the dropdowns in the Matcher to unselected options?
- Does there need to be a confirmation? With possibly a sample to reassure that import is mapped correctly
- How to we validate the Roaster crop name with our crop name/crop id?

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
        this.state = {
            file: "",
            data: {}
        };
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
    resetState = e => {
        e.preventDefault();
        this.setState({ file: "", data: {} });
    };

    render() {
        const { file, data } = this.state;
        const { id } = this.props;
        return (
            <Container>
                <Segment>
                    <Segment.Group>
                        <Segment>
                            <Header as="h2" content="Add Multiple Lots" />
                        </Segment>
                        <Segment>
                            {!file && (
                                <Segment placeholder style={{ maxWidth: 600, margin: "0 auto" }}>
                                    <Form>
                                        <Form.Field>
                                            <Header icon textAlign="center">
                                                <Icon name="file excel outline" />
                                                No .xls, .xlsx, .csv added
                                            </Header>

                                            <Input
                                                inputType="file"
                                                onChange={this.uploadFile}
                                                id="csvLotFileInput"
                                                label={(
                                                    <F>
                                                        <Icon name="upload" />
                                                        Upload file
                                                    </F>
                                                )}
                                            />
                                        </Form.Field>
                                    </Form>
                                </Segment>
                            )}
                            {file && (
                                <Flex spacebetween centercross wrap>
                                    <div flex="fill" style={{ marginRight: 20 }}>
                                        <Header as="h3" content={file} />
                                    </div>
                                    <Button
                                        flex="auto"
                                        style={{
                                            marginLeft: "auto"
                                        }}
                                        onClick={this.resetState}
                                        content="Start Over"
                                    />
                                </Flex>
                            )}
                        </Segment>

                        {file && (
                            <Segment>
                                <Matcher data={data} dbKeys={keys} id={id} />
                            </Segment>
                        )}
                    </Segment.Group>
                </Segment>
            </Container>
        );
    }
}

const { oneOfType, string, number } = PropTypes;
AddLots.propTypes = {
    id: oneOfType([string, number])
};

export default AddLots;
