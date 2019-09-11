import './css/styles.scss';
import Othello from './js/othello';

const $app: JQuery<HTMLElement> = $('#app');
const ottello: Othello = new Othello($app, 8);