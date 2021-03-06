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
export const FEED_MEAL_IMAGE_HEIGHT = height / 2.5
export const FEED_ITEM_RADIUS = 12
export const FEED_MEAL_IMAGE_WIDTH = '100%'
export const MEAL_DETAILS_CONTAINER_HEIGHT = FEED_MEAL_IMAGE_HEIGHT / 3.8
export const CAROUSEL_CONTENT_HEIGHT = height / 4
export const CAROUSEL_CONTENT_WIDTH = width - 30
export const NOTIFICATION_LIKE_HEIGHT = 60
export const NOTIFICATION_LIKE_RADIUS = 8
export const PROFILE_ITEM_HEIGHT = 300;
export const PROFILE_ITEM_HEIGHT_DIFFERENCE = 100;
export const RECIPE_ITEM_HEIGHT = height * 0.35;
export const RECIPE_ITEM_WIDTH = '100%'
