import Stone from './stone';

export default class Cell {
    private _puttable: boolean;
    private _aroundCells: aroundCells<Cell>;
    private _directionKeys: directionKeys;
    private _reversibleCells: Cell[];
    private _stone: Stone | undefined;

    constructor(stoneColor?: stoneColor) {
        this._stone = stoneColor ? new Stone(stoneColor) : undefined;
        this._puttable = false;
        this._aroundCells = {};
        this._directionKeys = ['top', 'rightTop', 'right', 'rightBottom', 'bottom', 'leftBottom', 'left', 'leftTop'];
        this._reversibleCells = [];
    }

    hasStone(): boolean {
        return this._stone !== undefined;
    }

    status(): (stoneColor | undefined) {
        return this._stone ? this._stone.color() : undefined;
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

    updatePuttable(color: stoneColor): boolean {
        for (let i = 0; i < this._directionKeys.length; i++) {
            const directionKey = this._directionKeys[i];
            this.updateReversibleCells(color, directionKey);
        }

        this._puttable = this.reversibleCells.length > 0;
        return this._puttable;
    }

    updateReversibleCells(color: stoneColor, direction: directionKey, startCell?: Cell, baseCell?: Cell, reversibleCells?: Cell[]) {
        const _startCell: Cell = startCell ? startCell : this;
        const _baseCell: Cell = baseCell ? baseCell : this;
        const targetCell: Cell | undefined = _baseCell._aroundCells[direction];
        const _reversibleCells: Cell[] = reversibleCells && reversibleCells.length > 0 ? reversibleCells : [];

        if (targetCell && targetCell.hasStone()) {
            if (targetCell.status() !== color) {
                _reversibleCells.push(targetCell);
                this.updateReversibleCells(color, direction, _startCell, targetCell, _reversibleCells);
            } else if (targetCell.status() === color) {
                if (_reversibleCells.length > 0) {
                    _startCell.addReversibleCells(_reversibleCells);
                }
            }
        }
    }

    addReversibleCells(cells: Cell[]) {
        this._reversibleCells = this._reversibleCells.concat(cells);
    }

    resetPuttable() {
        this._reversibleCells = [];
        this._puttable = false;
    }

    setStone(color: stoneColor) {
        if (!this._stone) {
            this._stone = new Stone(color)
            this._puttable = false;
        }
    }

    printStatus() {
        if (this.hasStone()) {
            return this.status() === 'BLACK' ? 'B' : 'W';
        } else {
            return this._puttable ? 'O' : 'X';
        }
    }

    isRelatedHasStoneCell(): boolean {
        if (this.hasStone()) {
            return false;
        }

        this.resetPuttable();

        const cells: Cell[] = Object.values(this._aroundCells);
        let result: boolean = false;

        for (let i = 0; i < cells.length; i++) {
            const cell: Cell = cells[i];

            if (cell && cell.hasStone()) {
                result = true;
                break;
            }
        }

        return result;
    }

    reverseStone() {
        if (this._stone) {
            this._stone.reverse();
        }
    }
}