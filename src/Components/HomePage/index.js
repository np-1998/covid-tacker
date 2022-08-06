
import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';

import "./homepage.css"
import FiltersComponent from '../Utils/filterComponent';
import StateCardComponent from './stateCardComponent';
import sortbyHelper from '../../Utils/sortbyHelper';

let searchTimeout = null;

const HomePageComponent = (props) => {

  const navigate = useNavigate();
  const [covidData, setCovidData] = useState([]);
  const [date, setDate] = useState(null);
  const [sortby, setSortby] = useState(null);

  useEffect(() => {
    setCovidData(props.covidData);
    checkPersistedFilters();
  }, [props.covidData]);


  const checkPersistedFilters = () => {
    let storedDate = localStorage.getItem("date");
    let storedSortby = localStorage.getItem("sortby");
    if (storedDate) setDate(storedDate);
    if (storedSortby) setSortby(storedSortby);
  }

  const debounceSearch = (text) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      let searchedArr = props.covidData.filter(i => i.statename.toLowerCase().includes(text.toLowerCase()));
      setCovidData(searchedArr);
    }, 300);
  }

  const onStateSearchChange = (text) => {
    debounceSearch(text.trim());
  }

  const onDateChange = (newdate) => {
    setDate(newdate);
    localStorage.setItem("date", newdate);
  }

  const onSortbyChange = (val) => {
    setSortby(val);
    localStorage.setItem("sortby", val);
  }

  return (
    <Suspense fallback={<h1>Loading...</h1>} >
      <FiltersComponent
        date={date}
        sortby={sortby}
        title="States"
        filters={["search", "date", "sortby"]}
        onSearchChange={onStateSearchChange}
        onDateChange={onDateChange}
        onSortbyChange={onSortbyChange}
      />
      <div className='grid'>
        {sortbyHelper(sortby, covidData).map((item, index) => {
          return (
            <div key={`${item.statecode}-${index}`} className='grid-item' >
              <StateCardComponent state={item} date={date} navigate={navigate} />
            </div>)
        })}
      </div>
    </Suspense>
  )
}


const mapStateToProps = state => {
  return {
    covidData: state.data.covidDataArray
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePageComponent);