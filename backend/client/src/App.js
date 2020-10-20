import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import movistar from "./Movistar1.jpg";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react';

import Landing from "./components/layout/Landing";
import Home from "./components/layout/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import newAsset from "./components/create/asset/AssetForm";
import updateAsset from "./components/edit/AssetEdit";
import updateTask from "./components/edit/TaskEdit";
import updateRoutine from "./components/edit/RoutineEdit";
import PrivateRoute from "./components/private-route/PrivateRoute";
import ContadorOnly from "./components/private-route/ContadorOnly";
import SuperusuarioOnly from "./components/private-route/SuperusuarioOnly";
import JefeAreaOnly from "./components/private-route/JefeAreaOnly";
import GerenteAreaOnly from "./components/private-route/GerenteAreaOnly";
import Dashboard from "./components/dashboard/Dashboard";
import UserDash from "./components/dashboard/DashUsers";
import VenueDash from "./components/dashboard/DashVenues";
import newVenue from "./components/create/VenueForm";
import AssetDash from "./components/dashboard/DashAssets";
import Profile from "./components/auth/Profile";
import TaskDash from "./components/dashboard/DashTasks";
import newTask from "./components/create/task/TaskForm";
import RoutineDash from "./components/dashboard/DashRoutines";
import newRoutine from "./components/create/RoutineForm";
import assetDetails from "./components/details/AssetDetails";
import taskDetails from "./components/details/TaskDetails";
import routinesDetails from "./components/details/RoutineDetails";
import AssetDelete from "./components/edit/AssetDelete";
import AssetReqDelete from "./components/edit/AssetReqDelete";
import { TaskFlow } from "./components/edit/TaskFlow/TaskFlow";
import baths from "./components/dashboard/routines/baths";
import newBath from "./components/create/routine/NewBath";
import UpdateBath from "./components/create/routine/UpdateBath";
import UpdateFachada from "./components/create/routine/UpdateFachada";
import NewDetBath from "./components/create/routine/NewDetBath";
import NewDetFachada from "./components/create/routine/NewDetFachada";
import DetalleBath from "./components/details/routines/DetalleBaths";
import fachadas from "./components/dashboard/routines/fachadas";
import newFachada from "./components/create/routine/NewFachada";
import detalleFachada from "./components/details/routines/DetalleFachada";
import locales from "./components/dashboard/routines/locales";
import newLocal from "./components/create/routine/NewLocal";
import UpdateLocal from "./components/create/routine/UpdateLocal";
import NewDetLocal from "./components/create/routine/NewDetLocal";
import DetalleLocal from "./components/details/routines/DetalleLocal";
import pantallas from "./components/dashboard/routines/pantallas";
import newPantalla from "./components/create/routine/NewPantalla";
import UpdatePantalla from "./components/create/routine/UpdatePantalla";
import NewDetPantalla from "./components/create/routine/NewDetPantalla";
import DetallePantalla from "./components/details/routines/DetallePantalla";
import parkings from "./components/dashboard/routines/parkings";
import newParking from "./components/create/routine/NewParking";
import detalleParking from "./components/details/routines/DetalleParking";
import rcis from "./components/dashboard/routines/rcis";
import newrci from "./components/create/routine/Newrci";
import Updaterci from "./components/create/routine/Updaterci";
import NewGabinete from "./components/create/routine/NewGabinete";
import Detallerci from "./components/details/routines/Detallerci";
import silleterias from "./components/dashboard/routines/silleterias";
import newSilleteria from "./components/create/routine/NewSilleteria";
import UpdateSilleteria from "./components/create/routine/UpdateSilleteria";
import NewPiso from "./components/create/routine/NewPiso";
import DetalleSilleteria from "./components/details/routines/DetalleSilleteria";
import vips from "./components/dashboard/routines/vips";
import newvip from "./components/create/routine/Newvip";
import Updatevip from "./components/create/routine/Updatevip";
import NewSuite from "./components/create/routine/NewSuite";
import Detallevip from "./components/details/routines/Detallevip";
import Auditorias from "./components/dashboard/audits/DashAudits";
import ReporteAssets from "./components/reportes/ReporteAsset";
import ReporteTasks from "./components/reportes/ReporteTask";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (  
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div style={{backgroundImage: `url(${movistar})`, backgroundRepeat:"repeat", backgroundPosition:"440px 60px", color: "#f7f7f7", minHeight: "100vh"}}>
              <Landing>
              <Switch>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <SuperusuarioOnly exact path="/users" component={UserDash} />
                    <SuperusuarioOnly exact path="/venues" component={VenueDash} />
                    <SuperusuarioOnly exact path="/newVenue" component={newVenue} />
                    <SuperusuarioOnly exact path="/register" component={Register} />
                    <PrivateRoute exact path="/assets" component={AssetDash} />
                    <ContadorOnly exact path="/newAsset" component={newAsset} />
                    <ContadorOnly exact path="/updateAsset/:id" component={updateAsset} />
                    <ContadorOnly exact path="/req-delete/:id" component={AssetReqDelete} />
                    <PrivateRoute exact path="/updateTask/:id" component={updateTask} />
                    <GerenteAreaOnly exact path="/delete/:id" component={AssetDelete} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute exact path="/tasks" component={TaskDash} />
                    <JefeAreaOnly exact path="/newTask" component={newTask} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/routines" component={RoutineDash} />
                    <JefeAreaOnly exact path="/newRoutine" component={newRoutine} />
                    <JefeAreaOnly exact path="/updateRoutine/:id" component={updateRoutine} />
                    <PrivateRoute exact path="/assets/:id" component={assetDetails} />
                    <PrivateRoute exact path="/tasks/:id" component={taskDetails} />
                    <PrivateRoute exact path="/routines/:id" component={routinesDetails} />
                    <PrivateRoute exact path="/baths" component={baths} />
                    <PrivateRoute exact path="/newBath" component={newBath} />
                    <PrivateRoute exact path="/updateBath/:id" component={UpdateBath} />
                    <PrivateRoute exact path="/updateFachada/:id" component={UpdateFachada} />
                    <PrivateRoute exact path="/newDetBath/:rutina/:id" component={NewDetBath} />
                    <PrivateRoute exact path="/detalleBath/:id" component={DetalleBath} />
                    <PrivateRoute exact path="/fachadas" component={fachadas} />
                    <PrivateRoute exact path="/newFachada" component={newFachada} />
                    <PrivateRoute exact path="/detalleFachada/:id" component={detalleFachada} />
                    <PrivateRoute exact path="/newDetFachada/:rutina/:id" component={NewDetFachada} />
                    <PrivateRoute exact path="/locales" component={locales} />
                    <PrivateRoute exact path="/newLocal" component={newLocal} />
                    <PrivateRoute exact path="/updateLocal/:id" component={UpdateLocal} />
                    <PrivateRoute exact path="/newDetLocal/:rutina/:id" component={NewDetLocal} />
                    <PrivateRoute exact path="/detalleLocal/:id" component={DetalleLocal} />
                    <PrivateRoute exact path="/pantallas" component={pantallas} />
                    <PrivateRoute exact path="/newPantalla" component={newPantalla} />
                    <PrivateRoute exact path="/updatePantalla/:id" component={UpdatePantalla} />
                    <PrivateRoute exact path="/newDetPantalla/:rutina/:id" component={NewDetPantalla} />
                    <PrivateRoute exact path="/detallePantalla/:id" component={DetallePantalla} />
                    <PrivateRoute exact path="/parkings" component={parkings} />
                    <PrivateRoute exact path="/newParking" component={newParking} />
                    <PrivateRoute exact path="/detalleParking/:id" component={detalleParking} />
                    <PrivateRoute exact path="/rcis" component={rcis} />
                    <PrivateRoute exact path="/newrci" component={newrci} />
                    <PrivateRoute exact path="/updaterci/:id" component={Updaterci} />
                    <PrivateRoute exact path="/newGabinete/:rutina/:id" component={NewGabinete} />
                    <PrivateRoute exact path="/detallerci/:id" component={Detallerci} />
                    <PrivateRoute exact path="/silleterias" component={silleterias} />
                    <PrivateRoute exact path="/newSilleteria" component={newSilleteria} />
                    <PrivateRoute exact path="/updateSilleteria/:id" component={UpdateSilleteria} />
                    <PrivateRoute exact path="/newPiso/:rutina/:id" component={NewPiso} />
                    <PrivateRoute exact path="/detalleSilleteria/:id" component={DetalleSilleteria} />
                    <PrivateRoute exact path="/vips" component={vips} />
                    <PrivateRoute exact path="/newvip" component={newvip} />
                    <PrivateRoute exact path="/updatevip/:id" component={Updatevip} />
                    <PrivateRoute exact path="/newSuite/:rutina/:id" component={NewSuite} />
                    <PrivateRoute exact path="/detallevip/:id" component={Detallevip} />
                    <SuperusuarioOnly exact path="/audits" component={Auditorias} />
                    <Route exact path="/task-flow/:id" component={TaskFlow} />
                    <PrivateRoute exact path="/report-Assets" component={ReporteAssets} />
                    <PrivateRoute exact path="/report-Tasks" component={ReporteTasks} />
              </Switch>
              </Landing>
            </div> 
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
