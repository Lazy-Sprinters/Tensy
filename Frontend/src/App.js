import React from 'react';
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Verify from './components/Verify';
import CenterVerify from './components/CenterVerify';
import CenterRegister from './components/CenterRegister';
import Login from './components/Login';
import CenterLogin from './components/CenterLogin';
import CenterRfp from './components/CenterRfp.js';
import LoginHome from './components/LoginHome';
import CenterLoginHome from './components/CenterLoginHome';
import CenterAgr from './components/CenterAgr';
import Rfp from './components/Rfp';
import selectionPage1 from './components/selectionPage1';
import selectionPage2 from './components/selectionPage2';
import Agr from './components/Agr';
import { BrowserRouter as Router, Switch, Route, HashRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <HashRouter basename='/'>
        <Switch>
         <Route path='/' exact component={Home} />
          <Route path='/register' exact component={Register} />
          <Route path='/centerRegister' exact component={CenterRegister} />
          <Route path='/verify' exact component={Verify} />
          <Route path='/centerVerify' exact component={CenterVerify} />
          <Route path='/login' exact component={Login} />
          <Route path='/centerLogin' exact component={CenterLogin} />
          <Route path='/centerRfp' exact component={CenterRfp} />
          <Route path='/centerLoginHome' exact component={CenterLoginHome} />
          <Route path='/centerAgr' exact component={CenterAgr} />
          <Route path='/loginHome' exact component={LoginHome} />
          <Route path='/Rfp' exact component={Rfp} />
          <Route path='/selectionPage1' exact component={selectionPage1} />
          <Route path='/selectionPage2' exact component={selectionPage2} />
          <Route path='/Agr' exact component={Agr} />
          </Switch>
      </HashRouter>
    </>
  );
}

export default App;