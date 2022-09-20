import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { Project } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/project">
            <Project />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
