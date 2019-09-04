import Board from './othello/board';

export default class Othello {
    board: Board;

    constructor(cellLength: number) {
        this.board = new Board(cellLength);
    }
}