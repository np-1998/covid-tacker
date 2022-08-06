
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';

import "./Utils/assets/styles.css";
import LayoutProvider from "./Components/LayoutProvider";
import HomePageComponent from "./Components/HomePage";
import StatePageComponent from "./Components/StatePage";
import { getCovidDataAction } from "./Redux/Actions/actionHandlers";


const App = (props) => {

  useEffect(() => {
    props.getCovidData();
  }, [])

  return (
    <BrowserRouter>
      <LayoutProvider >
        <Routes>
          <Route index element={<HomePageComponent />} />
          <Route path="/:state" element={<StatePageComponent />} />
          <Route path="*" element={<HomePageComponent />} />
        </Routes>
      </LayoutProvider>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCovidData: () => dispatch(getCovidDataAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);