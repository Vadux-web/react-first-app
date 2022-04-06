import * as React from "react";
import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {
  HashRouter,
  Route,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPage from "./components/Login/Login";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import { LangProvider } from "./LangContext";
import store from "./redux/redux-store";
import { withSuspense } from "./hoc/withSuspense";

const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer")
);

class App extends React.Component {
  // catchAllUnhandledErrors = (promiseRejectionEvent) => {
  //   alert("Error");
  //   console.error(promiseRejectionEvent);
  // };

  componentDidMount() {
    // @ts-ignore
    this.props.initializeApp();
    // window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  // componentWillUnmount() {
  //   window.removeEventListener(
  //     "unhandledrejection",
  //     this.catchAllUnhandledErrors
  //   );
  // }

  render() {
    // @ts-ignore
    if (!this.props.initialized) {
      return <Preloader />;
    }
    // @ts-ignore
    return (
      <div className="app-wrapper">
        {/*// @ts-ignore*/}
        <HeaderContainer />
        <Navbar />

        <div className="app-wrapper-content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
            <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
            <Route
              path="/profile/:userId?"
              render={withSuspense(ProfileContainer)}
            />
            {/*// @ts-ignore*/}
            <Route
              path="/users"
              render={() => <UsersContainer pageTitle={"Samurai"} />}
            />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const SamuraiJSApp = () => {
  return (
    <HashRouter>
      <LangProvider>
        <Provider store={store}>
          {/*// @ts-ignore*/}
          <AppContainer />
        </Provider>
      </LangProvider>
    </HashRouter>
  );
};

export default SamuraiJSApp;
