import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faUser, faLock, faSignOutAlt, faCog, faTh, faDesktop, faUserSecret, faCube, faMagic, faMale, faPencilAlt, faSearch, faCartPlus, faBars, faBullseye, faCheck, faClock, faKey, faBell, faCheckCircle, faClipboardList, faClipboardCheck, faPiggyBank, faQuestionCircle, faInfoCircle, faArchive, faCogs, faWallet, faBookOpen, faPlus, faLink, faUnlink, faBookmark, faTags, faPenNib, faBackspace, faStar, faTimes, faPlusCircle, faPollH, faDollarSign, faPhotoVideo, faCheckDouble, faFilter, faComment, faCircle, faMinus, faLanguage, faPlayCircle, faSchool, faArrowLeft, faArrowRight, faCalendarAlt, faShoppingCart, faHistory, faPlay, faPencilRuler, faLaptopCode, faChartBar, faCoins, faTv, faBook, faDog, faCamera, faMusic, faAtom
} from '@fortawesome/free-solid-svg-icons'

import {
  faEnvelope, faEdit, faThumbsUp, faThumbsDown
} from '@fortawesome/free-regular-svg-icons'

import {
  faGithub, faCss3Alt, faGooglePlusSquare, faFacebookSquare, faGoogle, faFacebookMessenger, faInstagram, faPinterest, faTwitterSquare, faYoutubeSquare
} from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

library.add(
  faUser, faLock, faSignOutAlt, faCog, faGithub, faTh, faDesktop, faCss3Alt, faUserSecret, faCube, faMagic, faMale,
  faPencilAlt, faSearch, faCartPlus, faBars, faBullseye, faCheck, faClock, faEnvelope, faKey, faUser, faGooglePlusSquare,
  faFacebookSquare, faGoogle, faStar, faBell, faCheckCircle, faFacebookMessenger, faClipboardCheck, faClipboardList,
  faClock, faPiggyBank, faInstagram, faPinterest, faTwitterSquare, faQuestionCircle, faInfoCircle, faArchive, faCogs, faWallet, faBookOpen, faPlus, faLink, faUnlink, faBookmark, faStar, faTags, faPenNib, faBackspace, faTimes, faPlusCircle, faPollH, faDollarSign, faPhotoVideo, faCheckDouble,
  faFilter, faComment, faCircle, faYoutubeSquare, faMinus, faLanguage, faPlayCircle, faTh, faEdit, faSchool, faArrowLeft, faArrowRight, faCalendarAlt, faShoppingCart, faHistory, faPlay, faThumbsUp, faThumbsDown, faPencilRuler, faLaptopCode, faChartBar, faCoins, faTv, faBook, faDog, faCamera, faMusic, faAtom
)

Vue.component('fa', FontAwesomeIcon)
