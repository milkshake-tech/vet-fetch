import constants from '../constants/constants'
import store from '../../stores/store'

export const receivedUser = (user) => ({
	type: constants.RECEIVED_USER,
	user
})

export const receivedPets = (pets) => ({
	type: constants.RECEIVED_PETS,
	pets
})

export const toggleLoginModal = (toggleState) => ({
	type: constants.TOGGLE_LOGIN_MODAL,
	toggleState
})

export const toggleSignupModal = (toggleState) => ({
	type: constants.TOGGLE_SIGNUP_MODAL,
	toggleState
})
