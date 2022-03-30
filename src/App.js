import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import ConceptClassPage from "./pages/ConceptClassPage";
import ConceptPage from "./pages/ConceptPage";
import DependentFormsPage from "./pages/DependentFormsPage";
import DrugPage from "./pages/DrugPage";
import ModifyConcept from "./components/concept/ModifyConcept";
import ModifyConceptClass from "./components/conceptClass/ModifyConceptClass";
import ModifyDrug from "./components/drug/ModifyDrug";
import ModifyPersonAttributeType from "./components/personAttributeType/ModifyPersonAttributeType";
import ModifyPrivilege from "./components/privilege/ModifyPrivilege";
import ModifyRelationshipType from "./components/relationshipType/ModifyRelationshipType";
import ModifyVisitType from "./components/visitType/ModifyVisitType";
import PersonAttributeTypePage from "./pages/PersonAttributeTypePage";
import PrivilegePage from "./pages/PrivilegePage";
import RelationshipTypePage from "./pages/RelationshipTypePage";
import VisitTypePage from "./pages/VisitTypePage";
import UserPage from "./pages/UserPage";
import AddressHierarchyPage from "./pages/AddressHierarchyPage";
import NavigationBar from "./pages/NavigationBar";

function App() {
  return (
    <Fragment>
      <NavigationBar />
      <Switch>
        <Route path="/addressHierarchy">
          <AddressHierarchyPage />
        </Route>

        <Route path="/relationshipType/:id">
          <ModifyRelationshipType />
        </Route>
        <Route path="/relationshipType">
          <RelationshipTypePage />
        </Route>

        <Route path="/personAttributeType/:id">
          <ModifyPersonAttributeType />
        </Route>
        <Route path="/personAttributeType">
          <PersonAttributeTypePage />
        </Route>

        <Route path="/user">
          <UserPage />
        </Route>

        <Route path="/visitType/:id">
          <ModifyVisitType />
        </Route>
        <Route path="/visitType">
          <VisitTypePage />
        </Route>

        <Route path="/drug/:id">
          <ModifyDrug />
        </Route>
        <Route path="/drug">
          <DrugPage />
        </Route>

        <Route path="/dependentForms">
          <DependentFormsPage />
        </Route>

        <Route path="/concept/:id">
          <ModifyConcept />
        </Route>
        <Route path="/concept">
          <ConceptPage />
        </Route>

        <Route path="/conceptClass/:id">
          <ModifyConceptClass />
        </Route>
        <Route path="/conceptClass">
          <ConceptClassPage />
        </Route>

        <Route path="/privilege/:id">
          <ModifyPrivilege />
        </Route>
        <Route path="/privilege">
          <PrivilegePage />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
