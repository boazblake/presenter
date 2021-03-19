import Task from 'data.task'
import { log } from 'utils'
import { take } from 'ramda'
import {
  updateSlideDragStart,
  updateSlideDragEnd,
  updateStateDragEnd,
  updateSlideTask,
  deleteSlideTask,
} from '../model.js'
import { EditLine, RemoveLine } from '@mithril-icons/clarity/cjs'

const Slide = ({ attrs: { getSlides, mdl, s, key, state } }) => {
  const onError = task => error => log(`error with ${task}`)(error)
  const onSuccess = _ => getSlides({ attrs: { mdl } })

  const authDeleteTask = id =>
    window.confirm('Are you sure you want to delete?')
      ? Task.of(id)
      : Task.rejected(id)

  const removeSlideTask = id =>
    authDeleteTask(id)
      .chain(deleteSlideTask(state.presentationId))
      .fork(onError('deleting'), onSuccess)

  const addSlideToShow = s => {
    updateSlideTask(state.presentationId)([s]).fork(onError('updating'), _ => {
      state.slideDrag = {
        dragId: '',
        dragging: false,
        droppable: false,
      }
      onSuccess()
    })
  }

  const handleDragStart = ev => {
    ev.target.style.opacity = '0.4'
    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.setData('text/plain', 'slide')
    state.slideDrag = updateSlideDragStart(s)(state.slideDrag)
  }

  const handleDragEnd = ev => {
    ev.target.style.opacity = '1'
    if (state.slideDrag.droppable) {
      let _slide = updateSlideDragEnd(state.right().length)(s)

      updateStateDragEnd(state.slideDrag)
      return addSlideToShow(_slide)
    }
  }

  return {
    view: ({ attrs: { s, state, mdl } }) =>
      m(
        '.card',
        {
          id: s.id,
          draggable: mdl.isLoggedIn,
          ondragstart: handleDragStart,
          ondragend: handleDragEnd,
        },
        [
          m('div.card-header', [   m( 'h1.title', m('span', take(15, s.title))),   ]),
          mdl.isLoggedIn && m('.card-footer',
          m(RemoveLine, {
            onclick: () => removeSlideTask(s.id),
          }),
          m(EditLine,{
            onclick: () =>
             m.route.set(`/edit/${state.presentationId}/slide/${s.id}`),
          })),
        ]
      ),
  }
}

export default Slide
