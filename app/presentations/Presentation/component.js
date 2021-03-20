import { log } from "utils"
import { without } from "ramda"
import { deletePresentationsTask } from "../model.js"
import Task from "data.task"
import { RemoveLine } from "@mithril-icons/clarity/cjs/index"

const Presentation = ({ attrs: { mdl } }) => {
  const onError = (task) => (error) => log(`error with ${task}: `)(error)
  const onSuccess = (models) => (deleted) => {
    return (models.Presentations = without([deleted], models.Presentations))
  }

  const authDeleteTask = (id) =>
    window.confirm("Are you sure you want to delete?")
      ? Task.of(id)
      : Task.rejected("user denied req")

  const removePresTask = (pId) =>
    authDeleteTask(pId)
      .chain(deletePresentationsTask)
      .fork(onError("deleting"), onSuccess(mdl))

  return {
    view: ({ attrs: { title, id, mdl } }) =>
      m(
        ".card.column.col-3",
        { style: { margin: "10px" } },
        m(
          ".tile",
          {
            style: { height: "100px" },
            onclick: () => m.route.set(`/presentation/${id}/slides`),
          },
          m(".tile-content", title),
          m(
            ".tile-action",
            mdl.isLoggedIn &&
              m(RemoveLine, {
                style: {
                  width: "0.8rem",
                  "margin-right": "30px",
                },
                onclick: (e) => {
                  e.stopPropagation()
                  removePresTask(id)
                },
              })
          )
        )
      ),
  }
}

export default Presentation
