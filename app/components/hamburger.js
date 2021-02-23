import { BellLine, BarsLine, CloseLine } from "@mithril-icons/clarity/cjs"
import { HTTP, getInvitesByGuestIdTask } from "http"
import { Animate, puffOutCenter, shake, focusInContract } from "styles"

export const Hamburger = () => {
  const load = ({ attrs: { mdl } }) => {
    const onError = (err) => {
      mdl.Invites.state.error = err
      mdl.Invites.state.status = "failed"
    }

    const onSuccess = (invites) => {
      mdl.Invites.fetch(false)
      mdl.Invites.state.error = null
      let forNewInvite = (i) => !i.updated && i.status == 2
      let forRsvpInvites = (i) => i.updated || i.status !== 2

      mdl.Invites.needRSVP(invites.filter(forNewInvite))
      mdl.Invites.withRSVP(invites.filter(forRsvpInvites))
      mdl.Invites.state.status = "success"
    }

    getInvitesByGuestIdTask(HTTP)(mdl)(mdl.User.objectId).fork(
      onError,
      onSuccess
    )
  }
  return {
    oninit: load,
    onupdate: ({ attrs: { mdl } }) =>
      mdl.Invites.fetch() && load({ attrs: { mdl } }),
    view: ({ attrs: { mdl } }) => {
      return [
        m(
          "button.col-xs-1-5.button-none.frow",
          {
            onclick: (e) => {
              mdl.Invites.fetch(true)
              mdl.Sidebar.isShowing(!mdl.Sidebar.isShowing())
            },
          },
          mdl.Sidebar.isShowing()
            ? m(CloseLine, { oncreate: Animate(focusInContract) })
            : [
                mdl.Invites.needRSVP().length > 0 &&
                  m(".notifier", [
                    m(BellLine, {
                      oncreate: Animate(shake, {
                        delay: 100,
                        iterations: 1,
                        fill: "backwards",
                      }),
                    }),
                    m(
                      ".notif-count",
                      {
                        oncreate: Animate(puffOutCenter, {
                          iterations: 1.2,
                          fill: "backwards",
                        }),
                      },
                      mdl.Invites.needRSVP().length
                    ),
                  ]),
                m(BarsLine, {
                  oncreate: Animate(focusInContract, { delay: 200 }),
                }),
              ]
        ),
      ]
    },
  }
}
