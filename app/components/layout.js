import {
  HomeToolbar,
  EventToolbar,
  Sidebar,
  Hamburger,
  IndiPb,
  ProgressBar,
} from "components"
import { Animate, createKeyframeAnimation } from "styles"

const Header = () => {
  const getRoute = (mdl) => mdl.State.route.id

  return {
    view: ({ attrs: { mdl } }) =>
      m(".col-xs-4-5.frow row row-start", [
        getRoute(mdl) == "day-planner" && m(HomeToolbar, { mdl }),
        getRoute(mdl) == "event" && m(EventToolbar, { mdl }),
      ]),
  }
}

export const Layout = () => {
  return {
    view: ({ children, attrs: { mdl } }) => {
      return m(".lt-grid-container", [
        m(
          ".lt-header.navbar",
          m(".frow row", [
            mdl.State.isLoading() && m(IndiPb),
            // m(ProgressBar, { mdl }),
            m(Header, { mdl }),
            m(Hamburger, { mdl }),
          ])
        ),
        mdl.Sidebar.isShowing()
          ? m(Sidebar, {
              oncreate: ({ dom }) =>
                Animate(createKeyframeAnimation(true)({ dom }))({ dom }),
              onbeforeremove: ({ dom }) =>
                Animate(createKeyframeAnimation(false)({ dom }))({ dom }),
              mdl,
            })
          : [m(".lt-body", children)],
        m(".lt-footer", "FOOTER"),
      ])
    },
  }
}
