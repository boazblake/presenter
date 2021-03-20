const isActive = (mdl, id) => (mdl.modals[id] ? "active" : "")

export const Modal = ({ attrs: { mdl } }) => {
  return {
    view: ({
      attrs: { id, modalTitle, modalContent, modalFooter, onremove },
    }) =>
      mdl.modals[id] &&
      m(
        `.modal.${isActive(mdl, id)}[id=${id}]`,
        {
          onremove,
        },
        m("a.modal-overlay[href='#'][aria-label='Close']", {
          onclick: () => mdl.toggleModal(mdl, id),
        }),
        m(".modal-container", [
          m(".modal-header", [
            m("button.btn.btn-clear.float-right[aria-label='Close']", {
              onclick: () => mdl.toggleModal(mdl, id),
            }),
            m(".modal-title.h5", modalTitle),
          ]),
          m(".modal-body", m(".content", modalContent)),
          m(".modal-footer", modalFooter),
        ])
      ),
  }
}
