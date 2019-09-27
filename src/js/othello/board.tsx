import * as React from 'react';
import Cell from './cell';

interface BoardProps {
  cellLength: number,
  turnCount: number,
  turnColor: stoneColor,
  onUpdateSituation: (count: countData) => void,
  onInitialize: (count: countData) => void,
}
interface BoardState {
  situation: situation,
  currentReverseTargetList: cellPos[];
}

export default class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);

    const {turnColor, cellLength, onInitialize} = props;
    const situation = this.createSituation(cellLength, turnColor);

    this.state = {situation, currentReverseTargetList: []};

    onInitialize(this.getCount());

    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleCellMouseEnter = this.handleCellMouseEnter.bind(this);
    this.handleCellMouseLeave = this.handleCellMouseLeave.bind(this);
  }

  createSituation(cellLength: number, turnColor: stoneColor): situation {
    const situation: situation = [];
    const centerIndex: number = cellLength / 2;

    for (let y = 0; y < cellLength; y++) {
      const row: cellData[] = [];

      for (let x = 0; x < cellLength; x++) {
        let status: stoneStatus = 'EMPTY';

        if (
          (x === centerIndex || x === centerIndex - 1) &&
          (y === centerIndex || y === centerIndex - 1)
        ) {
          if (x === y) {
            status = 'WHITE';
          } else {
            status = 'BLACK';
          }
        }

        const cellData: cellData = {
          status,
          position: {x, y},
          reversibleList: [],
          reverceTriggerCells: [],
        };

        row.push(cellData);
      }

      situation.push(row);
    }

    this.updateReversibleList(turnColor, situation);

    return situation;
  }

  getCount(situation: situation = this.state.situation): countData {
    const count = {
      EMPTY: 0,
      BLACK: 0,
      WHITE: 0,
    };

    this.cellsIterator(({status}) => {
      count[status] += 1;
    }, situation);

    return count;
  }

  getCell(cellPos: cellPos, situation: situation = this.state.situation): cellData | undefined {
    const {x, y} = cellPos;
    const max = this.props.cellLength - 1;
    const min = 0;
    if (
      min <= x && x <= max &&
      min <= y && y <= max
    ) {
      return situation[y][x];
    } else {
      return undefined;
    }
  }

  updateReversibleList(color: stoneColor, situation = this.state.situation): situation {
    this.eachCells((cellData): cellData => {
      if (cellData.status === 'EMPTY') {
        cellData.reversibleList = this.updateCellReversibleList(color, cellData, situation);
      } else {
        cellData.reversibleList = [];
      }

      return cellData;
    }, situation);

    this.updateReverceTriggerCells(situation);

    return situation;
  }

  updateReverceTriggerCells(situation: situation = this.state.situation) {
    this.cellsIterator(({position, reversibleList}) => {
      for (const idx in reversibleList) {
        if (reversibleList.hasOwnProperty(idx)) {
          const reversibleCellPos = reversibleList[idx];
          const targetCell = this.getCell(reversibleCellPos, situation);

          if (targetCell) {
            const {reverceTriggerCells} = targetCell;
            this.setCellData(targetCell, {reverceTriggerCells: [position, ...reverceTriggerCells]}, situation);
          }
        }
      }
    }, situation);
  }

  updateCellReversibleList(color: stoneColor, cellData: cellData, situation: situation = this.state.situation): cellPos[] {
    const cellReversibleList: cellPos[] = [];

    this.mapAroundCells(cellData.position, (cellData, direction): cellPos[] => {
      const result = this.findEndPointDirectionCells(color, cellData, direction, situation);
      cellReversibleList.push(...result);

      return result;
    }, situation);

    return cellReversibleList;
  }

  findEndPointDirectionCells(
    color: stoneColor,
    cellData: cellData,
    direction: movePoint,
    situation: situation = this.state.situation,
    resultList: cellPos[] = [],
  ): cellPos[] {
    const {status, position} = cellData;

    if (status === 'EMPTY') {
      return [];
    } else if (status === color) {
      return resultList.length > 0 ? resultList : [];
    } else if (status !== color) {
      resultList.push(position);

      let {x, y} = position;
      const {moveX, moveY} = direction;

      x += moveX;
      y += moveY;

      const nextCellData = this.getCell({x, y}, situation);

      if (nextCellData) {
        resultList = this.findEndPointDirectionCells(color, nextCellData, direction, situation, resultList);
      } else {
        resultList = [];
      }
    }

    return resultList;
  }

  cellsIterator(callback: (cellData: cellData) => any, situation: situation = this.state.situation): void {
    const {cellLength} = this.props;

    for (let y = 0; y < cellLength; y++) {
      for (let x = 0; x < cellLength; x++) {
        const cellData = this.getCell({x, y}, situation);

        if (cellData) {
          callback(cellData);
        }
      }
    }
  }

  eachCells(callback: (cellData: cellData) => cellData, situation: situation = this.state.situation): void {
    this.cellsIterator((cellData) => {
      const {x, y} = cellData.position;
      situation[y][x] = callback(cellData);
    }, situation);
  }

  mapCells(callback: (cellData: cellData) => any, situation: situation = this.state.situation): any[][] {
    const result: any[][] = [];

    this.cellsIterator((cellData) => {
      const {position} = cellData;
      if (result[position.y] === undefined) {
        result.push([]);
      }

      result[position.y].push(callback(cellData));
    }, situation);

    return result;
  }

  mapAroundCells(
    cellPos: cellPos,
    callback: (
      cellData: cellData,
      movePoint: movePoint,
    ) => any,
    situation: situation = this.state.situation,
  ): any[] {
    const {x, y} = cellPos;
    const movePoints: number[] = [0, 1, -1];
    const result: any[] = [];

    for (const keyH in movePoints) {
      if (movePoints.hasOwnProperty(keyH)) {
        for (const keyV in movePoints) {
          if (movePoints.hasOwnProperty(keyV)) {
            const moveX = movePoints[keyH];
            const moveY = movePoints[keyV];
            const targetPos: cellPos = {
              x: x + moveX,
              y: y + moveY,
            };
            const targetCellData = this.getCell(targetPos, situation);

            if (targetCellData) {
              result.push(
                callback(
                  targetCellData,
                  {moveX, moveY}
                ));
            }
          }
        }
      }
    }

    return result;
  }

  setCellData(
    cellData: cellData,
    newCellData: {
      status?: stoneStatus,
      position?: cellPos,
      reversibleList?: cellPos[],
      reverceTriggerCells?: cellPos[],
    },
    situation: situation,
  ): void {
    const {position} = cellData;
    let targetCell = this.getCell(position, situation);

    if (targetCell) {
      targetCell = Object.assign(targetCell, newCellData);
      situation[position.y][position.x] = targetCell;
    }
  }

  setStone(cellPos: cellPos, color: stoneColor) {
    const cell = this.getCell(cellPos);

    if (cell) {
      const situation = this.state.situation.slice();
      const reversibleList = cell.reversibleList;

      this.setCellData(cell, {status: color}, situation);

      for (const idx in reversibleList) {
        if (reversibleList.hasOwnProperty(idx)) {
          const reverseCell = this.getCell(reversibleList[idx]);
          if (reverseCell) {
            this.setCellData(reverseCell, {status: color}, situation);
          }
        }
      }

      this.setState({
        situation,
        currentReverseTargetList: [],
      });
    }
  }

  handleCellClick(puttable: boolean, cellPos: cellPos): void {
    if (puttable) {
      this.setStone(cellPos, this.props.turnColor);
      this.props.onUpdateSituation(this.getCount());
    }
  }

  handleCellMouseEnter(cellPos: cellPos) {
    const cell = this.getCell(cellPos);

    if (cell) {
      this.setState({
        currentReverseTargetList: cell.reversibleList,
      });
    }
  }

  handleCellMouseLeave() {
    this.setState({
      currentReverseTargetList: [],
    });
  }

  componentDidUpdate(prevProps: BoardProps) {
    if (prevProps.turnCount !== this.props.turnCount) {
      const {situation} = this.state;
      this.updateReversibleList(this.props.turnColor, situation);
      this.setState({situation});
    }
  }

  render(): JSX.Element {
    const {currentReverseTargetList} = this.state;
    const rowElement: JSX.Element[] = [];
    let existPuttable = false;

    const rows: JSX.Element[][] = this.mapCells(({status, position, reversibleList}) => {
      const isPuttable: boolean = reversibleList.length > 0;
      const isReversileTarget = currentReverseTargetList.includes(position);

      if (!existPuttable && isPuttable) {
        existPuttable = isPuttable;
      }

      return <Cell stoneStatus={status} position={position} puttable={isPuttable} reversibleTarget={isReversileTarget} key={`${position.x}${position.y}`} clickHandler={this.handleCellClick} mouseEnterHandler={this.handleCellMouseEnter} mouseLeaveHandler={this.handleCellMouseLeave} />;
    });

    for (const rowNum in rows) {
      if (rows.hasOwnProperty(rowNum)) {
        const cells: JSX.Element[] = rows[rowNum];
        rowElement.push(
          <ul className={'row'} key={rowNum}>
            {cells}
          </ul>
        );
      }
    }

    return (
      <div id={'board'}>
        {rowElement}
      </div>
    );
  }
}
