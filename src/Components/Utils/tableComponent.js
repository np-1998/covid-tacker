
import React from 'react';

import ShowStatsComponent from './showStatsComponent';
import { ConfirmedIcon, VaccinatedIcon } from './getSVGIcon';

export default function TableComponent(props) {
    // console.log(props.tableData)
    return (
        <React.Fragment>
            <table>
                <thead>
                    {props.headers.map(i => {
                        return <th key={i} >{i}</th>
                    })}
                </thead>
                <tbody>
                    {props.tableData.map((i, ind) => {
                        return (
                            <tr key={`${i.name}-${ind}`} >
                                <td>
                                    <div>
                                        <h5>{i[props.identifier]}</h5>
                                        {i.affectedPercentage && <span className='table-icons' >
                                            <ConfirmedIcon />
                                            <i>{i.affectedPercentage == "-" ? " -" : ` ${i.affectedPercentage} %`}</i>&nbsp;&nbsp;</span>}
                                        {i.vaccinatedPercentage && <span className='table-icons' >
                                            <VaccinatedIcon />
                                            <i>{i.vaccinatedPercentage == "-" ? " -" : ` ${i.vaccinatedPercentage} %`}</i> &nbsp;&nbsp;</span>}
                                    </div>
                                </td>
                                <td>{i.total && i.total.confirmed ? i.total.confirmed : "-"}</td>
                                <td>{i.total && i.total.recovered ? i.total.recovered : "-"}</td>
                                <td>{i.total && i.total.deceased ? i.total.deceased : "-"}</td>
                                <td>
                                    <ShowStatsComponent
                                        data={i.delta}
                                    />
                                </td>
                                <td>
                                    <ShowStatsComponent
                                        data={i.delta7}
                                    />
                                </td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </React.Fragment>
    )
}
