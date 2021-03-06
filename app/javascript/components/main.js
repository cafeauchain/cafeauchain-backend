import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

/* eslint-disable */
import HeaderNav from "navigation/header";
import AdminNav from "navigation/adminNav";
import Context from "contexts/main";
import Provider from "contexts/index";
import NavPortal from "navPortal";
import DynamicLoader from "loader";
/* eslint-enable */

const Main = ({ component, ...rest }) => {
    const resolveComponent = () => {
        return import("./" + component);
    };
    return (
        <React.Fragment>
            {!rest.roaster && (
                <React.Fragment>
                    <DynamicLoader resolve={resolveComponent} {...rest} />
                    <NavPortal mountNode="header-nav">
                        <HeaderNav {...rest} />
                    </NavPortal>
                </React.Fragment>
            )}
            {rest.roaster && (
                <Provider roaster={rest.roaster} requests={[]} data={{ ...rest }}>
                    <DynamicLoader resolve={resolveComponent} {...rest} />
                    <Context>
                        {ctx => (
                            <React.Fragment>
                                {((!ctx.static && !ctx.cart) || (ctx.cart && ctx.isAssumedCustomer)) && (
                                    <NavPortal mountNode="main-nav">
                                        <Menu vertical inverted fluid borderless>
                                            <AdminNav />
                                        </Menu>
                                    </NavPortal>
                                )}
                                <NavPortal mountNode="header-nav">
                                    <HeaderNav {...ctx} />
                                </NavPortal>
                            </React.Fragment>
                        )}
                    </Context>
                </Provider>
            )}
        </React.Fragment>
    );
};

Main.propTypes = {
    component: PropTypes.string
};

export default Main;