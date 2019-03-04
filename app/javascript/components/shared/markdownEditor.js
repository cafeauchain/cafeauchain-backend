import React, { Component, Fragment as F } from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import ReactMde, { commands } from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import * as Showdown from "showdown";

const listCommands = [
    {
        commands: [commands.headerCommand, commands.boldCommand, commands.italicCommand, commands.strikeThroughCommand]
    },
    {
        commands: [commands.linkCommand]
    },
    {
        commands: [commands.unorderedListCommand, commands.orderedListCommand]
    }
];

class MarkdownEditor extends Component {
    static propTypes = () => {
        const { string, func } = PropTypes;
        return {
            placeholder: string,
            name: string,
            onChange: func
        };
    };

    converter = new Showdown.Converter({
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
        simpleLineBreaks: true
    });

    constructor(props) {
        super(props);
        this.state = {
            tab: "write"
        };
    }

    onTabChange = tab => {
        this.setState({ tab });
    };

    closePreview = e => {
        e.preventDefault();
        this.setState({ tab: "write" });
    };

    render() {
        const { placeholder, name, onChange, ...rest } = this.props;
        const { tab } = this.state;
        return (
            <F>
                {tab === "preview" && (
                    <Button onClick={this.closePreview} type="button" content="Close Preview" floated="right" />
                )}
                <ReactMde
                    {...rest}
                    commands={tab === "write" ? listCommands : []}
                    placeholder={placeholder}
                    name={name}
                    onChange={value => onChange(null, { value, name })}
                    selectedTab={tab}
                    onTabChange={this.onTabChange}
                    generateMarkdownPreview={markdown => Promise.resolve(this.converter.makeHtml(markdown))}
                />
            </F>
        );
    }
}

export default MarkdownEditor;
