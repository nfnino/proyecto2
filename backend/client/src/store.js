import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        createBlacklistFilter('auth', []),
        createBlacklistFilter('errors', ['recinto','ubicacion','categoria','nombre',
        'valor','dias_garantia','dias_frec_mant_preventivo','observacion', 'area', 'supervisor', 'activo']),
    ]
}

const pReducer = persistReducer(persistConfig, rootReducer)
//,
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export const store = createStore(
    pReducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
);

export const persistor = persistStore(store)