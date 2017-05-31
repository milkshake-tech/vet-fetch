import constants from '../constants/constants'
import store from '../../stores/store'

export const capturePetSurvey = (petProfile) => ({
	type: constants.CAPTURE_PET_SURVEY,
	petProfile
})
