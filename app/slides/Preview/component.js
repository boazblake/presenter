import { concat, eqProps, compose, filter, map, propEq, head } from "ramda"
import { log , animateFadeIn} from "utils"
import {
  forGreater,
  reduceOrder,
  updateRemoveSlide,
  updateSlideTask
} from "../model.js"
import {RemoveLine,EditLine} from '@mithril-icons/clarity/cjs'

const SlidePosition = ({ attrs: { update } }) => {
  const updateSlidesPosition = (dir, slides, slide) => {
    switch (dir) {
      case "left":
        let prevSlide = slides.filter((x) => x.order == slide.order - 1)[0]
        prevSlide.order++
        slide.order--
        update([prevSlide, slide])
        break
      case "right":
        let nextSlide = slides.filter((x) => x.order == slide.order + 1)[0]
        slide.order++
        nextSlide.order--
        update([nextSlide, slide])
        break
    }
  }

  return {
    view: ({ attrs: { slides, slide, dir } }) =>
      m(`button.s-circle`, {
        disabled:
          (dir == "right" && slide.order == slides.length) ||
          (dir == "left" && slide.order == 1),
        onclick: () => updateSlidesPosition(dir, slides, slide)
      }, m(`i.icon icon-arrow-${dir}`))
  }
}

const Preview = ({ attrs: { getSlides, mdl, s, key, state } }) => {
  const onError = (task) => (error) => log(`error with ${task}`)(error)

  const onSuccess = (_) =>
    getSlides({ attrs: { mdl } })


  const updateAndSaveSlideTask = (slides) => {
    return updateSlideTask(mdl.CurrentPresentation.id)(slides).fork(
      onError("updating"),
      onSuccess
    )
  }

  const removeSlideTask = (s) => {
    let tail = compose(
      map(reduceOrder),
      filter(forGreater(s))
    )(state.right())
    let removeSlide = updateRemoveSlide(s)

    let updateList = concat(removeSlide, tail)

    updateAndSaveSlideTask(updateList)
  }

  const handleDragStart = (ev) => {
    ev.target.style.opacity = "0.4"
    ev.dataTransfer.effectAllowed = "move"
    ev.dataTransfer.setData("text/plain", "preview")
    state.previewDrag.drag = head(filter(propEq("id", s.id), state.right()))
  }

  const handleDragOver = (ev) => {
    ev.preventDefault()

    if (state.previewDrag.drag) state.previewDrag.drop = s
  }

  const handleDragLeave = (ev) => {
    ev.preventDefault()
    state.previewDrag.drop = null
  }

  const handleDrop = (ev) => ev.preventDefault()

  const handleDragEnd = (ev) => {
    ev.target.style.opacity = "1"
    state.slideDrag.dragging = false
    if (state.previewDrag.drop) {
      let start = state.previewDrag.drag.order
      let end = state.previewDrag.drop.order

      let dragged = state.previewDrag.drag
      let dropped = state.previewDrag.drop

      state.previewDrag.drag = mdl.SlideModel
      state.previewDrag.drop = mdl.SlideModel

      if (!eqProps("id", dragged, dropped)) {
        dragged.order = end
        dropped.order = start

        updateAndSaveSlideTask([dragged, dropped])
      }
    }
  }

  return {
    oncreate: ({ dom }) => animateFadeIn({ dom }),
    view: ({ attrs: { mdl, s, state } }) =>
      m(
        ".card.preview",
        {
          draggable: mdl.isLoggedIn,
          ondragstart: handleDragStart,
          ondragend: handleDragEnd,
          ondragover: handleDragOver,
          ondrop: handleDrop,
          ondragleave: handleDragLeave,
          style: {
            position:'relative',
            opacity:
              state.previewDrag.drop && state.previewDrag.drop.id == s.id
                ? 0.4
                : 1
          }
        },
        [
          m(".card-header",[
            m("p.slidePosition", s.order),
            mdl.isLoggedIn && m(
              RemoveLine,
              {
                style:{
                  position:'absolute',
                  top: 0,
                  right: 0,
                },
                onclick: () => removeSlideTask(s)
              },
            ),
          ]),
          m("p.slidePosition", s.title),
          // m(".card-body", m.trust(mdl.markup.render(s.content || ""))),
         mdl.isLoggedIn && m(".card-footer", [
            m(SlidePosition, {
              slides: state.right(),
              dir: "left",
              slide: s,
              update: updateAndSaveSlideTask
            }),
            m(EditLine,{             style:{
              position:'absolute',
              top: 35,
              right: 0,
            },
              onclick: () =>  {
                m.route.set(`/edit/${mdl.CurrentPresentation.id}/slide/${s.id}`)
              },
            }),
            m(SlidePosition, {
              slides: state.right(),
              dir: "right",
              slide: s,
              update: updateAndSaveSlideTask
            })
          ])
        ]
      )
  }
}

export default Preview
