import { clone } from 'ramda'
import {  animateFadeIn,} from 'utils'
import PresentationModal from './presentationModal.js'
import Presentation from './Presentation/component.js'
import { getPresentations } from "./model.js"

  const onError = (error) => {
    log("error")(error)
    state.error = error
  }


  const onSuccess = (mdl) => (dto) =>
    mdl.Presentations = dto

  const findPresentations = ({ attrs: { mdl } }) =>
    getPresentations().fork(onError, onSuccess(mdl))


const Presentations = () => {
  const state = {
    errors: [],
    title: '',
  }

  return {

      oninit: findPresentations,

    view: ({ attrs: { mdl } }) => [
      mdl.toggleModal
        ? m(PresentationModal, {
            mdl,
            state,
            toggleModal: () => (mdl.toggleModal = !mdl.toggleModal),
            presentations: mdl.Presentations,
            presentationModel: clone(mdl.PresentationModel),
          })
        : '',

      m(
        '.container.columns',
        {
          oncreate: ({ dom }) => animateFadeIn({ dom }),
          onBeforeRemove: (vnode, done) => {
            vnode.dom.addEventListener('animationend', done)
            vnode.dom.style.animation = 'fadeOut 1s'
          },
        },
        [
          mdl.Presentations &&
            mdl.Presentations.map(({ title, id }) =>
              m(Presentation, {
                key: id,
                id,
                title,
                mdl,
              })
            ),
        ]
      ),
    ],
  }
}

export default Presentations
