import React, { Fragment } from "react";
import spinner from './25.gif'

export default () => (
    <Fragment>
        <img
            src={spinner}
            style={{width: '45px', margin: 'auto', display: 'block'}}
            alt='Loading...'
            />
    </Fragment>
);