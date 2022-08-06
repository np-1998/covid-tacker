
import React, { Component } from 'react';

import ShowStatsComponent from '../Utils/showStatsComponent';
import SelectBox from '../Utils/selectBox';
import {
  RightArrowIcon,
  LeftArrowIcon,
  ConfirmedIcon,
  VaccinatedIcon
} from '../Utils/getSVGIcon';


export default class StateCardComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tile: 1,
      total: {},
      delta: {},
      delta7: {},
      selectedDistrict: "Districts"
    }
  }

  componentDidMount() {
    if (this.props.date) {
      let dateObj = this.props.state.timeseries[this.props.date];
      if (dateObj) {
        this.updateState(dateObj);
      } else {
        this.updateState();
      }
    } else {
      this.updateState(this.props.state);
    }
  }

  updateState = (data = {}, selectedDistrict = "Districts", tile = 1) => {
    let total = data.total ? data.total : {};
    let delta = data.delta ? data.delta : {};
    let delta7 = data.delta7 ? data.delta7 : {};
    this.setState({
      tile, total, delta, delta7, selectedDistrict
    });
  }


  componentDidUpdate(prevProps) {
    if (prevProps.date != this.props.date) {
      if (this.props.date && this.props.date.length > 0) {
        let dateObj = this.props.state.timeseries[this.props.date];
        if (dateObj) {
          this.updateState(dateObj);
        } else {
          this.updateState();
        }
      } else {
        this.updateState(this.props.state);
      }
    }
  }


  updateDistrictData = (district) => {
    if (district == "Districts") {
      this.updateState(this.props.state);
    } else {
      let obj = this.props.state.districts[district];
      this.updateState(obj, district);
    }
  }

  gotoPrevTile = (e) => {
    e.stopPropagation();
    this.setState({
      tile: this.state.tile - 1
    })
  }

  gotoNextTile = (e) => {
    e.stopPropagation();
    this.setState({
      tile: this.state.tile + 1
    })
  }

  tileContent = (title, data) => {
    return (
      <div>
        <p style={{ textAlign: "center" }} >{title}</p>
        <ShowStatsComponent data={data} />
      </div>
    )
  }

  getTile = () => {
    switch (this.state.tile) {
      case 1:
        return this.tileContent("Total", this.state.total)
      case 2:
        return this.tileContent("Delta", this.state.delta)
      case 3:
        return this.tileContent("Delta7", this.state.delta7)
      default:
        return this.tileContent("Total", this.state.total)
    }
  }

  render() {

    const { navigate, state } = this.props;

    return (
      <div className='state-card'
        onClick={() => navigate(`/${state.statecode}`, { state: state })} >

        <div className='card-title-block' >
          <div>
            <p>{state.statename} ({state.statecode}) </p>
            <span className='percentage-icon'>
              <ConfirmedIcon /> <i>{state.affectedPercentage} </i>%&nbsp;&nbsp;</span>
            <span className='percentage-icon'>
              <VaccinatedIcon /> <i>{state.vaccinatedPercentage} </i>% &nbsp;&nbsp;</span>
          </div>

          <div className='card-select-box' >
            <SelectBox
              onChange={this.updateDistrictData}
              options={state.districts && Object.keys(state.districts)}
              default="Districts" />
          </div>
        </div>

        <div className='tile-title' >
          {this.getTile()}
        </div>

        {this.state.tile > 1 &&
          <div onClick={this.gotoPrevTile} className='arrow-left' >
            <LeftArrowIcon />
          </div>
        }
        {this.state.tile < 3 &&
          <div onClick={this.gotoNextTile} className='arrow-right'>
            <RightArrowIcon />
          </div>
        }
      </div>
    )
  }
}

