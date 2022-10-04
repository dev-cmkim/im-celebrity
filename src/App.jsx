import {HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Project } from "./pages";

const App = () => {
  console.log("url :", process.env.PUBLIC_URL)
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Project />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  )
}

export default App
