
export const validatePhoneNumber = (phoneNumber) => {
  if (phoneNumber.length === 0) {
    return t('validation.phoneNumberIsEmpty')
  } else if (phoneNumber[0] === '0') {
    return t('validation.phoneNumberBeginWithZero')
  } else if (phoneNumber.length < 8) {
    return t('validation.phoneNumberMin')
  } else if (phoneNumber.length > 13) {
    return t('validation.phoneNumberMax')
  }
  return true
}

export const validateInputPhoneNumber = (evt) => {
  const regex = /^[0-9]+$/
  if (evt.key.match(regex)) {
    return true
  } else {
    evt.preventDefault()
  }
}

export const validateOnPastePhoneNumber = (evt) => {
  const regex = /[^0-9]/g
  const textCopyPaste = evt.clipboardData.getData('text/plain')
  if (textCopyPaste) {
    return textCopyPaste.replace(regex, '')
  }
}

export const validatePassword = (password) => {
  const hasOneDigitRegex = /[0-9]+/
  const hasOneCapitalLetterRegex = /[A-Z]+/

  if (password.length === 0) {
    return t('validation.passwordIsEmpty')
  } else if (password.length < 8) {
    return t('validation.passwordMin')
  } else if (!hasOneCapitalLetterRegex.test(password)) {
    return t('validation.passwordHasOneCapitalLetterAtleast')
  } else if (!hasOneDigitRegex.test(password)) {
    return t('validation.passwordHasOneDigitAtleast')
  }
  return true
}

export const validateConfirmPassword = (password, confirmation) => {
  if (confirmation.length === 0) {
    return t('validation.passwordConfirmationIsEmpty')
  } else if (password !== confirmation) {
    return t('validation.passwordConfirmationInvalid')
  }
  return true
}

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (email.length === 0) {
    // return t('validation.emailIsEmpty')
    return 'Mohon isi email Anda'
  } else if (!regex.test(email)) {
    return 'mail tidak valid'  }
  return true
}

export const validateInputEmail = (evt) => {
  const regex = /^[0-9A-Za-z._@]+$/
  if (evt.key.match(regex)) {
    return true
  } else {
    evt.preventDefault()
  }
}

export const validateOnPasteEmail = (evt) => {
  const regex = /[^0-9A-Za-z._@]/g
  const textCopyPaste = evt.clipboardData.getData('text/plain')
  if (textCopyPaste) {
    return textCopyPaste.replace(regex, '')
  }
}

export const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9_.]+$/
  if (username.length === 0) {
    return t('validation.usernameIsEmpty')
  } else if (!regex.test(username)) {
    return t('validation.usernameInvalid')
  } else if (username.length > 35) {
    return t('validation.usernameMaxLength')
  }
  return true
}

export const validateInputUsername = (evt) => {
  const regex = /^[a-zA-Z0-9_.]+$/
  if (evt.key.match(regex)) {
    return true
  } else {
    evt.preventDefault()
  }
}

export const validateOnPasteUsername = (evt) => {
  const regex = /[^0-9a-zA-Z._]/g
  const textCopyPaste = evt.clipboardData.getData('text/plain')
  if (textCopyPaste) {
    return textCopyPaste.replace(regex, '').toLowerCase()
  }
}

export const validateInputCharacter = (evt) => {
  const regex = /^[a-zA-Z0-9_.\s]+$/
  if (evt.key.match(regex)) {
    return true
  } else {
    evt.preventDefault()
  }
}

export const validateInputNoSpace = (evt) => {
  const regexp = /^\S*$/
  if (evt.key.match(regexp)) {
    return true
  } else {
    evt.preventDefault()
  }
}

export const validateInputPin = (evt) => {
  const regex = /^[0-9]+$/
  if (evt.key.match(regex) || evt.keyCode === 8) {
    return true
  } else {
    evt.preventDefault()
  }
}

export const validateString = (string) => {
  if (string.length === 0) {
    return t('auth.cannotBeEmpty')
  }
  return true
}
