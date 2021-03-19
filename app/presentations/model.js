import { getQlTask } from "utils"
import { path } from "ramda"

const toViewModel = ({ data, errors }) => {
  console.log("errors", errors)
  return { data, errors }
}

export const getPresentations = () =>
  getQlTask(`query {
  presentations{ id, title}
}`).map(path(["data", "presentations"]))

export const savePresentationTask = (state) => {
  const q = `mutation {
    createPresentation(data: {title: ${JSON.stringify(state.title)}})
    { title id}
  }`
  return getQlTask(q).map(path(["data", "createPresentation"]))
}

export const deletePresentationsTask = (id) => {
  const q = `mutation {
    deletePresentation(where: {id: ${JSON.stringify(id)}})
    { title id}
  }`
  return getQlTask(q).map(path(["data", "deletePresentation"]))
}
