const root = document.body
import { Layout } from "./components/layout.js"

import Presentations from "./presentations/component.js"
import Slides from "./slides/component.js"
import Editor from "./editor/component.js"
import SlideShow from "./slideshow/component.js"
import Models from "./models.js"

if (sessionStorage.getItem("code")) {
  Models.isLoggedIn = true
}

const makeRoutes = (mdl) => {
  return {
    "/presentations": {
      render: () => m(Layout, { mdl }, m(Presentations, { mdl })),
    },
    "/presentation/:id/slides": {
      render: () => m(Layout, { mdl }, m(Slides, { mdl })),
    },
    "/edit/:pid/slide/:id": {
      onmatch: () => mdl.isLoggedIn || m.route.set(m.route.get()),
      render: () => m(Layout, { mdl }, m(Editor, { mdl })),
    },
    "/slideshow/:id": {
      onmatch: ({ id }) =>
        mdl.CurrentPresentation.Slides.length == 0 &&
        m.route.set(`/presentation/${id}/slides`),
      render: () => m(Layout, { mdl }, m(SlideShow, { mdl })),
    },
  }
}

m.route(root, "/presentations", makeRoutes(Models))
