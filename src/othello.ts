import './othello/types/othello_types'
import Board from './othello/board';

export default class Othello {
    private _board: Board;
    $el: JQuery<HTMLElement>;

    constructor($wrap: JQuery<HTMLElement>, cellLength: number) {
        this.$el = $('<div id="othello">');
        this._board = new Board(this.$el, cellLength);

        $wrap.append(this.$el);
    }

    get board() {
        return this._board.situation;
    }
}