import Task from "data.task"
import { onlineUrl, makeQuery } from "./index.js"

export const postQl = (query) =>
  new Task((rej, res) =>
    m
      .request({
        method: "POST",
        url: `${onlineUrl}`,
        withCredentials: false,
        body: makeQuery(query),
      })
      .then(res, rej)
  )

const postTask = (url) => (dto) =>
  new Task((rej, res) =>
    m
      .request({
        method: "POST",
        url: `${url}`,
        body: dto,
        withCredentials: false,
      })
      .then(res, rej)
  )

const putTask = (url) => ({ dto }) =>
  new Task((rej, res) =>
    m
      .request({
        method: "PUT",
        url: `${onlineUrl}/${url}`,
        body: dto,
        withCredentials: false,
      })
      .then(res, rej)
  )

const getTask = (url) =>
  new Task((rej, res) =>
    m
      .request({
        method: "GET",
        url: `${onlineUrl}/${url}`,
        withCredentials: false,
      })
      .then(res, rej)
  )

const deleteTask = (url) => (id) =>
  new Task((rej, res) =>
    m
      .request({
        method: "DELETE",
        url: `${onlineUrl}/${url}/${id}`,
        withCredentials: false,
      })
      .then(res, rej)
  )

export default { postTask, putTask, getTask, deleteTask, postQl }
