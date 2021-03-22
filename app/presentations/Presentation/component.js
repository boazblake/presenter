import { log } from "utils"
import { compose, propEq, without, sortBy, filter } from "ramda"
import { deletePresentationsTask } from "../model.js"
import Task from "data.task"
import {
  EditLine,
  PlayLine,
  RemoveLine,
} from "@mithril-icons/clarity/cjs/index"
import { loadSlides } from "./model.js"

const Presentation = ({ attrs: { mdl } }) => {
  const getSlidesAndStartSlideShow = (id) => {
    const onSuccess = (slides) => {
      mdl.CurrentPresentation = slides
      mdl.CurrentPresentation.slideShow = mdl.CurrentPresentation.Slides.filter(
        (p) => p.order > 0
      ).sort((a, b) => a.order - b.order)
      m.route.set(`/slideshow/${id}`)
    }

    const onError = log("e")

    loadSlides(id).fork(onError, onSuccess)
  }

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
          },
          m(".tile-content", title),
          m(
            ".tile-action",
            {
              style: {
                position: "relative",
              },
            },
            m(PlayLine, {
              class: "clarity",
              onclick: () => getSlidesAndStartSlideShow(id),
            }),

            mdl.isLoggedIn && [
              m(EditLine, {
                class: "clarity",
                onclick: () => m.route.set(`/presentation/${id}/slides`),
              }),
              m(RemoveLine, {
                class: "clarity",
                onclick: (e) => {
                  e.stopPropagation()
                  removePresTask(id)
                },
              }),
            ]
          )
        )
      ),
  }
}

export default Presentation
