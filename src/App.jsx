import {BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Project } from "./pages";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Switch>
          <Route exact path={process.env.PUBLIC_URL + "/"}>  
            <Project />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
