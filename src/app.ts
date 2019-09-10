import jquery = require("jquery");
import Othello from './othello';

const $: JQueryStatic = jquery;

const $app: JQuery<HTMLElement> = $('#app');
const ottello: Othello = new Othello($app, 8);