import React, { Component, Fragment as F } from "react";
import { Header, Placeholder } from "semantic-ui-react";

class RecentTransactions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <F>
                <Header as="h2" content="Recent Transactions" />
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
            </F>
        );
    }
}

export default RecentTransactions;
