import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Form, Button, Header } from "semantic-ui-react";

/* eslint-disable */
import Input from "shared/input";
import ErrorHandler from "shared/errorHandler";
import Flex from "shared/flex";

import { noEmpties, sortBy } from "utilities";

import { requester, fetcher, roasterUrl as ROASTER_URL } from "utilities/apiUtils";

import withContext from "contexts/withContext";

import fields from "defs/forms/createInventory";
/* eslint-enable */

const defaultDetails = profile => {
    return {
        quantity: profile ? profile.attributes.quantity : 0,
        lot_id: profile ? profile.attributes.lot_id : "",
        name: profile ? profile.attributes.name : "",
        par_level: profile ? profile.attributes.par_level : "",
        roast_size: profile ? profile.attributes.roast_size : "",
        shrinkage: profile ? profile.attributes.shrinkage : ""
    };

};
class CreateRoastProfiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: defaultDetails(props.profile),
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
        details[name] = val || "";
        this.setState({ details, errors: [] });
    };

    handleDelete = ev => this.handleSubmit({ ev, isDelete: true });
    handleUpdate = ev => this.handleSubmit({ ev, isUpdate: true });
    handleCreate = ev => this.handleSubmit({ ev });

    handleSubmit = async ({ev, isDelete, isUpdate}) => {
        ev.preventDefault();
        if( !isDelete ){
            await this.setState({ btnLoading: true });
        }
        
        const { details } = this.state;
        const { userId, getData, closeModal, profile } = this.props;
        let url = `${ROASTER_URL(userId)}/inventory_items`;
        if( isDelete || isUpdate ){
            url += `/${ profile.id }`;
        }
        let body = isDelete ? undefined : { ...details };
        let method = isDelete ? 'DELETE' : (isUpdate ? 'PUT' : 'POST');
        let response = await requester({ url, body, method });
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

    buildLotOptions = lots => {
        const sorted = sortBy({
            collection: lots,
            sorts: [{ name: "name" }],
            namespace: "attributes"
        });
        return sorted.map(({ id, attributes: { name } }) => ({ value: id, text: name, key: id, id, name }));
    }
        

    render() {
        let { lots, profile } = this.props;
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
                        value={details.lot_id}
                    />
                    {isLotSelected && (
                        <F>
                            <Flex spacing="20" wrap>
                                {fields.map(({width, ...field}) => {
                                    return (
                                        <div flex={width || "50"} key={field.name} style={{marginBottom: 10}}>
                                            <Input
                                                {...field}
                                                value={details[field.name]}
                                                onChange={this.handleInputChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                    );
                                })}
                            </Flex>
                            
                            <Flex spacing="20" spacebetween>
                                <div flex="auto">
                                    {profile && profile.attributes.can_delete && (
                                        <Button
                                            size="small"
                                            negative
                                            fluid
                                            disabled={!btnActive}
                                            onClick={this.handleDelete}
                                            content="Delete Roast Profile"
                                        />
                                    )}
                                    
                                </div>

                                <div flex="auto">
                                    <Button
                                        size="small"
                                        primary
                                        fluid
                                        loading={btnLoading}
                                        disabled={!btnActive}
                                        onClick={profile ? this.handleUpdate : this.handleCreate}
                                        content={profile ? "Update Roast Profile" : "Create Roast Profile"}
                                    />
                                </div>

                            </Flex>
                            
                        </F>
                    )}
                </Form>
            </F>
        );
    }
}

const { oneOfType, string, number, func, array, bool, object } = PropTypes;
CreateRoastProfiles.propTypes = {
    userId: oneOfType([number, string]),
    closeModal: func,
    lots: array,
    getData: func,
    onboarding: bool,
    profile: object
};

export default withContext(CreateRoastProfiles);
