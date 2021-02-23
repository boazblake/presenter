import { hyphenize, getTheme } from "utils"

export const EventToolbar = () => {
  return {
    view: ({ attrs: { mdl } }) => [
      m(
        `button.col-xs-1-1.btn-${getTheme(mdl)}`,
        {
          disabled: mdl.Sidebar.isShowing(),
          onclick: (e) => {
            localStorage.removeItem("shindigit-eventId")
            localStorage.removeItem("shindigit-eventStart")
            mdl.Invites.fetch(true)
            mdl.State.toAnchor(M(mdl.Events.currentEventStart()).format("HH"))
            m.route.set(
              `/${hyphenize(mdl.User.name)}/${M(mdl.selectedDate()).format(
                "YYYY-MM-DD"
              )}`
            )
          },
        },
        mdl.Events.isMember() ? "Back" : "Home"
      ),
    ],
  }
}
