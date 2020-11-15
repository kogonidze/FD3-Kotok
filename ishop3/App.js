"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import BunchOfProducts from './Components/BunchOfProducts';

let shopName = "StroyMarket";

import buildingMaterials from './TestData/BuildingMaterials.json';

ReactDOM.render(
    React.createElement(BunchOfProducts,{shop: shopName, products: buildingMaterials}),
    document.getElementById('container')
  );

