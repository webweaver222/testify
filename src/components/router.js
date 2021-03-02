import React from "react";
import { Route, Switch } from "react-router-dom";

import TestCreator from "components/CreatorApp/TestCreator";
import TestProcess from "components/ExamApp/TestProcess";

const Routing = () => (
  <Switch>
    <Route path="/test/create" component={TestCreator} />
    <Route path="/test/:id" component={TestProcess} />
  </Switch>
);

export default Routing;
/**<div className="background" dangerouslySetInnerHTML={{ __html: bgc }} /> */
