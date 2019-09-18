import Base from '../base';

export default class Stone extends Base {
    $el: JQuery<HTMLSpanElement>;

    private _isBlack: boolean;

    constructor($wrap: JQuery<HTMLLIElement>, color: stoneColor) {
        super();
        this.$el = $('<span class="stone" />');
        this._isBlack = color === 'BLACK';

        this.toggleStoneClass();

        $wrap.append(this.$el);
    }

    color(): stoneColor {
        return this._isBlack ? 'BLACK' : 'WHITE';
    }

    reverse() {
        this._isBlack = !this._isBlack;
        this.toggleStoneClass();
    }

    toggleStoneClass() {
        this.$el.toggleClass('stone-black', this._isBlack);
        this.$el.toggleClass('stone-white', !this._isBlack);
    }
}
