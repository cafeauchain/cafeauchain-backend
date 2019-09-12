import React from "react";
import { Tab, Header } from "semantic-ui-react";

/* eslint-disable */
import OpenRoasts from "roaster_tools/openRoasts";
import QueuedRoasts from "roaster_tools/queuedRoasts";
import CompletedRoasts from "roaster_tools/completedRoasts";
import StartBatch from "roaster_tools/startBatch";

import Modal from "shared/modal";
/* eslint-enable */

const panes = [
    {
        menuItem: { key: 'queued-roasts', content: (<Header as="h3" content="Queued Roasts" />) },
        pane: {
            key: 'queued-roasts',
            content: (
                <QueuedRoasts />
            )
        }
    },
    {
        menuItem: { key: 'open-roasts', content: (<Header as="h3" content="Open Roasts" />) },
        pane: {
            key: 'open-roasts',
            content: (
                <OpenRoasts />
            )
        }
    },
    {
        menuItem: { key: 'completed-roasts', content: (<Header as="h3" content="Completed Roasts" />) },
        pane: {
            key: 'completed-roasts',
            content: (
                <CompletedRoasts />
            )
        }
    }
];

const RoastTabs = () => (
    <>
        <Tab panes={panes} renderActiveOnly={false} />
        <div style={{ marginTop: 10 }}>
            <Modal text="Start a Batch" title="Start a Batch" component={<StartBatch />} />
        </div>
        
    </>
);

export default RoastTabs;

