import React from "react";
import { composeWithDevTools } from "redux-devtools-extension";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./src/reducers/index";

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/navigationRef";
import AuthScreen from "./src/screens/authFlow/LoginScreen"
import FeedScreen from "./src/screens/MainFlow/FeedScreen";
import ContactsScreen from "./src/screens/chatFlow/ContactsScreen";
import ChatScreen from "./src/screens/chatFlow/ChatScreen";

const switchNavigator = createSwitchNavigator(
  {
    // ResolveAuth: ResolveAuthScreen,
    contacts: ContactsScreen,
    login: AuthScreen,
    feed: FeedScreen,
    chat:ChatScreen
  },
  {
    initialRouteName: 'contacts'
  }
);

const App = createAppContainer(switchNavigator);
const composeEnhancers = composeWithDevTools({
  // Specify custom devTools options
});

export default () => {
  return (
    <Provider
      store={createStore(
        reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk))
        // Specify custom devTools options
      )}
    >
      <App
        ref={navigator => {
          setNavigator(navigator);
        }}
      />
    </Provider>
  );
};