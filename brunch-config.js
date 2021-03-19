// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      "vendor.js": /^(?!app)/, // Files that are not in `app` dir.
      "app.js": /^app/,
    },
  },
  stylesheets: {
    order: {
      before: ["./imports.scss"],
      after: ["app.css"],
    },
    joinTo: {
      "app.css": [
        (path) => path.includes(".scss"),
        (path) => path.includes(".css"),
        (path) => path.includes(".sass"),
      ],
    },
  },
}

exports.modules = {
  autoRequire: {
    "app.js": ["initialize.js"],
  },
}

exports.plugins = {
  sass: {
    precision: 8,
    mode: "native",
    sourceMapEmbed: true,
    includePaths: [],
  },
  imagemin: {
    plugins: {
      "imagemin-gifsicle": true,
      "imagemin-jpegtran": true,
      "imagemin-optipng": true,
      "imagemin-svgo": true,
    },
    pattern: /\.(gif|jpg|jpeg|jpe|jif|jfif|jfi|png|svg|svgz)$/,
  },
  babel: {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            browsers: ["last 2 versions"],
          },
        },
      ],
    ],
  },
  copycat: {
    fonts: [
      // "app/assets/fonts",
      "node_modules/@mithril-icons/clarity",
    ],
    images: ["app/assets/images"],
    verbose: true, //shows each file that is copied to the destination directory
    onlyChanged: true, //only copy a file if it's modified time has changed (only effective when using brunch watch)
  },
  swPrecache: {
    swFileName: "service-worker.js",
    options: {
      autorequire: ["app/assets/index.html", "app/assets/images"],
      staticFileGlobs: [
        "docs/app.css",
        "docs/app.js",
        "docs/vendor.js",
        "docs/index.html",
      ],
      stripPrefix: "docs/",
    },
  },
  "@babel": { presets: ["env"] },
}

exports.paths = {
  public: "docs",
  watched: [
    "app",
    "app/components",
    "app/styles",
    "app/utils",
    "app/assets",
  ],
}

exports.npm = {
  enabled: true,
  globals: { m: "mithril", Stream: "mithril-stream", M: "moment" },
  styles:{'code-color': ['highlight.js/styles/shades-of-purple.css'],
    "spectre.css": [
      "dist/spectre.css",
      "dist/spectre-exp.css",
      "dist/spectre-icons.css"
    ]
  },
}
