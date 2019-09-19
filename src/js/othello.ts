import Base from './base';
import './othello/types/othello_types';
import Board from './othello/board';

export default class Othello extends Base {
  $el: JQuery<HTMLElement>;

  private _board: Board;

  private _turnColor: stoneColor;

  constructor(cellLength: number) {
    super();
    this.$el = $('<div id="othello">');
    this._board = new Board(this.$el, cellLength);
    this._turnColor = 'WHITE';

    this.listenTo(this._board, 'clickCell', this.onClickCell);

    this._board.updateCellsPuttable(this._turnColor);
  }

  render($wrap: JQuery<HTMLElement>) {
    $wrap.append(this.$el);
  }

  get board() {
    return this._board.situation;
  }

  onClickCell(x: number, y: number) {
    this.putStone(x, y);
    this.changePlayer();
  }

  putStone(x: number, y: number) {
    this._board.putStone(this._turnColor, x, y);
  }

  changePlayer() {
    this._turnColor = this._turnColor === 'BLACK' ? 'WHITE' : 'BLACK';
    this._board.updateCellsPuttable(this._turnColor);
  }
}
