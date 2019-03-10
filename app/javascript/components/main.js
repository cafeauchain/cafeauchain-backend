import React from "react";
import PropTypes from "prop-types";

/* eslint-disable */
import Nav from "navigation/index";
import AdminNav from "navigation/adminNav";
import Context from "contexts/main";
import Provider from "contexts/index";
import NavPortal from "navPortal";
import DynamicLoader from "loader";
/* eslint-enable */

const Main = ({ component, ...rest }) => (
    <Provider roaster={rest.roaster} requests={[]}>
        <DynamicLoader resolve={() => import("./" + component)} {...rest} />
        <Context>
            {ctx => (
                <NavPortal>
                    {false && <Nav user={rest.user} loggedIn {...ctx} />}
                    {true && <AdminNav roaster={rest.roaster} />}
                </NavPortal>
            )}
        </Context>
    </Provider>
);

Main.propTypes = {
    component: PropTypes.string
};

export default Main;
