import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModifyConcept from './components/concept/ModifyConcept';
import ModifyConceptClass from './components/conceptClass/ModifyConceptClass';
import ModifyDrug from './components/drug/ModifyDrug';
import ConceptClassPage from './pages/ConceptClassPage';
import ConceptPage from './pages/ConceptPage';
import DrugPage from './pages/DrugPage';
import NavBar from './pages/NavBar';
import ModifyRealationship from './components/relationship/ModifyRelationship';
import RelationshipPage from './pages/RelationshipPage';
import ModifyPrivilege from './components/privilege/ModifyPrivilege';
import PrivilegePage from './pages/PrivilegePage';
import VisitTypePage from './pages/VisitTypePage';
import ModifyVisitType from './components/visitType/ModifyVisitType';
import ModifyPersonAttributeType from './components/personAttributeType/ModifyPersonAttributeType';
import PersonAttributeTypePage from './pages/PersonAttributeTypePage';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
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

        <Route path="/drug/:id">
          <ModifyDrug />
        </Route>
        <Route path="/drug">
          <DrugPage />
        </Route>

        <Route path="/relationship/:id">
          <ModifyRealationship />
        </Route>
        <Route path="/relationship">
          <RelationshipPage />
        </Route>

        <Route path="/privilege/:id">
          <ModifyPrivilege />
        </Route>
        <Route path="/privilege">
          <PrivilegePage />
        </Route>

        <Route path="/visitType/:id">
          <ModifyVisitType />
        </Route>
        <Route path="/visitType">
          <VisitTypePage />
        </Route>

        <Route path="/personAttributeType/:id">
          <ModifyPersonAttributeType />
        </Route>
        <Route path="/personAttributeType">
          <PersonAttributeTypePage />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
