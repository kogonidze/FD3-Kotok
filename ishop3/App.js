"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import BunchOfProducts from './Components/BunchOfProducts.jsx';

let shopName = "StroyMarket";

import buildingMaterials from './TestData/BuildingMaterials.json';


ReactDOM.render(
  <BunchOfProducts 
    shop={shopName}
    products={buildingMaterials} 
  />, 
  document.getElementById('container')
);

