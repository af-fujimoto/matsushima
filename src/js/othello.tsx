import * as React from 'react';
import './othello/types/othello_types';
import Board from './othello/board';
import Count from './othello/count';

interface OthelloProps {
  cellLength: number,
}
interface OthelloState {
  turnCount: number,
  turnColor: stoneColor,
  count: countData,
}
export default class Othello extends React.Component<OthelloProps, OthelloState> {
  constructor(props: OthelloProps) {
    super(props);

    this.state = {
      turnCount: 0,
      turnColor: 'WHITE',
      count: {
        EMPTY: 0,
        WHITE: 0,
        BLACK: 0,
      },
    };

    this.handleUpdateSituation = this.handleUpdateSituation.bind(this);
    this.handleInitialize = this.handleInitialize.bind(this);
  }

  handleUpdateSituation(count: countData): void {
    let {turnCount, turnColor} = this.state;
    turnCount += 1;
    turnColor = this.state.turnColor === 'WHITE' ? 'BLACK' : 'WHITE';

    this.setState({turnCount, turnColor, count});
  }

  handleInitialize(count: countData): void {
    this.setState({count});
  }

  render(): JSX.Element {
    const {cellLength} = this.props;
    const {turnCount, turnColor, count} = this.state;
    return (
      <div id="othello">
        <Board
          cellLength={cellLength}
          turnCount={turnCount}
          turnColor={turnColor}
          onUpdateSituation={this.handleUpdateSituation}
          onInitialize={this.handleInitialize}
        />
        <Count count={count} />
        <p className="turnCount">{turnCount}</p>
      </div>
    );
  }
}
