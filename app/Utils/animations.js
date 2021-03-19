import anime from "animejs"

export const animateSlideEntrance = ({ dom }) => {
  return dom.animate(
    [
      { transform: "translate3d(20%,0,0)", opacity: 0 },
      { transform: "none", opacity: 1 }
    ],
    {
      duration: 650
    }
  )
}

export const animateEntranceRight = ({ dom }) => {
  return dom.animate(
    [
      {
        animation: "",
        transform: "translate3d(100%,0,0)",
        scale: 2,
        opacity: 0
      },
      {
        animation: "stretchRight 1s ease-in-out both",
        transform: "none",
        opacity: 1,
        scale: 1
      }
    ],
    {
      duration: 350
    }
  )
}

export const animateChildEntrance = ({ dom }) => {
  let children = [...dom.children]

  return children.map((child, index) => {
    setTimeout(() => {
      child.animate(
        [
          { transform: "translate3d(0,-100%,0)", opacity: 0 },
          { transform: "none", opacity: 1 }
        ],
        {
          duration: 850
        }
      )
    }, (index + 1) * 200)
  })
}

export const animateExit = (dom) => {
  let children = [...dom.children]

  let anim = animate([
    { transform: "none", opacity: 1 },
    { transform: "translate3d(25%,100%,0)", opacity: 0 }
  ])

  let waapi = children.map((child) =>
    child.animate(anim, {
      duration: 850
    })
  )

  return new Promise((resolve) => {
    waapi.onfinish = function(e) {
      resolve()
    }
  })
}

export const animateFadeIn = ({ dom }) => {
  let children = [...dom.children]
  children.map((child, index) => {
    child.style.opacity = 0
    child.style.transition = "opacity .4s ease-in-out"

    return setTimeout(() => {
      child.style.opacity = 1
    }, (index + 1) * 200)
  })
}

export const animateFadeOut = ({ dom }) => {
  let anim = [
    { transition: "opacity .4s ease-in-out" },
    { transform: "none", opacity: 1 },
    { transform: "translate3d(25%,100%,0)", opacity: 0 }
  ]
  let waapi = dom.animate(anim, {
    duration: 850
  })

  return new Promise((resolve) => {
    waapi.onfinish = function(e) {
      resolve()
    }
  })
}

export const animeEntrance = ({ dom }) => {
  let children = [...dom.children]
  const res = children.map((el) =>
    anime({
      target: el,
      easing: "easeInQuad",
      translateX: 250,
      offset: 0
    })
  )

  return res
}

export const bounceEntrance = ({ dom }) => {
  return dom.animate({
    animation: "animation 1000ms linear both",
    keyframes: {
      "0%": {
        transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "3.4%": {
        transform:
          "matrix3d(1.316, 0, 0, 0, 0, 1.407, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "4.7%": {
        transform:
          "matrix3d(1.45, 0, 0, 0, 0, 1.599, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "6.81%": {
        transform:
          "matrix3d(1.659, 0, 0, 0, 0, 1.893, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "9.41%": {
        transform:
          "matrix3d(1.883, 0, 0, 0, 0, 2.168, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "10.21%": {
        transform:
          "matrix3d(1.942, 0, 0, 0, 0, 2.226, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "13.61%": {
        transform:
          "matrix3d(2.123, 0, 0, 0, 0, 2.332, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "14.11%": {
        transform:
          "matrix3d(2.141, 0, 0, 0, 0, 2.331, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "17.52%": {
        transform:
          "matrix3d(2.208, 0, 0, 0, 0, 2.239, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "18.72%": {
        transform:
          "matrix3d(2.212, 0, 0, 0, 0, 2.187, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "21.32%": {
        transform:
          "matrix3d(2.196, 0, 0, 0, 0, 2.069, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "24.32%": {
        transform:
          "matrix3d(2.151, 0, 0, 0, 0, 1.96, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "25.23%": {
        transform:
          "matrix3d(2.134, 0, 0, 0, 0, 1.938, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "29.03%": {
        transform:
          "matrix3d(2.063, 0, 0, 0, 0, 1.897, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "29.93%": {
        transform:
          "matrix3d(2.048, 0, 0, 0, 0, 1.899, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "35.54%": {
        transform:
          "matrix3d(1.979, 0, 0, 0, 0, 1.962, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "36.74%": {
        transform:
          "matrix3d(1.972, 0, 0, 0, 0, 1.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "41.04%": {
        transform:
          "matrix3d(1.961, 0, 0, 0, 0, 2.022, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "44.44%": {
        transform:
          "matrix3d(1.966, 0, 0, 0, 0, 2.032, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "52.15%": {
        transform:
          "matrix3d(1.991, 0, 0, 0, 0, 2.006, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "59.86%": {
        transform:
          "matrix3d(2.006, 0, 0, 0, 0, 1.99, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "63.26%": {
        transform:
          "matrix3d(2.007, 0, 0, 0, 0, 1.992, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "75.28%": {
        transform:
          "matrix3d(2.001, 0, 0, 0, 0, 2.003, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "85.49%": {
        transform:
          "matrix3d(1.999, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "90.69%": {
        transform:
          "matrix3d(1.999, 0, 0, 0, 0, 1.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "100%": {
        transform: "matrix3d(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      }
    }
  })
}
