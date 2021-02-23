import { curryN, identity, lensProp, mergeAll, prop, equals } from "ramda"
import { Success } from "data.validation"
import { validate, isRequired, emailFormat } from "utils"

const ValidateRegistration = Success(curryN(3, identity))
const ValidateLogin = Success(curryN(2, identity))

const nameLense = lensProp("name")
const passwordLense = lensProp("password")
const passwordConfirmLense = lensProp("confirmPassword")
const emailLense = lensProp("email")
const emailConfirmLense = lensProp("confirmEmail")

const NAME_REQUIRED_MSG = "A Name is required"
const PASSWORD_REQUIRED_MSG = "A Password is required"
const EMAIL_REQUIRED_MSG = "An Email is required"
const EMAILS_MUST_MATCH = "Emails do not match"
const INVALID_EMAIL_FORMAT = "Email must be a valid format"
const PASSWORDS_MUST_MATCH = "Passwords do not match"

const validateName = (data) =>
  Success(data).apLeft(validate(isRequired, nameLense, NAME_REQUIRED_MSG, data))

const validateEmails = (data) =>
  Success(data)
    .apLeft(validate(isRequired, emailLense, EMAIL_REQUIRED_MSG, data))
    .apLeft(validate(isRequired, emailConfirmLense, EMAIL_REQUIRED_MSG, data))
    .apLeft(
      validate(
        equals(prop("email", data)),
        emailConfirmLense,
        EMAILS_MUST_MATCH,
        data
      )
    )
    .apLeft(
      validate(emailFormat, emailConfirmLense, INVALID_EMAIL_FORMAT, data)
    )
    .apLeft(validate(emailFormat, emailLense, INVALID_EMAIL_FORMAT, data))
    .apLeft(
      validate(
        equals(prop("confirmEmail", data)),
        emailLense,
        EMAILS_MUST_MATCH,
        data
      )
    )

const validateEmail = (data) =>
  Success(data)
    .apLeft(validate(isRequired, emailLense, EMAIL_REQUIRED_MSG, data))
    .apLeft(validate(emailFormat, emailLense, INVALID_EMAIL_FORMAT, data))

const validatePasswords = (data) =>
  Success(data)
    .apLeft(validate(isRequired, passwordLense, PASSWORD_REQUIRED_MSG, data))
    .apLeft(
      validate(isRequired, passwordConfirmLense, PASSWORD_REQUIRED_MSG, data)
    )
    .apLeft(
      validate(
        equals(data.password),
        passwordConfirmLense,
        PASSWORDS_MUST_MATCH,
        data
      )
    )
    .apLeft(
      validate(
        equals(data.confirmPassword),
        passwordLense,
        PASSWORDS_MUST_MATCH,
        data
      )
    )

const validatePassword = (data) =>
  Success(data).apLeft(
    validate(isRequired, passwordLense, PASSWORD_REQUIRED_MSG, data)
  )

export const validateUserRegistrationTask = (data) =>
  ValidateRegistration.ap(validateName(data))
    .ap(validateEmails(data))
    .ap(validatePasswords(data))
    .failureMap(mergeAll)
    .toTask()

export const validateLoginTask = (data) =>
  ValidateLogin.ap(validateEmail(data))
    .ap(validatePassword(data))
    .failureMap(mergeAll)
    .toTask()
