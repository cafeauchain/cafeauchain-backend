import React, { Component } from "react";
import PropTypes from "prop-types";
import { Divider, Grid, Header, Segment, Container } from "semantic-ui-react";
import CreateProducer from "./createProducer";
import UploadProducers from "./uploadProducers";

import FormattedTable from "../../shared/table";

import API_URL from "../../utilities/apiUtils/url";
import readCookie from "../../utilities/readCookie";
import paramatize from "../../utilities/params";

class Producers extends Component {
    constructor(props) {
        super(props);
        const params = paramatize(window.location.search);
        this.state = {
            producers: [],
            pagination: {
                pagenumber: params.page_number || 1,
                totalobjects: 0,
                pagesize: params.page_size || 15,
                totalpages: 1
            }
        };
    }

    componentDidMount() {
        const { pagination } = this.state;
        const { pagenumber } = pagination;
        this.getProducers(pagenumber);
    }

    getProducers = async page => {
        const { pagination } = this.state;
        const { pagesize } = pagination;
        const url = `${API_URL}/admin/producers?page_number=${page}&page_size=${pagesize}`;
        let response = await fetch(url);
        let responseJson = await response.json();
        if (response.ok) {
            const producers = responseJson.data;
            this.setState({ producers, pagination: responseJson.meta.pagination });
        }
    };

    uploadToServer = async file => {
        let formdata = new FormData();
        formdata.append("file", file);
        const token = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch(`${API_URL}/admin/producers/upload_csv`, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token
            },
            body: formdata
        });
        let responseJson = await response.json();
        if (response.ok) {
            const producers = responseJson.data;
            this.setState({ producers, pagination: responseJson.meta.pagination });
        } else {
            // eslint-disable-next-line
            console.log("error", responseJson);
        }
    };

    updatePage = page => {
        let string = window.location.search;
        let newParamString = string;
        if (!string) {
            newParamString = "?page_number=" + page;
        } else if (string.indexOf("page_number") === -1) {
            newParamString += "&page_number=" + page;
        } else {
            let urlParams = string.slice(1).split("&");
            let newParams = urlParams.reduce((array, param) => {
                if (param.indexOf("page_number") > -1) {
                    param = "page_number=" + page;
                }
                return array.concat(param);
            }, []);
            newParamString = "?" + newParams.join("&");
        }
        window.history.pushState(null, null, newParamString);
        this.getProducers(page);
    };

    handleClick = (e, { activePage }) => {
        let { pagination } = this.state;
        pagination = { ...pagination };
        pagination.pagenumber = activePage;
        this.setState({ pagination }, this.updatePage(activePage));
    };

    goToProducer = (e, producer) => {
        e.preventDefault();
        alert(producer.attributes.name)
    }

    render() {
        const { fieldType, url } = this.props;
        const { producers, pagination } = this.state;
        return (
            <Container style={{ margin: "4em 0" }}>
                <Segment.Group>
                    <Segment>
                        <Header as="h2" textAlign="center">
                            Producers
                        </Header>
                    </Segment>
                    <Segment placeholder>
                        <Grid columns={2} stackable textAlign="center">
                            <Divider vertical>Or</Divider>

                            <Grid.Row verticalAlign="middle">
                                <Grid.Column>
                                    <CreateProducer fieldType={fieldType} url={url} />
                                </Grid.Column>

                                <Grid.Column>
                                    <UploadProducers uploadToServer={this.uploadToServer} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                    <Segment>
                        <FormattedTable 
                            producers={producers} 
                            pagination={pagination} 
                            onPageChange={this.handleClick} 
                            onClick={this.goToProducer} 
                        />
                    </Segment>
                </Segment.Group>
            </Container>
        );
    }
}
const { string } = PropTypes;
Producers.propTypes = {
    url: string,
    fieldType: string
};

export default Producers;
