import React, { PureComponent, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Header, Table, Image } from "semantic-ui-react";

class App extends PureComponent {
    render() {
        const { profiles } = this.props;
        const headerRow = ["Name", "Location", "Website", "Id"];
        const renderBodyRow = ({ name, city, state, url, id, img_url }) => ({
            key: id,
            cells: [
                {
                    content: (
                        <F>
                            <Image
                                src={img_url || "https://via.placeholder.com/50?text=No+Image+Available"}
                                size="mini"
                                inline
                                circular={false}
                                style={{ marginRight: "10px" }}
                            />
                            <a href={"roasters/" + id}>{name}</a>
                        </F>
                    ),
                    key: "name"
                },
                `${city}, ${state}`,
                url,
                id
            ]
        });
        return (
            <div className="form roaster-wizard">
                <Header as="h2">Roasters</Header>
                <Table striped headerRow={headerRow} renderBodyRow={renderBodyRow} tableData={profiles} />
            </div>
        );
    }
}

const { array } = PropTypes;
App.propTypes = {
    profiles: array.isRequired
};

export default App;
