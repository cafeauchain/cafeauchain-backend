import React from "react";
import { Segment, Button } from "semantic-ui-react";

class ImportLots extends React.Component {
    state = {};
    render() {
        return (
            <Segment>
                <h1>This is the import lots page</h1>
                <Button primary as="a" href="roast-profiles" content="Next Page" />
            </Segment>
        );
    }
}

export default ImportLots;
