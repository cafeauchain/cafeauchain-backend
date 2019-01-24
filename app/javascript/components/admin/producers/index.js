
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Divider, Grid, Header, Icon, Menu, Segment, Table } from "semantic-ui-react";
import Pagination from 'semantic-ui-react-button-pagination';
import CreateProducer from "./createProducer";
import UploadProducers from "./uploadProducers";

import readCookie from "../../utilities/readCookie";

class Producers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            producers: [],
            pagination: {
                totalobjects: 0,
                perpage: 15
            },
            links: {},
            offset: 15,
            error: {}
        };
    }

    componentDidMount = async () => {
        await this.getProducers()
    }

    getProducers = async () => {
        const { offset, perpage } = this.state
        const pageNumber = await (offset/15)
        // eslint-disable-next-line
        console.log(pageNumber)
        let response = await fetch(`/api/v1/admin/producers?page_number=${pageNumber}&page_size=15`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.ok) {
            let responseJson = await response.json()
            // eslint-disable-next-line
            const producers = responseJson.data
            const links = responseJson.links
            const pagination = responseJson.meta.pagination
            this.setState({producers, links, pagination})
        }

    }

    handleClick = async offset => {
        this.setState({offset});
        this.getProducers()
    }

    uploadToServer = async file => {
        let formdata = new FormData()
        formdata.append("file", file)
        const token = decodeURIComponent(readCookie("X-CSRF-Token"));
        let response = await fetch('/api/v1/admin/producers/upload_csv', {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
            },
            body: formdata
        })
        if (response.ok) {
            let responseJson = await response.json()
            // eslint-disable-next-line
            console.log(responseJson)
        } else {
            let responseJson = await response.json()
            // eslint-disable-next-line
            console.log(responseJson)
        }
    }

    render() {
        const { fieldType, url } = this.props;
        const { producers, links, pagination, offset } = this.state;
        return (
            <Grid
                textAlign="center"
                style={{ height: "100%", margin: "auto 0", padding: "4em 0", width: "100%" }}
                verticalAlign="middle"
                columns={1}
            >
                <Grid.Column>
                    <Segment.Group>
                        <Segment>
                            <Header
                                as="h2"
                                textAlign="center"
                                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                                Producers
                            </Header>
                        </Segment>
                        <Segment placeholder>
                            <Grid columns={2} stackable textAlign='center'>
                                <Divider vertical>Or</Divider>

                                <Grid.Row verticalAlign='middle'>
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
                            <Table celled striped>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='3'>Producers</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {producers.map(producer => {
                                        return(
                                            <Table.Row key={producer.id}>
                                                <Table.Cell collapsing>
                                                    {producer.attributes.name}
                                                </Table.Cell>
                                                <Table.Cell>{producer.attributes.location}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>

                                <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='3'>
                                            {/* <Menu floated='right' pagination>
                                                <Menu.Item as='a' href={links.first} icon>
                                                    <Icon name='chevron left' />
                                                    &nbsp;&nbsp;First
                                                </Menu.Item>
                                                <Menu.Item as='a'>1</Menu.Item>
                                                <Menu.Item as='a'>2</Menu.Item>
                                                <Menu.Item as='a'>3</Menu.Item>
                                                <Menu.Item as='a'>4</Menu.Item>
                                                <Menu.Item as='a' href={links.last} icon>
                                                    Last&nbsp;&nbsp;
                                                    <Icon name='chevron right' />
                                                </Menu.Item>
                                            </Menu> */}
                                            <Pagination
                                                offset={offset}
                                                limit={pagination.perpage}
                                                total={pagination.totalobjects}
                                                onClick={(e, props, offset) => this.handleClick(offset)}
                                                floated="right"
                                            />
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            </Table>
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
            </Grid>
        );
    }
}
const { string } = PropTypes;
Producers.propTypes = {
    url: string,
    fieldType: string
};

export default Producers;
