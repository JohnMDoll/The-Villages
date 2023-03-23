import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CapTest } from './CapTest.js';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import { ApplicationViews } from './views/ApplicationViews';

const container = document.getElementById("root")
document.body.id = window.location.pathname

const root = createRoot(container)
root.render(
  <BrowserRouter basename="/The-Villages">
    <CapTest />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
