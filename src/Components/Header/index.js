import React from 'react';
import { useNavigate } from "react-router-dom";


import "./header.css";
import covid_icon from "../../Utils/assets/covid.png";


export default function Header() {
  const navigate = useNavigate();
  return (
    <div className='header-box'>
      <img className='covid-icon' src={covid_icon}
        onClick={() => navigate(`/`)} />
      <h4 className='header-text' onClick={() => navigate(`/`)} >Covid Tracker - India</h4>
      <div></div>
    </div>
  )
}
