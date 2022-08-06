
import React from 'react';


export default function SelectBox(props) {

    const handleClick = (e) => e.stopPropagation();
    const handleChange = (e) => props.onChange(e.target.value);

    return (
        <React.Fragment>
            <select className='select-box' value={props.sortby && props.sortby}
                onChange={handleChange} onClick={handleClick} >
                <option value={props.default} >{props.default}</option>
                {props.options && props.options.map((key, index) => {
                    return <option key={index} value={key} >{key}</option>
                })}
            </select>
        </React.Fragment>
    )
}
