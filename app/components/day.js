import { EmptyState } from "components"
import {
  getHoursInDay,
  firstInviteHour,
  inviteOptions,
  getInviteStatusColor,
  getTimeFormat,
  hyphenize,
  getTheme,
} from "utils"

const navToInvite = (mdl) => (invite) => {
  mdl.Events.currentEventId(invite.eventId)
  mdl.Events.currentEventStart(invite.start)
  localStorage.setItem("shindigit-eventId", invite.eventId)
  localStorage.setItem("shindigit-eventStart", invite.start)
  m.route.set(`/${hyphenize(mdl.User.name)}/events/${hyphenize(invite.title)}`)
}

const HourInvite = () => {
  return {
    view: ({ attrs: { mdl, invite, col } }) => {
      return m(
        `.col-xs-1-${col + 2}`,
        m(
          `.invite-list-item-${getTheme(mdl)}`,
          {
            onclick: (e) => navToInvite(mdl)(invite),
            style: {
              "background-color": getInviteStatusColor(invite.status),
              top: `${invite.start.format("mm")}px`,
              height: `${invite.end.diff(invite.start, "minutes") * 2}px`,
            },
          },
          invite.title
        )
      )
    },
  }
}

const scrollToCurrentTimeOrInvite = (mdl, invites) => {
  let first = firstInviteHour(invites)
  let hour = mdl.State.toAnchor()
    ? mdl.State.toAnchor()
    : first
    ? first
    : M().format("h")
  let el = document.getElementById(`${hour}:00`)
  el &&
    el.scrollIntoView({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
}

export const HourView = () => {
  return {
    view: ({ attrs: { mdl, hour, events } }) => {
      return m(
        ".frow ",
        m(".hour ", [
          m("p.hour-time", { id: hour }, hour),
          m(
            ".invite-list frow",
            events.map((invite, idx) =>
              m(HourInvite, { mdl, invite, col: events.length, key: idx })
            )
          ),
        ])
      )
    },
  }
}

const ListView = () => {
  return {
    view: ({ attrs: { mdl, invites } }) =>
      invites.map((invite) => {
        return m(
          ".invite-list-item-container",
          m(
            ".frow-container",
            m(
              `.invite-list-${inviteOptions[invite.status]}-${getTheme(mdl)}`,
              {
                onclick: (e) => navToInvite(mdl)(invite),
              },
              [
                m("h3", invite.title),
                m(".frow row-start", [
                  m(
                    "label.col-xs-1-1",
                    `${invite.start.format(
                      getTimeFormat(mdl)
                    )} - ${invite.end.format(getTimeFormat(mdl))}`
                  ),
                ]),
              ]
            )
          )
        )
      }),
  }
}

export const Day = ({ attrs: { mdl } }) => {
  return {
    oncreate: ({ attrs: { mdl, invites } }) =>
      scrollToCurrentTimeOrInvite(mdl, invites),
    onupdate: ({ attrs: { mdl, invites } }) =>
      mdl.State.toAnchor() && scrollToCurrentTimeOrInvite(mdl, invites),
    view: ({ attrs: { mdl, day, invites } }) => {
      return m(".day", [
        m(`.day-container-${getTheme(mdl)}`, [
          invites.any()
            ? mdl.Day.listView()
              ? m(ListView, { mdl, invites })
              : getHoursInDay().map((hour, idx) => {
                  return m(HourView, {
                    mdl,
                    invites: day[hour],
                    hour,
                    events: day[hour],
                  })
                })
            : m(EmptyState, {
                text:
                  "You have no events scheduled for today - why not create one!",
              }),
        ]),
      ])
    },
  }
}
