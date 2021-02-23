import Task from "data.task"
import {
  getInvitesTaskByEventId,
  createInviteTask,
  getUserProfileTask,
  getItemsByEventIdTask,
  getCommentsByEventIdTask,
  addItemTask,
  relateItemsToUserTask,
  unRelateItemToUserTask,
  updateBulkInvites,
} from "http"

import { traverse, head, map, propEq } from "ramda"
import { log, getHour, getMin, getTimeFormat } from "utils"

const toEventviewModel = (mdl) => ({
  hostId,
  objectId,
  start,
  end,
  title,
  notes,
  allDay,
  location,
  inPerson,
  latlong,
}) => {
  return {
    eventId: objectId,
    date: M(start).format("MM-DD-YYYY"),
    title: title.toUpperCase(),
    start,
    end,
    startTime: M(start).format(getTimeFormat(mdl)),
    endTime: M(end).format(getTimeFormat(mdl)),
    notes,
    allDay,
    location,
    inPerson,
    latlong,
    hostId,
  }
}

const toCommentViewModel = ({
  message,
  name,
  guestId,
  eventId,
  created,
  objectId,
}) => ({
  message,
  name,
  guestId,
  eventId,
  created,
  objectId,
})

const toGuestModel = (invite) => ({ name, email }) => ({
  ...invite,
  name,
  email,
})

const getGuestsTask = (http) => (mdl) => (invite) =>
  getUserProfileTask(http)(mdl)(invite.guestId)
    .map(head)
    .map(toGuestModel(invite))

const getEventGuestsByEventIdTask = (http) => (mdl) => (eventId) =>
  getInvitesTaskByEventId(http)(mdl)(eventId).chain(
    traverse(Task.of, getGuestsTask(http)(mdl))
  )

export const getEventByIdTask = (http) => (mdl) => (eventId) =>
  http.backEnd.getTask(mdl)(`data/Events/${eventId}`).map(toEventviewModel(mdl))

const addHostDataToEvent = (event) => (guests) => {
  let host = guests.filter(propEq("guestId", event.hostId))[0]
  event.hostId = host
  return event
}

export const loadEventTask = (http) => (mdl) => (eventId) =>
  Task.of((event) => (items) => (comments) => (guests) => ({
    event: addHostDataToEvent(event)(guests),
    guests,
    comments,
    items,
  }))
    .ap(getEventByIdTask(http)(mdl)(eventId))
    .ap(getItemsByEventIdTask(http)(mdl)(eventId))
    .ap(
      getCommentsByEventIdTask(http)(mdl)(eventId).map(map(toCommentViewModel))
    )

    .ap(getEventGuestsByEventIdTask(http)(mdl)(eventId))

export const deleteEventTask = (http) => (mdl) => (id) =>
  http.backEnd
    .deleteTask(mdl)(`data/Events/${id}`)
    .chain(() =>
      http.backEnd.deleteTask(mdl)(`data/bulk/Invites?where=eventId%3D'${id}'`)
    )
    .chain(() =>
      http.backEnd.deleteTask(mdl)(`data/bulk/Items?where=eventId%3D'${id}'`)
    )
    .chain(() =>
      http.backEnd.deleteTask(mdl)(`data/bulk/Comments?where=eventId%3D'${id}'`)
    )

export const createEventTask = (http) => (mdl) => ({
  allDay,
  startTime,
  endTime,
  title,
  notes,
  inPerson,
  location,
  latlong,
}) => {
  let end = M(mdl.selectedDate()).hour(getHour(endTime)).minute(getMin(endTime))
  let start = M(mdl.selectedDate())
    .hour(getHour(startTime))
    .minute(getMin(startTime))

  return http.backEnd
    .postTask(mdl)("data/Events")({
      end,
      start,
      notes,
      title,
      allDay,
      inPerson,
      location,
      latlong,
      hostId: mdl.User.objectId,
    })
    .chain(({ objectId, hostId, end, start, title }) => {
      let eventId = objectId
      let status = 1
      return createInviteTask(http)(mdl)({
        eventId,
        hostId,
        guestId: hostId,
        status,
        end,
        start,
        title,
        allDay,
        inPerson,
        location,
        latlong,
      }).chain(({ objectId }) => {
        let inviteId = objectId
        return Task.of((user) => (event) => ({
          user,
          event,
        }))
          .ap(
            http.backEnd.postTask(mdl)(
              `data/Users/${mdl.User.objectId}/invites`
            )([inviteId])
          )
          .ap(relateInvitesToEventTask(http)(mdl)(eventId)([inviteId]))
      })
    })
}

export const addItemToEventTask = (http) => (mdl) => (eventId) => (item) =>
  addItemTask(http)(mdl)(item).chain(({ objectId }) =>
    relateItemsToEventTask(http)(mdl)(eventId)([objectId])
  )

export const updateItemToGuestTask = (http) => (mdl) => (item) =>
  item.guestId
    ? relateItemsToUserTask(http)(mdl)(item.guestId)([item.objectId])
    : unRelateItemToUserTask(http)(mdl)(mdl.User.objectId)(item.objectId)

export const relateItemsToEventTask = (http) => (mdl) => (eventId) => (
  itemIds
) => http.backEnd.putTask(mdl)(`data/Events/${eventId}/items`)(itemIds)

export const relateCommentsToEventTask = (http) => (mdl) => (eventId) => (
  commentIds
) => http.backEnd.putTask(mdl)(`data/Events/${eventId}/comments`)(commentIds)

export const relateInvitesToEventTask = (http) => (mdl) => (eventId) => (
  inviteIds
) => http.backEnd.putTask(mdl)(`data/Events/${eventId}/invites`)(inviteIds)

export const updateEventHostTask = (http) => (mdl) => (eventId) => (hostId) =>
  http.backEnd.putTask(mdl)(`data/Events/${eventId}`)({ hostId })

export const updateEventTask = (http) => (mdl) => (eventId) => ({
  shortDate,
  endTime,
  startTime,
  allDay,
  inPerson,
  latlong,
  location,
  notes,
  title,
}) => {
  let updatedEvent = {
    end: M(shortDate).hour(getHour(endTime)).minute(getMin(endTime)),
    start: M(shortDate).hour(getHour(startTime)).minute(getMin(startTime)),
    allDay,
    inPerson,
    latlong,
    location,
    notes,
    title,
  }

  return http.backEnd
    .putTask(mdl)(`data/Events/${eventId}`)(updatedEvent)
    .chain(({ end, start, title, allDay, inPerson, location, latlong }) => {
      return updateBulkInvites(http)(mdl)(
        `eventId='${mdl.Events.currentEventId()}'`
      )({
        end,
        start,
        title,
        allDay,
        inPerson,
        location,
        latlong,
      })
    })
}
