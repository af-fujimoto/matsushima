import './interface/around_cells_interface'

export default class Cell {
    private _status: string;
    private _puttable: boolean;
    private _aroundCells: aroundCells<Cell | undefined>;
    private _reversibleCells: Cell[];
    private _hasStone: boolean;

    constructor() {
        this._status = 'EMPTY';
        this._puttable = false;
        this._aroundCells = {};
        this._reversibleCells = [];
        this._hasStone = false;
    }

    get hasStone() {
        return this._hasStone;
    }

    get status() {
        return this._status;
    }

    get puttable() {
        return this._puttable;
    }

    get reversibleCells() {
        return this._reversibleCells;
    }

    updatePuttable(color: string): boolean {
        this.updateReversibleCells(color, 'top');
        this.updateReversibleCells(color, 'leftTop');
        this.updateReversibleCells(color, 'left');
        this.updateReversibleCells(color, 'leftBottom');
        this.updateReversibleCells(color, 'bottom');
        this.updateReversibleCells(color, 'rightBottom');
        this.updateReversibleCells(color, 'right');
        this.updateReversibleCells(color, 'rightTop');
        this._puttable = this.reversibleCells.length > 0;
        return this._puttable;
    }

    updateReversibleCells(color: string, direction: keyof aroundCells<Cell>, startCell?: Cell, baseCell?: Cell, reversibleCells?: Cell[]): boolean {
        const _startCell: Cell = startCell ? startCell : this;
        const _baseCell: Cell = baseCell ? baseCell : this;
        const targetCell: Cell | undefined = _baseCell._aroundCells[direction];
        const _reversibleCells: Cell[] = reversibleCells && reversibleCells.length > 0 ? reversibleCells : [];

        if (targetCell) {
            if (targetCell._status !== color && targetCell._status !== 'EMPTY') {
                _reversibleCells.push(targetCell);
                this.updateReversibleCells(color, direction, _startCell, targetCell, _reversibleCells);
            } else if (targetCell.status === color) {
                _startCell.addReversibleCells(_reversibleCells);
                return true;
            }
        }
        return false;
    }

    addReversibleCells(cells: Cell[]) {
        this._reversibleCells = this._reversibleCells.concat(cells);
    }

    set aroundCells(aroundeCells: aroundCells<Cell>) {
        this._aroundCells = aroundeCells;
    }

    putStoneWhite() {
        this.setStone('WHITE');
    }

    putStoneBlack() {
        this.setStone('BLACK');
    }

    printStatus() {
        if (this.status === 'EMPTY') {
            return this._puttable ? 'O' : 'X';
        } else {
            return this.status === 'WHITE' ? 'W' : 'B';
        }
    }

    isRelatedHasStoneCell(): boolean {
        const cells: Cell[] = Object.values(this._aroundCells);
        let result: boolean = false;

        for (let i = 0; i < cells.length; i++) {
            const cell: Cell = cells[i];

            if (cell && cell.hasStone) {
                result = true;
                break;
            }
        }

        return result;
    }

    private setStone(color: string) {
        this._status = color;
        this._hasStone = true;
        this._puttable = false;
    }

    reversibleStone() {
        if (this._status = 'WHITE') {
            this._status = 'BLACK';
        } else if (this._status = 'BLACK') {
            this._status = 'WHITE';
        }

    }
}