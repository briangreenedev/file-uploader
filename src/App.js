import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import UploaderView from "./views/uploader-view";
import LoginView from "./views/login-view";


function App() {
	return (
		<Router>
			<Switch>
        <Route path="/">
          <UploaderView />
        </Route>
        <Route path="/login">
          <LoginView />
        </Route>
      </Switch>
		</Router>
	);
}

export default App;
