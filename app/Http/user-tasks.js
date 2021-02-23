import { map, path } from "ramda"

export const setUserToken = (mdl) => (user) => {
  sessionStorage.setItem("shindigit-user", JSON.stringify(user))
  sessionStorage.setItem("shindigit-user-token", user["sessionToken"])
  mdl.State.isAuth(true)
  mdl.User = user
  return user
}

const makeTempUser = (userInput) => (dbResp) => ({ ...userInput, ...dbResp })
//({name, email, isAdmin})=> ({sessionToken, objectId, createdAt})

export const loginTask = (http) => (mdl) => ({ email, password }) =>
  http.backEnd.postTask(mdl)("login")({
    username: email,
    password: password,
  })

export const registerTask = (http) => (mdl) => ({
  name,
  email,
  password,
  isAdmin,
}) =>
  http.backEnd
    .postTask(mdl)("users")({
      name,
      username: email,
      password,
      isAdmin,
      email,
    })
    .map(makeTempUser({ name, email, isAdmin }))
    .map(setUserToken(mdl))

const setProfile = (mdl) => (profile) => {
  mdl.User.profile = profile
  return mdl
}

export const createProfileTask = (http) => (mdl) => (user) =>
  http.backEnd
    .postTask(mdl)("classes/Profiles")({
      userId: mdl.User.objectId,
      name: mdl.User.name,
      email: mdl.User.email,
      startWeekOnDay: 1,
      is24Hrs: true,
      isDarkTheme: true,
      language: "en",
      searchRadius: 20,
    })
    .map(setProfile(mdl))

const getUserProfileTask = (http) => (mdl) => (id) =>
  http.backEnd
    .getTask(mdl)(`classes/Profiles?where={"userId":"${id}"}`)
    .map(path(["results", 0]))
    .map((profile) => {
      mdl.User.profile = profile
      setUserToken(mdl)(mdl.User)
      return mdl
    })

export const getProfileTask = (http) => (mdl) => (user) => {
  mdl.User = user
  return getUserProfileTask(http)(mdl)(mdl.User.objectId)
}

export const updateUserProfile = (http) => (mdl) => (profile) =>
  http.backEnd.putTask(mdl)(`data/Profiles/${mdl.User.profile.objectId}`)(
    profile
  )

export const findUserByEmailTask = (http) => (mdl) => (email) =>
  http.backEnd.getTask(mdl)(`data/Users?where=email%3D'${email}'`)

export const relateItemsToUserTask = (http) => (mdl) => (userId) => (itemIds) =>
  http.backEnd.putTask(mdl)(`data/Users/${userId}/items`)(itemIds)

export const unRelateItemToUserTask = (http) => (mdl) => (userId) => (itemId) =>
  http.backEnd.deleteTask(mdl)(
    `data/Users/${userId}/items?whereClause=objectId%3D'${itemId}'`
  )

export const relateInvitesToUserTask = (http) => (mdl) => (userId) => (
  inviteIds
) => http.backEnd.putTask(mdl)(`data/Users/${userId}/invites`)(inviteIds)

// export const unRelateInvitesToUserTask = (http) => (mdl) => (userId) => (
//   inviteIds
// ) => http.backEnd.deleteTask(mdl)(`data/Users/${userId}/invites`)(inviteIds)

export const relateProfileToUserTask = (http) => (mdl) => (userId) => (
  profileId
) => http.backEnd.putTask(mdl)(`data/Users/${userId}/profile`)([profileId])

// export const unRelateProfileToUserTask = (http) => (mdl) => (userId) => (
//   profileId
// ) => http.backEnd.deleteTask(mdl)(`data/Users/${userId}/profile`)([profileId])
