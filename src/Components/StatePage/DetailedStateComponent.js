
import React, { Component } from "react";

import "./style.css";
import FiltersComponent from "../Utils/filterComponent";
import sortbyHelper from '../../Utils/sortbyHelper';
import TableComponent from "../Utils/tableComponent";


export default class StateClassComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stateData: [],
            stateTimeseriesData: [],
            districtStats: [],
            showListBy: "DATE",
            selectedDistrict: "Districts"
        }
    }

    componentDidMount() {
        this.setState({
            stateData: this.props.stateStats,
            districtStats: this.props.districts,
            stateTimeseriesData: this.props.stateTimeseriesData.reverse()
        });
    }

    onDateChange = (date) => {
        if (date && date != "") {
            // console.log(date);
            let list = this.props.stateTimeseriesData.filter(i => i.date == `${date}`);
            // console.log(list);
            this.setState({
                stateTimeseriesData: list,
                showListBy: "DATE",
                selectedDistrict: "Districts"
            });
        } else {
            let list = this.props.stateTimeseriesData;
            // console.log(list.reverse());
            this.setState({
                stateTimeseriesData: list,
                showListBy: "DATE",
                selectedDistrict: "Districts"
            });
        }
    }

    onSortbyChange = (val) => {
        let sortedData = sortbyHelper(val, this.props.districts);
        this.setState({
            districtStats: sortedData,
            showListBy: "LOCATION",
            selectedDistrict: "Districts"
        })
    }

    onDistrictChange = (district) => {
        if (district == "Districts") {
            this.setState({
                districtStats: this.props.districts,
                showListBy: "LOCATION",
                selectedDistrict: "Districts"
            })
        } else {
            let list = this.props.districts.filter(i => i.name == district);
            this.setState({
                districtStats: list,
                showListBy: "LOCATION",
                selectedDistrict: district
            })
        }
    }

    showNoMatchingData = () => {
        return (
            <div className="no-results" >
                <h2>Result not found</h2>
            </div>
        )
    }


    render() {
        const { stateData, showListBy } = this.state;
        return (
            <div>
                <FiltersComponent
                    title={stateData.statename}
                    filters={["date", "sortby", "district"]}
                    districts={this.props.districts.map(i => i.name)}
                    onDateChange={this.onDateChange}
                    onSortbyChange={this.onSortbyChange}
                    onDistrictChange={this.onDistrictChange}
                />

                <div className="table-body" >
                    {showListBy == "LOCATION" ?
                        <React.Fragment> {
                            (this.state.districtStats && this.state.districtStats.length > 0) ?
                                <TableComponent
                                    identifier="name"
                                    tableData={this.state.districtStats}
                                    headers={["District", "Confirmed", "Recoverd", "Deceased", "Delta", "Delta7"]}
                                />
                                : this.showNoMatchingData()}
                        </React.Fragment> :
                        <React.Fragment>
                            {(this.state.stateTimeseriesData && this.state.stateTimeseriesData.length > 0) ?
                                <TableComponent
                                    identifier="date"
                                    tableData={this.state.stateTimeseriesData}
                                    headers={["Date", "Confirmed", "Recoverd", "Deceased", "Delta", "Delta7"]}
                                />
                                : this.showNoMatchingData()}
                        </React.Fragment>}
                </div>
            </div>
        );
    }
}