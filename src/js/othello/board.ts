import Base from '../base';
import Cell from './cell';

export default class Board extends Base {
  $el: JQuery<HTMLElement>;

  private _situation: Cell[][];

  private _cellLength: number;

  constructor($wrap: JQuery<HTMLElement>, cellLength: number) {
    super();
    this.$el = $('<div id="board">');
    this._cellLength = cellLength;
    this._situation = this.createBoard();
    this.initializeBoard();

    $wrap.append(this.$el);
  }

  initializeBoard() {
    const centerCellPoint: number = this._cellLength / 2;

    this.putStoneWhite(centerCellPoint - 0, centerCellPoint - 0);
    this.putStoneWhite(centerCellPoint - 1, centerCellPoint - 1);
    this.putStoneBlack(centerCellPoint - 1, centerCellPoint - 0);
    this.putStoneBlack(centerCellPoint - 0, centerCellPoint - 1);

    this.setAroundCellsStatus();
  }

  onClickCell(x: number, y: number): void {
    this.trigger('clickCell', x, y);
  }

  updateCellsPuttable(color: stoneColor) {
    this.eachCell((cell) => {
      cell.updatePuttable(color);
    });

    this.printSituation();
  }

  get situation() {
    return this._situation;
  }

  setAroundCellsStatus() {
    this.eachCell((cell: Cell, x: number, y: number) => {
      const aroundCells: aroundCells<Cell> = {};

      aroundCells.top = this.getCell(x - 0, y - 1);
      aroundCells.leftTop = this.getCell(x - 1, y - 1);
      aroundCells.left = this.getCell(x - 1, y - 0);
      aroundCells.leftBottom = this.getCell(x - 1, y + 1);
      aroundCells.bottom = this.getCell(x - 0, y + 1);
      aroundCells.rightBottom = this.getCell(x + 1, y + 1);
      aroundCells.right = this.getCell(x + 1, y - 0);
      aroundCells.rightTop = this.getCell(x + 1, y - 1);

      cell.setAroundCells(aroundCells);
    });
  }

  private createBoard() {
    const situation: Cell[][] = [];

    for (let y = 0; y < this._cellLength; y++) {
      const row: Cell[] = [];
      const $row: JQuery<HTMLUListElement> = $('<ul class="row" />');

      for (let x = 0; x < this._cellLength; x++) {
        const cell = new Cell($row, x, y);
        row.push(cell);

        this.listenTo(cell, 'clickCell', this.onClickCell);
      }

      situation.push(row);
      this.$el.append($row);
    }

    return situation;
  }

  printSituation(): string {
    const length: number = this._cellLength;
    const rangeAry: number[] = [...Array(length)].map((v, k) => k + 1);
    let result: string = `  ${rangeAry.join(' ')}\n`;

    this.eachCell((cell, x, y) => {
      if (x === 0) {
        result += `${y + 1} `;
      }
      result += `${cell.printStatus()} `;
      if (x + 1 === length) {
        result += '\n';
      }
    });

    return result;
  }

  eachCell(callback: (cell: Cell, x: number, y: number) => any) {
    const length: number = this._cellLength;

    for (let y = 0; y < length; y++) {
      for (let x = 0; x < length; x++) {
        const cell: Cell | undefined = this.getCell(x, y);

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
    }
    return undefined;
  }

  putStone(color: stoneColor, x: number, y: number) {
    this.setStone(color, x, y);
  }

  putStoneWhite(x: number, y: number) {
    this.setStone('WHITE', x, y);
  }

  putStoneBlack(x: number, y: number) {
    this.setStone('BLACK', x, y);
  }

  private setStone(color: stoneColor, x: number, y: number) {
    const cell: Cell | undefined = this.getCell(x, y);

    if (cell) {
      cell.setStone(color);
      this.reverseStones(cell);
    }
  }

  reverseStones(cell: Cell) {
    const targetCells: Cell[] = cell.reversibleCells;

    for (let i = 0; i < targetCells.length; i++) {
      const targetCell: Cell = targetCells[i];

      if (targetCell) {
        targetCell.reverseStone();
      }
    }

    this.printSituation();
    // 白黒それぞれの数値管理を後ほど実装。
  }
}
