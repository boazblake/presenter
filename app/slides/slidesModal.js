import { assoc } from "ramda"
import { saveSlideTask } from "./model.js"
import { Modal } from "components/modal"

const SlidesModal = ({ attrs: { pId, slide, getSlides, mdl } }) => {
  const state = {
    errors: "",
    title: "",
  }

  const onError = (errors) => {
    log("error")(errors)
    state.errors = errors
  }

  const onSuccess = () => {
    getSlides({ attrs: { mdl } })
    mdl.toggleModal(mdl, "slides")
  }

  const save = (e) => {
    e.preventDefault()
    let dto = assoc("presentation_id", pId, assoc("title", state.title, slide))
    saveSlideTask(dto).fork(onError, onSuccess)
  }

  return {
    view: () =>
      m(Modal, {
        onremove: () => {
          state.title = ""
          state.errors = ""
        },
        mdl: mdl,
        id: "slides",
        modalTitle: "New Slide",
        modalContent: m("input", {
          value: state.title,
          autofocus: true,
          type: "text",
          onkeyup: (e) => (state.title = e.target.value),
        }),
        modalFooter: m("button.card-btn", { onclick: save }, "add slide"),
      }),
  }
}

export default SlidesModal
