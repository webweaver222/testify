import React from "react";
import { Route, Switch } from "react-router-dom";

import "./app.sass";
import TestCreator from "../test-creator";
import TestProcess from "../test-process";

import bgc from "../../resources/svg/background.html";

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route path="/test/create" component={TestCreator} />
        <Route path="/test/:id" component={TestProcess} />
      </Switch>
      <div className="background" dangerouslySetInnerHTML={{ __html: bgc }} />
    </div>
  );
};

export default App;
