import { isEmpty, split, view, lensProp  } from "ramda"
import {  emailMe } from "../utils/.secret.js"


const AuthModal = ({ attrs:{mdl} }) => {
const state = {code:''}

  const verifyCode = (e) => {
    e.preventDefault()
    if (state.code === mdl.code) {
      mdl.isLoggedIn = true
      mdl.toggleAuthModal = !mdl.toggleAuthModal
      sessionStorage.setItem('code', true)
    }
  }

  return {
    oninit:() => {
      Email.send(emailMe(mdl.code)).then(x => console.log('email sent: ',x))//add errror handler

    },
    view: () =>
      m("article.modal-container", [
        m(".card", [
          m(".card-header", [
            m("h2.modal-label", "Verify Code"),
            m("button.card-delete", {
              onclick: () => mdl.toggleAuthModal = !mdl.toggleAuthModal,
              "aria-label": "close"
            })
          ]),
          m(".card-body", [
            m(
              ".modal-content",
              m("input.modal-input", {
                autofocus: true,
                type: "text",
                onchange: (e) => (state.code = e.target.value)
              })
            )
          ]),
          m(
            ".card-footer",
            m("button.card-btn", { onclick: verifyCode }, "Login")
          )
        ])
      ])
  }
}



const login = mdl =>
 mdl.isLoggedIn ?m(
  "a.btn.btn-link",
  {
    onclick: () => {
       mdl.isLoggedIn = false
       sessionStorage.removeItem('code')
    }
  },
  "Logout"
) : m(
    "a.btn.btn-link",
    {
      onclick: () => {
         mdl.toggleAuthModal = !mdl.toggleAuthModal
      }
    },
    "Login"
  )



const toggleModal = (mdl) =>
   mdl.isLoggedIn && m(
      "a.btn.btn-link",
      {
        onclick: () => (mdl.toggleModal = !mdl.toggleModal)
      },
      "Add New"
    )

const toPresentations = [
  m(
    m.route.Link,
    {selector:'a',class:'btn btn-link',
      href: "/presentations"
    },
    "Presentations"
  )
]

const toSlides = (mdl) => [
  m(
    m.route.Link,
    {selector:'a',class:'btn btn-link',
      href: `/presentation/${mdl.CurrentPresentation.id}/slides`
    },
    "slides"
  )
]

const toSlideShow = (mdl) =>   mdl.CurrentPresentation &&
    !isEmpty(mdl.CurrentPresentation.slideShow())
    && m(
        m.route.Link,
        {selector:'a',class:'btn btn-link',
          href: `/slideshow/${mdl.CurrentPresentation.id}`
        },
        "Slide Show"
      )

const printToPDF = mdl =>
  m(
   m.route.Link,
    {selector:'a',class:'btn btn-link',
      onclick: e => mdl.caputerScreen()
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
      return [login(mdl), toggleModal(mdl)]
      break
    case "presentation":
      return [login(mdl),  toggleModal(mdl)]
      break
    case "slideshow":
      return [login(mdl),  printToPDF(mdl)]
      break
    default:
  }
}

const Toolbar = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".navbar",
        m(".navbar-section", navView(mdl)),
        m(".navbar-section", actionView(mdl)),
        mdl.toggleAuthModal && m(AuthModal, {mdl})
      )
  }
}

export default Toolbar
