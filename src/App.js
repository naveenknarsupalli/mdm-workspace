import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ModifyConcept from "./components/concept/ModifyConcept";
import ModifyConceptClass from "./components/conceptClass/ModifyConceptClass";
import ModifyDrug from "./components/drug/ModifyDrug";
import ConceptClassPage from "./pages/ConceptClassPage";
import ConceptPage from "./pages/ConceptPage";
import DrugPage from "./pages/DrugPage";
import NavBar from "./pages/NavBar";
import ModifyRealationship from "./components/relationship/ModifyRelationship";
import RelationshipPage from "./pages/RelationshipPage";
import ModifyPrivilege from "./components/privilege/ModifyPrivilege";
import PrivilegePage from "./pages/PrivilegePage";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route path="/concept/:id" component={() => <ModifyConcept />} />
        <Route path="/concept" component={() => <ConceptPage />} />

        <Route
          path="/conceptClass/:id"
          component={() => <ModifyConceptClass />}
        />
        <Route path="/conceptClass" component={() => <ConceptClassPage />} />

        <Route path="/drug/:id" component={() => <ModifyDrug />} />
        <Route path="/drug" component={() => <DrugPage />} />

        <Route
          path="/relationship/:id"
          component={() => <ModifyRealationship />}
        />
        <Route path="/relationship" component={() => <RelationshipPage />} />

        <Route path="/privilege/:id" component={() => <ModifyPrivilege />} />
        <Route path="/privilege" component={() => <PrivilegePage />} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
