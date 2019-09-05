import Cell from './cell';

export default class Board {
    private _situation: Cell[][];
    private _cellLength: number;

    constructor(cellLength: number) {
        this._cellLength = cellLength;
        this._situation = this.createBoard(this._cellLength);

        this.initializeBoard(this._cellLength);

        this.printSituation();
    }

    initializeBoard(cellLength: number) {
        const centerCellPoint: number = this._cellLength / 2;

        this.setStoneBlack(centerCellPoint - 0, centerCellPoint - 0);
        this.setStoneBlack(centerCellPoint - 1, centerCellPoint - 1);
        this.setStoneWhite(centerCellPoint - 1, centerCellPoint - 0);
        this.setStoneWhite(centerCellPoint - 0, centerCellPoint - 1);

        this.setAroundCellsStatus();
        this.eachCell((cell) => {
            if (cell.hasStone) {
                cell.updatePuttable('WHITE');
                console.log(cell.hasStone)
            }
        });
    }

    get situation() {
        return this._situation;
    }

    setAroundCellsStatus() {
        const aroundCells: {
            top?: Cell,
            leftTop?: Cell,
            left?: Cell,
            leftBottom?: Cell,
            bottom?: Cell,
            rightBottom?: Cell,
            right?: Cell,
            rightTop?: Cell
        } = {};

        this.eachCell((cell: Cell, x: number, y: number) => {
            aroundCells.top         = this.getCell(x - 0, y - 1);
            aroundCells.leftTop     = this.getCell(x + 1, y - 1);
            aroundCells.left        = this.getCell(x - 1, y - 0);
            aroundCells.leftBottom  = this.getCell(x + 1, y + 1);
            aroundCells.bottom      = this.getCell(x - 0, y + 1);
            aroundCells.rightBottom = this.getCell(x - 1, y + 1);
            aroundCells.right       = this.getCell(x - 1, y - 0);
            aroundCells.rightTop    = this.getCell(x - 1, y - 1);

            cell.aroundCells = aroundCells;
        })
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
        const length: number = this._cellLength;
        let result: string = '';

        this.eachCell((cell, x) => {
            result += cell.printStatus();
            if (x + 1 === length) {
                result += '\n';
            }
        });

        console.log(result);
    }

    eachCell(callback: (cell: Cell, x: number, y: number) => any) {
        const length: number = this._cellLength;

        for (let y = 0; y < length; y++) {
            for (let x = 0; x < length; x++) {
                const cell: Cell | undefined = this.getCell(x, y)

                if (cell) {
                    callback(cell, x, y);
                }
            }
        }
    }

    mapCell(callback: (cell: Cell, x: number, y: number) => any): any[] {
        const result: any[] = [];

        this.eachCell((cell, x, y) => {
            result.push(callback(cell, x, y));
        });

        return result;
    }

    getCell(x: number, y: number): Cell | undefined {
        const max: number = this._cellLength - 1;
        const min: number = 0;

        if (max >= x && x >= min && max >= y && y >= min) {
            return this._situation[y][x];
        } else {
            return undefined;
        }
    }

    setStoneWhite(x: number, y: number) {
        const cell: Cell | undefined = this.getCell(x, y);

        if (cell) {
            cell.putStoneWhite();
        }
    }

    setStoneBlack(x: number, y: number) {
        const cell: Cell | undefined = this.getCell(x, y);

        if (cell) {
            cell.putStoneBlack();
        }
    }
}