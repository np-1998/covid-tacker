import React, { } from 'react';

import SelectBox from "./selectBox";
import { sortbyFilters } from '../../Utils/constants';

export default function FiltersComponent(props) {

    const handleSearchChange = (e) => props.onSearchChange(e.target.value);
    const handleDateChange = (e) => props.onDateChange(e.target.value);
    const handleSortbyChange = (val) => props.onSortbyChange(val);
    const handleDistrictChange = (val) => props.onDistrictChange(val);

    const getFilter = (filter) => {
        switch (filter) {
            case "search":
                return <input type="text" className='select-box' placeholder="Search state" onChange={handleSearchChange} />
            case "date":
                return (
                    props.date ?
                        <input className='select-box' type="date"
                            value={props.date} onChange={handleDateChange} /> :
                        <input className='select-box' type="date" onChange={handleDateChange} />
                )
            case "sortby":
                return <SelectBox sortby={props.sortby} onChange={handleSortbyChange} options={sortbyFilters} default="Sort by" />
            case "district":
                return <SelectBox onChange={handleDistrictChange} options={props.districts} default="Districts" />
            default:
                return
        }
    }

    return (
        <div className='filter-component' >
            <div className='filter-box' >
                <p>{props.title}</p>
                {props.filters.map(filter => {
                    return (
                        <div key={filter} className='filter-block' >
                            {getFilter(filter)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
