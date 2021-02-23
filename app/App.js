import Routes from "./routes/index"

const toRoutes = (mdl) => (acc, route) => {
  acc[route.route] = {
    onmatch: (args, path, fullroute) => {
      if (route.group.includes("authenticated") && !mdl.State.isAuth()) {
        m.route.set(m.route.get())
      }
      mdl.State.route = route
      mdl.State.anchor = path.split("#")[1]
      mdl.Sidebar.isShowing(false)
      route.onmatch(mdl, args, path, fullroute)
    },
    render: () => route.component(mdl),
  }
  return acc
}

const App = (mdl) => Routes.reduce(toRoutes(mdl), {})

export default App
