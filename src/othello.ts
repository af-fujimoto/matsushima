import './othello/types/othello_types'
import Board from './othello/board';

export default class Othello {
    private _board: Board;

    constructor(cellLength: number) {
        this._board = new Board(cellLength);
        console.log(this.board);
    }

    get board() {
        return this._board.situation;
    }
}