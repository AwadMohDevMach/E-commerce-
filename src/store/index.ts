import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./auth/authSlice";
import categories from "./categories/categoreisSlice";
import products from "./products/productsSlice";
import cart from "./cart/cartSlice";
import wishlist from "./wishlist/wishlistSlice";
import orders from "./orders/orderSlice"

const rootPresistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"],
};

const cartPresistConfig = {
  key: "cart",
  storage,
  whitelist: ["item"],
};
const authPresistConfig = {
  key: "auth",
  storage,
  whitelist: ["users", "accessToken"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPresistConfig, auth),
  categories,
  products,
  orders,
  cart: persistReducer(cartPresistConfig, cart),
  wishlist: wishlist,
});

const presistedReduser = persistReducer(rootPresistConfig, rootReducer);

const store = configureStore({
  reducer: presistedReduser,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { store, persistor };
