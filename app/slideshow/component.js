import m from "mithril"
import { pluck } from "ramda"
import { animateEntranceRight } from "utils"

const Ending = {
  view: () =>
    m(
      ".endingContainer",
      m("h1.endingTitle", "THE END!"),
      m("img.endingImg", {
        id: "ending",
        src: "https://imgur.com/uj15GJp.gif",
        width: "100%",
      })
    ),
}

const updateCursor = (state, pageX) => {
  state.class =
    (pageX / window.innerWidth) * 100 > 50 ? "point-right" : "point-left"
}

const SlideShow = ({ attrs: { mdl } }) => {
  if (!mdl.CurrentPresentation.id) m.route.set("/presentations")
  const state = {
    update: false,
    key: undefined,
    current: 0,
    class: "",

    size: mdl.CurrentPresentation.slideShow.length || 0,
    contents: pluck("content", mdl.CurrentPresentation.slideShow) || 0,
  }

  const calcStatePosition = (x) =>
    x > window.innerWidth / 2 ? "right" : "left"

  const updateStatePosition = (x, state) =>
    (state.key = calcStatePosition(x) == "right" ? "ArrowRight" : "ArrowLeft")

  const nextSlide = (target) => {
    if (state.current == state.size - 1) {
      state.contents[state.current] = ""
    } else {
      state.current++
    }
    target.scroll(0, -300)
    return state
  }

  const prevSlide = (target) => {
    target.scrollIntoView(true)
    state.current == 0 ? state.current : state.current--
  }

  const changeSlide = (key, target) => {
    switch (key) {
      case "ArrowLeft":
        if (target.children) prevSlide(target)
        break
      case "ArrowRight":
        if (target.children) nextSlide(target)
        break
      case "ArrowUp":
        target.scrollBy(0, 100)
        break
      case "ArrowDown":
        target.scrollBy(0, -100)
        break
    }
  }

  return {
    dir: state.key,
    oncreate: ({ dom }) => {
      dom.addEventListener("restart-presentation", (x) => {
        state.update = true
        console.log("damkn irt workd", x)
      })
    },
    oninit: (state.slide = state.contents[state.current]),
    view: ({ attrs: { mdl } }) =>
      m(
        ".slideshow#slideshow",
        {
          class: state.class,
          tabindex: 0,
          onkeyup: ({ key, target }) => {
            state.update = true
            state.key = key
            changeSlide(key, target)
          },
          onmousemove: ({ pageX }) => {
            state.update = false
            updateCursor(state, pageX)
          },
          onclick: ({ x, target }) => {
            state.update = true
            updateStatePosition(x, state)
            return changeSlide(state.key, target)
          },
        },
        m(
          ".slidecard#slidecard",
          {
            onbeforeupdate: () =>
              !["ArrowUp", "ArrowDown"].includes(state.key) && state.update,
            onupdate: ({ dom }) => {
              dom.scrollIntoView({
                block: "start",
                inline: "start",
              })
              animateEntranceRight({ dom })
            },
          },
          state.contents[state.current]
            ? m.trust(mdl.markup.render(state.contents[state.current]))
            : m(Ending)
        )
      ),
  }
}

export default SlideShow
