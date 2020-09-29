import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import assetReducer from "./assetReducer";
import taskReducer from "./taskReducer";
import routineReducer from "./routineReducer";
import venueReducer from "./venueReducer";
import bathReducer from "./routines/bathReducer";
import fachadaReducer from "./routines/fachadaReducer";
import localReducer from "./routines/localReducer";
import pantallaReducer from "./routines/pantallaReducer";
import parkingReducer from "./routines/parkingReducer";
import rciReducer from "./routines/rciReducer";
import silleteriaReducer from "./routines/silleteriaReducer";
import vipReducer from "./routines/vipReducer";
import assetAuditReducer from "./audits/assetAuditReducer";
import taskAuditReducer from "./audits/taskAuditReducer";
import userAuditReducer from "./audits/userAuditReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  users: userReducer,
  assets: assetReducer,
  tasks: taskReducer,
  routines: routineReducer,
  venues: venueReducer,
  baths: bathReducer,
  fachadas: fachadaReducer,
  locals: localReducer,
  pantallas: pantallaReducer,
  parkings: parkingReducer,
  rcis: rciReducer,
  silleterias: silleteriaReducer,
  vips: vipReducer,
  assetaudits: assetAuditReducer,
  taskaudits: taskAuditReducer,
  useraudits: userAuditReducer,
});