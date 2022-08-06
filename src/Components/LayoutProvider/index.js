
import React from 'react';

import HeaderComponent from '../Header';

export default function LayoutProviderComponent(props) {

    return (
        <React.Fragment>
            <HeaderComponent />
            {props.children}
        </React.Fragment>
    )
}
