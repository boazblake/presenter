import { path } from "ramda"
import { getQlTask } from "utils"

export const loadSlides = (id) =>
  getQlTask(
    `{ presentation(where:{id:${JSON.stringify(id)}}){
    id, title, Slides { id title content order }
  } }`
  ).map(path(["data", "presentation"]))
