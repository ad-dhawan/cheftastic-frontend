import { Dimensions } from "react-native"
const {width, height} = Dimensions.get('screen')

//FONT FAMILY
export const APP_TITLE = 'The-Delicate'
export const EXTRA_BOLD = 'Lato-Black' //900
export const EXTRA_BOLD_ITALIC = 'Lato-BlackItalic' //900
export const BOLD = 'Lato-Bold' //700
export const BOLD_ITALIC = 'Lato-BoldItalic' //700
export const REGULAR = 'Lato-Regular' //400
export const REGULAR_ITALIC = 'Lato-RegularItalic' //400
export const THIN = 'Lato-Thin' //100
export const THIN_ITALIC = 'Lato-ThinItalic' //100

//MEAL
export const FEED_MEAL_IMAGE_HEIGHT = height / 3
export const FEED_ITEM_RADIUS = 12
export const FEED_MEAL_IMAGE_WIDTH = '100%'
export const MEAL_DETAILS_CONTAINER_HEIGHT = FEED_MEAL_IMAGE_HEIGHT / 3.2
export const CAROUSEL_CONTENT_HEIGHT = height / 4
export const CAROUSEL_CONTENT_WIDTH = width - 30
export const NOTIFICATION_LIKE_HEIGHT = 60
export const NOTIFICATION_LIKE_RADIUS = 8