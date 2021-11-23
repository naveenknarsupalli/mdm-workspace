import { Fragment } from "react";
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

function App() {
  return (
    <Fragment>
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
      </Switch>
    </Fragment>
  );
}

export default App;
