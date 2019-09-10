export default class Stone {
    private _isBlack: boolean;

    constructor(color: stoneColor) {
        this._isBlack = color === 'BLACK';
    }

    color(): stoneColor {
        return this._isBlack ? 'BLACK' : 'WHITE';
    }

    reverse() {
        this._isBlack = !this._isBlack;
    }
}