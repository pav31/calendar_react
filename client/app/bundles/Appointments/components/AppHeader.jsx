import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

export const AppHeader = () =>
    <div>
        <Link to='/'>
            <h1>CalReact</h1>
        </Link>
    </div>