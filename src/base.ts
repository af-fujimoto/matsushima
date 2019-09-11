type triggerFnc = (...args: any[]) => void;
interface base {
    listenTo: (target: base, triggerName: string, fnc: triggerFnc) => void;
    trigger: (key: string, ...args: any[]) => void;
    addTrigger: (key: string, fnc: triggerFnc) => void;
}

export default abstract class Base implements base {
    private _triggerList: {
        [key: string]: triggerFnc | undefined;
    };
    constructor() {
        this._triggerList = {};
    }
    listenTo(target: base, triggerName: string, fnc: triggerFnc): void {
        target.addTrigger(triggerName, fnc.bind(this));
    }
    trigger(key: string, ...args: any[]) {
        const triggerFnc = this._triggerList[key];

        if (triggerFnc) {
            triggerFnc(...args);
        }
    }
    addTrigger(key: string, fnc: triggerFnc) {
        this._triggerList[key] = fnc;
    }
}