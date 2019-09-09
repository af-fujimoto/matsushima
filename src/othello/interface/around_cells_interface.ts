interface aroundCells<C> {
    top?: C,
    leftTop?: C,
    left?: C,
    leftBottom?: C,
    bottom?: C,
    rightBottom?: C,
    right?: C,
    rightTop?: C
}
type stoneStatus = 'WHITE' | 'BLACK' | 'EMPTY';
type directionKey = keyof aroundCells<any>;
type directionKeys = directionKey[];