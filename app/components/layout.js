import Toolbar from './toolbar.js'

export const Layout = {
  view: ({ children, attrs: {mdl} }) => m('.container',m(Toolbar, {mdl}), children),
}

