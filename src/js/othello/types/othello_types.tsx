type countData = {
  EMPTY: number,
  WHITE: number,
  BLACK: number
}

type stoneColor = 'WHITE' | 'BLACK';
type stoneStatus = stoneColor | 'EMPTY';


type cellPos = {x: number, y: number};
type movePoint = {moveX: number, moveY: number};

type cellData = {
  status: stoneStatus,
  position: cellPos,
  reversibleList: cellPos[],
  reverceTriggerCells: cellPos[]
}
type situation = cellData[][]
