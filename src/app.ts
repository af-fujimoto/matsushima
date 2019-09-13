import './css/styles.scss';
import Othello from './js/othello';

const $app: JQuery<HTMLElement> = $('#app');
const othello = new Othello(8);
othello.render($app);
