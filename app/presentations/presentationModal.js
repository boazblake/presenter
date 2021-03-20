import { savePresentationTask } from "./model.js"
import { log } from "utils"
import { Modal } from "components/modal"

const PresentationModal = ({
  attrs: { state, mdl, presentations, onremove },
}) => {
  const onError = (errors) => {
    log("error")(errors)
    state.errors = errors
    toggleModal()
  }
  const onSuccess = (p) => {
    state.title = ""
    state.errors = null
    presentations.push(p)
    mdl.toggleModal(mdl, "presentations")
  }

  const save = (e) => {
    e.preventDefault()
    savePresentationTask(state).fork(onError, onSuccess)
  }

  return {
    view: () =>
      m(Modal, {
        onremove,
        mdl: mdl,
        id: "presentations",
        modalTitle: "New Presentation",
        modalContent: m("input", {
          value: state.title,
          autofocus: true,
          type: "text",
          onkeyup: (e) => (state.title = e.target.value),
        }),
        modalFooter: m(
          "button.card-btn",
          { onclick: save },
          "create presentation"
        ),
      }),
  }
}

export default PresentationModal
