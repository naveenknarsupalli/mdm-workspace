import axios from "axios";

import {
  CONCEPT,
  CONCEPT_CLASS,
  DRUG,
  RELATIONSHIP,
} from "../constants/serviceConstants";

const SUFFIX = `.json`;

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

// drug apis
export const getDrugs = () => axios.get(`${DRUG}${SUFFIX}`).then((res) => res);

export const getDrugById = (id) =>
  axios.get(`${DRUG}/${id}${SUFFIX}`).then((res) => res);

export const postDrug = (body) =>
  axios.post(`${DRUG}${SUFFIX}`, body).then((res) => res);

export const putDrugById = (id, body) =>
  axios.put(`${DRUG}/${id}${SUFFIX}`, body).then((res) => res);

export const deleteDrugById = (id) =>
  axios.delete(`${DRUG}/${id}${SUFFIX}`).then((res) => res);

// relationship apis
export const getRelationships = () =>
  axios.get(`${RELATIONSHIP}${SUFFIX}`).then((res) => res);

export const getRelationshipById = (id) =>
  axios.get(`${RELATIONSHIP}/${id}${SUFFIX}`).then((res) => res);

export const postRelationship = (body) =>
  axios.post(`${RELATIONSHIP}${SUFFIX}`, body).then((res) => res);

export const putRelationshipById = (id, body) =>
  axios.put(`${RELATIONSHIP}/${id}${SUFFIX}`, body).then((res) => res);

export const deleteRelationshipById = (id) =>
  axios.delete(`${RELATIONSHIP}/${id}${SUFFIX}`).then((res) => res);
