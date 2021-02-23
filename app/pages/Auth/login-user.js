import { log, hyphenize, getMyLocationTask } from "utils"
import { validateLoginTask } from "./Validations.js"
import { HTTP, loginTask, getProfileTask } from "http"
import { IsLoading } from "components"

const loginUser = (mdl) => (data) => {
  const onError = (errs) => {
    if (errs) {
      state.errors = errs
      state.errorMsg(errs.error)
      state.showErrorMsg(true)
      console.log("failed - state", state)
    } else {
      state.errorMsg("Issue with logging in. Have you registered?")
      state.showErrorMsg(true)
      console.log("failed - other?", state)
    }
  }

  const onSuccess = (mdl) => (s) => {
    console.log("s", s)
    mdl.Calendar.state.start(mdl.User.profile.startWeekOnDay)
    state.errors = {}
    m.route.set(`/${hyphenize(mdl.User.name)}/${M().format("YYYY-MM-DD")}`)
  }

  state.isSubmitted = true

  validateLoginTask(data)
    .chain(loginTask(HTTP)(mdl))
    .chain(getProfileTask(HTTP)(mdl))
    .chain(getMyLocationTask)
    .fork(onError, onSuccess(mdl))
}

let data = {
  name: "",
  email: "",
  password: "",
}

let state = {
  isSubmitted: false,
  errors: {},
  httpError: undefined,
  showErrorMsg: Stream(false),
  errorMsg: Stream(""),
}

const reset = () => {
  state = {
    isSubmitted: false,
    errors: {},
    httpError: undefined,
    showErrorMsg: Stream(false),
    errorMsg: Stream(""),
  }
  data = {
    name: "",
    email: "",
    password: "",
  }
}

const validate = () => {
  const onSuccess = (_) => {
    state.errors = null
  }

  const onError = (error) => {
    state.errors = error
  }

  state.isSubmitted && validateLoginTask(data).fork(onError, onSuccess)
}

export const Login = () => {
  return {
    onremove: () => reset(),
    view: ({ attrs: { mdl } }) =>
      m(
        ".login-pag.full-width",
        [
          state.showErrorMsg() && m("code.warning", state.errorMsg()),
          m(
            "form.frow-container",
            {
              role: "form",
              id: "Login-form",
              onsubmit: (e) => e.preventDefault(),
            },
            [
              m("input", {
                class: state.isSubmitted
                  ? state.errors.email
                    ? "has-error"
                    : "has-success"
                  : "",
                id: "reg-email",
                type: "email",
                placeholder: "Email",
                onblur: (e) => validate(),
                oninput: (e) => (data.email = e.target.value.trim()),
                value: data.email,
              }),
              state.errors.email && m("span.error-field", state.errors.email),

              m("input", {
                class: state.isSubmitted
                  ? state.errors.password
                    ? "has-error"
                    : "has-success"
                  : "",
                id: "reg-pass",
                type: "password",
                placeholder: "Password",
                onblur: (e) => validate(),
                oninput: (e) => (data.password = e.target.value.trim()),
                value: data.password,
              }),
              state.errors.password &&
                m("span.error-field", state.errors.password),
            ]
          ),
          state.httpError && m(".error-field", state.httpError),
        ],
        m(
          m.route.Link,
          {
            // type: "submit",
            selector: "button",
            form: `login-form`,
            onclick: (e) => {
              e.preventDefault()
              loginUser(mdl)(data)
            },
            class: "max-width mt-20",
          },
          m("p.text-centered", "Login")
        ),
        m(
          m.route.Link,
          {
            href: "/register",
            class: "max-width",
          },
          "Need to  register ?"
        )
      ),
  }
}

export default Login
