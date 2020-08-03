export * from "./http.js"
export * from "./local-storage.js"
export * from "./validations"

export const log = (m) => (v) => {
  console.log(m, v)
  return v
}

const secureImg = (url) =>
  url.match(/(https)./) ? url : url.replace("http", "https")

export const randomPause = () => Math.random() * 1000
export const Pause = (n) => n * 1000
export const NoOp = () => {}
export const nameFromRoute = (route) => route.split("/")[1].toUpperCase()

export const jsonCopy = (data) => JSON.parse(JSON.stringify(data))

export const isSideBarActive = (mdl) =>
  mdl.settings.profile !== "desktop" && mdl.status.sidebar

export const range = (size) => [...Array(size).keys()]

export const shortDate = (date = new Date()) => {
  console.log(date)
  return new Date(date).toISOString().split("T")[0]
}

export const isLeapYear = (year) =>
  year % 4 == 0
    ? false
    : year % 100 == 0
    ? year % 400 == 0
      ? true
      : false
    : false

export const isToday = (someDate) => {
  const today = new Date()
  const date = new Date(someDate)
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  )
}

export const daysOfTheWeek = [
  "Monday",
  "Teusday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

export const monthsOfTheYear = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const fromFullDate = (date) => {
  let d = new Date(date)
  return {
    day: d.getDate(),
    month: d.getMonth(),
    year: d.getFullYear(),
    hour: d.getHours(),
    min: d.getMinutes(),
  }
}

export const getFullDate = ({ year, month, day }, startHour, startMin) => {
  console.log(
    "getFullDate",
    new Date(year, month - 1, day, startHour, startMin)
  )
  return new Date(year, month - 1, day, startHour, startMin)
}

export const toHourViewModel = (date) => (mdl, hour) => {
  if (!mdl[date][hour]) {
    mdl[date][hour] = {}
  }
  return mdl
}

export const pad0Left = (num) => `0${num}`

export const formatDateString = ({ year, month, day }) => {
  let padded = (d) => (d.toString().length == 1 ? pad0Left(d) : d)

  return `${year}-${padded(month)}-${padded(day)}`
}

export const isEqual = (a, b) => JSON.stringify(a) == JSON.stringify(b)

export const pad00Min = (num) => `${num}:00`

export const getHoursInDay = (format) =>
  range(format == "24hrs" ? 24 : 12)
    .map((n) => (n.toString().length == 1 ? pad0Left(n) : n))
    .map(pad00Min)