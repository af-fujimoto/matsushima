interface around {
    top?: Cell,
    leftTop?: Cell,
    left?: Cell,
    leftBottom?: Cell,
    bottom?: Cell,
    rightBottom?: Cell,
    right?: Cell,
    rightTop?: Cell
}

export default class Cell {
    status: string;
    whitePuttable: boolean;
    blackPuttable: boolean;
    private _aroundCells: around;
    private _hasStone: boolean;

    constructor() {
        this.status = 'EMPTY';
        this.whitePuttable = false;
        this.blackPuttable = false;
        this._aroundCells = {};
        this._hasStone = false;
    }

    get hasStone() {
        return this._hasStone;
    }

    updatePuttable(color: string) {
        const aroundKeys: keyof around[] = Object.keys(this._aroundCells);
        aroundKeys.forEach(key => {
            if (this[key].hasStone) {
            }
        }, this._aroundCells);
    }

    set aroundCells(aroundeCells: around) {
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
            return 'X';
        } else {
            return this.status === 'WHITE' ? 'W' : 'B';
        }
    }

    private setStone(color: string) {
        this.status = color;
        this._hasStone = true;
    }
}