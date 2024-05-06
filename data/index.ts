import { Entry } from './types'
import fil from './entries/فِعْل.json'
import idafa from './entries/إِضَافَة.json'
import ism from './entries/اسْم.json'
import mudaf from './entries/مُضَاف.json'
import mudafIlaih from './entries/مُضَاف إِلَيْهِ.json'

const dictionary: Entry[] = [ism, fil, idafa, mudaf, mudafIlaih]

export default dictionary
