import * as React from 'react';
import Stone from './stone';

interface cellProps {
  stoneStatus: stoneStatus,
  puttable: boolean,
  reversibleTarget: boolean,
  position: cellPos,
  clickHandler: (puttable: boolean, position: cellPos) => void,
  mouseEnterHandler: (position: cellPos) => void,
  mouseLeaveHandler: () => void,
}

export default function Cell(props: cellProps) {
  const {stoneStatus, puttable, position, reversibleTarget, clickHandler, mouseEnterHandler, mouseLeaveHandler} = props;
  const classNames: string[] = ['cell'];

  if (puttable) {
    classNames.push('is-puttable');
  }
  if (reversibleTarget) {
    classNames.push('is-reversible-target');
  }
  const stone = stoneStatus && stoneStatus !== 'EMPTY' ? <Stone color={stoneStatus} /> : '';

  return (
    <li className={classNames.join(' ')} onMouseEnter={() => mouseEnterHandler(position)} onMouseLeave={mouseLeaveHandler} onClick={() => clickHandler(puttable, position)}>
      {stone}
    </li>
  );
}
