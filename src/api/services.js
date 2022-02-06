import {
  CONCEPT,
  CONCEPT_CLASS,
  CONCEPT_DATA_TYPE,
  CONCEPT_NAME,
  DRUG,
  PERSON_ATTRIBUTE_TYPE,
  PRIVILEGE,
  RELATIONSHIP,
  VISIT_TYPE,
  USER
} from "../constants/serviceConstants";

import axios from "axios";

// const SUFFIX = `.json`;
const SUFFIX = ``;

export const getMockConcepts = () =>
  axios
    .get(`https://mdmworkspace.free.beeceptor.com/concepts`)
    .then((res) => res);

// user apis
export const getUsers = () => axios.get(`${USER}${SUFFIX}`).then((res) => res);

// list of all concept names
export const getConceptNames = () =>
  axios.get(`${CONCEPT_NAME}${SUFFIX}`).then((res) => res);

// concept apis
export const getConcepts = () =>
  axios.get(`${CONCEPT}${SUFFIX}`).then((res) => res);
export const getConceptById = (id) =>
  axios.get(`${CONCEPT}/${id}${SUFFIX}`).then((res) => res);
export const postConcept = (body) =>
  axios.post(`${CONCEPT}${SUFFIX}`, body).then((res) => res);
export const putConceptById = (id, body) =>
  axios.put(`${CONCEPT}/${id}${SUFFIX}`, body).then((res) => res);
export const deleteConceptById = (id) =>
  axios.delete(`${CONCEPT}/${id}${SUFFIX}`).then((res) => res);

// conceptClass apis
export const getConceptClasses = () =>
  axios.get(`${CONCEPT_CLASS}${SUFFIX}`).then((res) => res);
export const getConceptClassById = (id) =>
  axios.get(`${CONCEPT_CLASS}/${id}${SUFFIX}`).then((res) => res);
export const postConceptClass = (body) =>
  axios.post(`${CONCEPT_CLASS}${SUFFIX}`, body).then((res) => res);
export const putConceptClassById = (id, body) =>
  axios.put(`${CONCEPT_CLASS}/${id}${SUFFIX}`, body).then((res) => res);
export const deleteConceptClassById = (id) =>
  axios.delete(`${CONCEPT_CLASS}/${id}${SUFFIX}`).then((res) => res);

// conceptDataType apis
export const getConceptDataTypes = () =>
  axios.get(`${CONCEPT_DATA_TYPE}${SUFFIX}`).then((res) => res);

// drug apis
export const getDrugs = () =>
  axios
    .get(`${DRUG}${SUFFIX}`, { params: { compact: true } })
    .then((res) => res);
export const getDrugById = (id) =>
  axios.get(`${DRUG}/${id}${SUFFIX}`).then((res) => res);
export const postDrug = (body) =>
  axios.post(`${DRUG}${SUFFIX}`, body).then((res) => res);
export const putDrugById = (id, body) =>
  axios.put(`${DRUG}/${id}${SUFFIX}`, body).then((res) => res);
export const deleteDrugById = (id) =>
  axios.delete(`${DRUG}/${id}${SUFFIX}`).then((res) => res);

// personAttributeType apis
export const getPersonAttributeTypes = () =>
  axios.get(`${PERSON_ATTRIBUTE_TYPE}${SUFFIX}`).then((res) => res);
export const getPersonAttributeTypeById = (id) =>
  axios.get(`${PERSON_ATTRIBUTE_TYPE}/${id}${SUFFIX}`).then((res) => res);
export const createPersonAttributeType = (body) =>
  axios.post(`${PERSON_ATTRIBUTE_TYPE}${SUFFIX}`, body).then((res) => res);
export const updatePersonAttributeTypeById = (id, body) =>
  axios.put(`${PERSON_ATTRIBUTE_TYPE}/${id}${SUFFIX}`, body).then((res) => res);
export const deletePersonAttributeTypeById = (id) =>
  axios.delete(`${PERSON_ATTRIBUTE_TYPE}/${id}${SUFFIX}`).then((res) => res);

// privilege apis
export const getPrivileges = () =>
  axios.get(`${PRIVILEGE}${SUFFIX}`).then((res) => res);
export const getPrivilegeById = (id) =>
  axios.get(`${PRIVILEGE}/${id}${SUFFIX}`).then((res) => res);
export const postPrivilege = (body) =>
  axios.post(`${PRIVILEGE}${SUFFIX}`, body).then((res) => res);
export const putPrivilegeById = (id, body) =>
  axios.put(`${PRIVILEGE}/${id}${SUFFIX}`, body).then((res) => res);
export const deletePrivilegeById = (id) =>
  axios.delete(`${PRIVILEGE}/${id}${SUFFIX}`).then((res) => res);

// relationshipType apis
export const getRelationshipTypes = () =>
  axios.get(`${RELATIONSHIP}`).then((res) => res);
export const getRelationshipTypeById = (id) =>
  axios.get(`${RELATIONSHIP}/${id}${SUFFIX}`).then((res) => res);
export const createRelationshipType = (body) =>
  axios.post(`${RELATIONSHIP}${SUFFIX}`, body).then((res) => res);
export const updateRelationshipTypeById = (id, body) =>
  axios.put(`${RELATIONSHIP}/${id}${SUFFIX}`, body).then((res) => res);
export const deleteRelationshipTypeById = (id) =>
  axios.delete(`${RELATIONSHIP}/${id}${SUFFIX}`).then((res) => res);

// visitType apis
export const getVisitTypes = () =>
  axios.get(`${VISIT_TYPE}${SUFFIX}`).then((res) => res);
export const getVisitTypeById = (id) =>
  axios.get(`${VISIT_TYPE}/${id}${SUFFIX}`).then((res) => res);
export const createVisitType = (body) =>
  axios.post(`${VISIT_TYPE}${SUFFIX}`, body).then((res) => res);
export const updateVisitTypeById = (id, body) =>
  axios.put(`${VISIT_TYPE}/${id}${SUFFIX}`, body).then((res) => res);
export const deleteVisitTypeById = (id) =>
  axios.delete(`${VISIT_TYPE}/${id}${SUFFIX}`).then((res) => res);
