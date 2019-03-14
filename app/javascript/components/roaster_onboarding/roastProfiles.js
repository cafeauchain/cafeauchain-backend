import React from "react";
import { Segment, Button } from "semantic-ui-react";

class ImportLots extends React.Component {
    state = {};
    render() {
        return (
            <Segment>
                <h1>This is the roast profiles page</h1>
                <Button primary as="a" href="/manage/dashboard" content="Next Page" />
            </Segment>
        );
    }
}

export default ImportLots;
