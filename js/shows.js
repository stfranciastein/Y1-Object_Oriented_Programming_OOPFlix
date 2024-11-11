import Show from './classes/Show.js';
import ShowListItem from './components/ShowListItem.js';
import ShowDetail from './components/ShowDetail.js';
import { initialiseList } from './initialiser.js';

initialiseList(Show, ShowListItem, ShowDetail);