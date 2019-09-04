import Cell from './cell';

export default class Board {
    situation: Cell[][]

    constructor(cellLength: number) {
        this.situation = this.createBoard(cellLength);

        const centerCellPoint = cellLength / 2;

        this.setStoneBlack(centerCellPoint - 0, centerCellPoint - 0);
        this.setStoneBlack(centerCellPoint - 1, centerCellPoint - 1);
        this.setStoneWhite(centerCellPoint - 1, centerCellPoint - 0);
        this.setStoneWhite(centerCellPoint - 0, centerCellPoint - 1);

        this.printSituation();
    }

    private createBoard(cellLength: number) {
        const situation: Cell[][] = [];

        for (let i = 0; i < cellLength; i++) {
            const row: Cell[] = [];

            for (let j = 0; j < cellLength; j++) {
                const cell = new Cell();
                row.push(cell);
            }

            situation.push(row);
        }

        return situation;
    }

    printSituation() {
        const cellLength: number = this.situation.length;
        let result: string = '';
        for (let i = 0; i < cellLength; i++) {
            const y: number = i;

            for (let j = 0; j < cellLength; j++) {
                const x: number = j;
                const cell: Cell = this.getCell(x, y)

                result += cell.printStatus();
            }

            result += '\n';
        }

        console.log(result);
    }

    getCell(x: number, y: number) {
        return this.situation[y][x];
    }

    setStoneWhite(x: number, y: number) {
        const cell: Cell = this.getCell(x, y);
        cell.putStoneWhite();
    }

    setStoneBlack(x: number, y: number) {
        const cell: Cell = this.getCell(x, y);
        cell.putStoneBlack();
    }
}