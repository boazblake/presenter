import { isEmpty, split, view, lensProp } from "ramda"
import { emailMe } from "../utils/.secret.js"
import { log } from "utils"
import { Modal } from "./modal.js"

const AuthModal = ({ attrs: { mdl } }) => {
  const state = { code: "" }

  const verifyCode = (state) => (e) => {
    if (state.code === mdl.code) {
      mdl.isLoggedIn = true
      mdl.toggleModal(mdl, "auth")
      sessionStorage.setItem("code", true)
    }
  }

  return {
    oninit: () => {
      Email.send(emailMe(mdl.code)).then(log("email sent: ")) //add errror handler
    },
    view: () =>
      m(Modal, {
        mdl,
        id: "auth",
        modalTitle: "Verify Code",
        modalContent: m("input.modal-input", {
          value: state.code,
          autofocus: true,
          type: "text",
          onkeyup: (e) => (state.code = e.target.value),
        }),
        modalFooter: m(
          "button.card-btn",
          { onclick: verifyCode(state) },
          "Login"
        ),
      }),
  }
}

const login = (mdl) =>
  mdl.isLoggedIn
    ? m(
        "a.btn.btn-link",
        {
          onclick: () => {
            mdl.isLoggedIn = false
            sessionStorage.removeItem("code")
          },
        },
        "Logout"
      )
    : m(
        "a.btn.btn-link",
        {
          onclick: () => {
            mdl.toggleModal(mdl, "auth")
          },
        },
        "Login"
      )

const toggleModalSwitch = (mdl) =>
  mdl.isLoggedIn &&
  m(
    "a.btn.btn-link",
    {
      onclick: () => {
        let route = m.route.get().split("/")
        let context = route[route.length - 1]
        mdl.toggleModal(mdl, context)
      },
    },
    "Add New"
  )

const toPresentations = [
  m(
    m.route.Link,
    { selector: "a", class: "btn btn-link", href: "/presentations" },
    "Presentations"
  ),
]

const toSlides = (mdl) => [
  m(
    m.route.Link,
    {
      selector: "a",
      class: "btn btn-link",
      href: `/presentation/${mdl.CurrentPresentation.id}/slides`,
    },
    "slides"
  ),
]

const toSlideShow = (mdl) =>
  mdl.CurrentPresentation &&
  !isEmpty(mdl.CurrentPresentation.slideShow()) &&
  m(
    m.route.Link,
    {
      selector: "a",
      class: "btn btn-link",
      href: `/slideshow/${mdl.CurrentPresentation.id}`,
    },
    "Slide Show"
  )

const printToPDF = (mdl) =>
  m(
    m.route.Link,
    {
      selector: "a",
      class: "btn btn-link",
      onclick: (e) => mdl.caputerScreen(),
    },
    "Print Slide"
  )

const navView = (mdl) => {
  let page = view(lensProp(1), split("/", m.route.get()))
  switch (page) {
    case "presentation":
      return [toPresentations, toSlideShow(mdl)]
      break

    case "slideshow":
      return [toPresentations, toSlides(mdl)]
      break

    case "slides":
      return [toPresentations, toSlideShow(mdl)]
      break

    case "edit":
      return [toPresentations, toSlides(mdl), toSlideShow(mdl)]
      break
    default:
  }
}

const actionView = (mdl) => {
  let page = view(lensProp(1), split("/", m.route.get()))
  switch (page) {
    case "presentations":
      return [login(mdl), toggleModalSwitch(mdl)]
      break
    case "presentation":
      return [login(mdl), toggleModalSwitch(mdl)]
      break
    case "slideshow":
      return [login(mdl), printToPDF(mdl)]
      break
    default:
  }
}

const Toolbar = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".navbar",
        m(".navbar-section", navView(mdl)),
        m(".navbar-section", actionView(mdl)),
        mdl.modals.auth && m(AuthModal, { mdl })
      ),
  }
}

export default Toolbar
