import './interface/around_cells_interface'

export default class Cell {
    private _status: stoneStatus;
    private _puttable: boolean;
    private _aroundCells: aroundCells<Cell>;
    private _directionKeys: directionKeys;
    private _reversibleCells: Cell[];
    private _hasStone: boolean;

    constructor(stoneColor?: stoneStatus) {
        this._status = stoneColor ? stoneColor: 'EMPTY';
        this._puttable = false;
        this._aroundCells = {};
        this._directionKeys = ['top', 'rightTop', 'right', 'rightBottom', 'bottom', 'leftBottom', 'left', 'leftTop'];
        this._reversibleCells = [];
        this._hasStone = stoneColor !== undefined;
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

    set aroundCells(aroundeCells: aroundCells<Cell>) {
        this._aroundCells = aroundeCells;
    }

    get directionKeys() {
        return this._directionKeys;
    }

    get reversibleCells() {
        return this._reversibleCells;
    }

    updatePuttable(color: stoneStatus): boolean {
        for (let i = 0; i < this._directionKeys.length; i++) {
            const directionKey = this._directionKeys[i];
            this.updateReversibleCells(color, directionKey);
        }

        this._puttable = this.reversibleCells.length > 0;
        return this._puttable;
    }

    updateReversibleCells(color: stoneStatus, direction: directionKey, startCell?: Cell, baseCell?: Cell, reversibleCells?: Cell[]): boolean {
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

    resetPuttable() {
        this._reversibleCells = [];
        this._puttable = false;
    }

    setStone(color: stoneStatus) {
        this._status = color;
        this._hasStone = true;
        this._puttable = false;
    }

    printStatus() {
        if (this._status === 'EMPTY') {
            return this._puttable ? 'O' : 'X';
        } else {
            return this._status === 'WHITE' ? 'W' : 'B';
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

    reversibleStone() {
        if (this._status === 'WHITE') {
            this._status = 'BLACK';
        } else if (this._status === 'BLACK') {
            this._status = 'WHITE';
        }

    }
}