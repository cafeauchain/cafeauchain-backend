import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Form, Button, Header } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";
import Flex from "shared/flex";

import { noEmpties } from "utilities";

import { requester, fetcher, roasterUrl as ROASTER_URL } from "utilities/apiUtils";

import withContext from "contexts/withContext";

import fields from "defs/forms/createInventory";
/* eslint-enable */

const defaultDetails = {
    quantity: 0,
    lot_id: null,
    name: "",
    par_level: null
};
class CreateRoastProfiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: defaultDetails,
            btnLoading: false,
            errors: []
        };
    }

    componentDidMount() {
        const { lots, getData } = this.props;
        if (lots === undefined) getData("lots");
    }

    handleInputChange = (event, { value, name, checked }) => {
        let { details } = this.state;
        details = { ...details };
        if (name === "") return;
        const val = value || checked;
        details[name] = val;
        this.setState({ details, errors: [] });
    };

    handleSubmit = async ev => {
        ev.preventDefault();
        await this.setState({ btnLoading: true });
        const { details } = this.state;
        const { userId, getData, closeModal } = this.props;
        const url = `${ROASTER_URL(userId)}/inventory_items`;
        let body = { ...details };
        let response = await requester({ url, body });
        if (response instanceof Error) {
            this.setState({ errors: response.response.data, btnLoading: false });
        } else {
            if (response.redirect) {
                window.location.href = await response.redirect_url;
            } else {
                await getData("inventory");
                if (closeModal) {
                    closeModal();
                } else {
                    this.setState({
                        btnLoading: false,
                        details: defaultDetails
                    });
                }
            }
        }
    };

    buildLotOptions = lots =>
        lots.map(({ id, attributes: { name } }) => ({ value: id, text: name, key: id, id, name }));

    render() {
        let { lots } = this.props;
        if (lots === undefined) lots = [];
        const lotOptions = this.buildLotOptions(lots);
        const { details, btnLoading, errors } = this.state;
        const isLotSelected = details.lot_id;
        const btnActive = noEmpties(details);
        return (
            <F>
                <Header as="h2" content="Add Roast Profile" />
                <Form onSubmit={this.startSubmit}>
                    <ErrorHandler errors={errors} />
                    <Input
                        inputType="select"
                        options={lotOptions}
                        onChange={this.handleInputChange}
                        name="lot_id"
                        label="Choose Lot"
                    />
                    {isLotSelected && (
                        <F>
                            <Flex spacing="20" wrap>
                                {fields.map(({width, ...field}) => {
                                    return (
                                        <div flex={width || "50"} key={field.name} style={{marginBottom: 10}}>
                                            <Input
                                                {...field}
                                                onChange={this.handleInputChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                    );
                                })}
                            </Flex>
                            

                            <Button
                                size="small"
                                primary
                                fluid
                                loading={btnLoading}
                                disabled={!btnActive}
                                onClick={this.handleSubmit}
                                content="Create Roast Profile"
                            />
                        </F>
                    )}
                </Form>
            </F>
        );
    }
}

const { oneOfType, string, number, func, array } = PropTypes;
CreateRoastProfiles.propTypes = {
    userId: oneOfType([number, string]),
    closeModal: func,
    lots: array,
    getData: func
};

export default withContext(CreateRoastProfiles);
