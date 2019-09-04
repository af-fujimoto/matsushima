interface around {
    top?: Cell,
    leftTop?: Cell,
    left?: Cell,
    leftBottom?: Cell,
    botom?: Cell,
    RightBottom?: Cell,
    right?: Cell,
    rightTop?: Cell
}

export default class Cell {
    status: string;
    whitePuttable: boolean;
    blackPuttable: boolean;
    aroundCells: around;

    constructor() {
        this.status = 'EMPTY';
        this.whitePuttable = false;
        this.blackPuttable = false;
        this.aroundCells = {};
    }

    setAroundCells(aroundeCells: around) {
        this.aroundCells = aroundeCells;
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
    }
}