export default class Othello {
    board: string[][]
    constructor(cellLength: number) {
        this.board = this.createBoard(cellLength);
        console.log(this.board);
    }

    createBoard(cellLength: number) {
        const board: string[][] = [];
        for (let i = 0; i < cellLength; i++) {
            const row: string[] = [];

            for (let j = 0; j < cellLength; j++) {
                row.push('EMPTY');
            }

            board.push(row);
        }

        return board;
    }
}