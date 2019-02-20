import React from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import { ConfigProvider as UserProvider } from "contexts/user";
import { ConfigProvider as TrxProvider } from "contexts/transactions";
import { ConfigProvider as LotsProvider } from "contexts/lots";
import { ConfigProvider as ProducerProvider } from "contexts/producers";
import { ConfigProvider as RoastedProvider } from "contexts/roasted";
import { ConfigProvider as LogProvider } from "contexts/lotsByPeriod";
import { ConfigProvider as BatchesProvider } from "contexts/batches";
import { ConfigProvider as ActivityProvider } from "contexts/activity";
/* eslint-enable */

const Context = ({ roaster, children, ...bools }) => {
    const requests = Object.keys(bools);
    return (
        <UserProvider value={{ roaster }}>
            <TrxProvider value={{ id: roaster.id, name: "transactions", requests }}>
                <LotsProvider value={{ id: roaster.id, name: "lots", requests }}>
                    <ProducerProvider value={{ id: roaster.id, name: "producers", requests }}>
                        <RoastedProvider value={{ id: roaster.id, name: "roasted", requests }}>
                            <LogProvider value={{ id: roaster.id, name: "log", requests }}>
                                <BatchesProvider value={{ id: roaster.id, name: "batches", requests }}>
                                    <ActivityProvider value={{ id: roaster.id, name: "activity", requests }}>
                                        {children}
                                    </ActivityProvider>
                                </BatchesProvider>
                            </LogProvider>
                        </RoastedProvider>
                    </ProducerProvider>
                </LotsProvider>
            </TrxProvider>
        </UserProvider>
    );
};
const { object, node } = PropTypes;
Context.propTypes = {
    roaster: object,
    children: node
};

export default Context;
