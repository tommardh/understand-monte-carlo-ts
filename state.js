define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class State {
        constructor(view) {
            this.view = view;
            // this.action =
        }
        render(data) {
            this.representation(data);
            this.nextAction(data);
        }
        ready(data) {
            return true;
        }
        representation(data) {
            let representation = "oops... something went wrong, the system is in an invalid state";
            if (this.ready(data)) {
                representation = this.view.ready(data);
            }
            // console.log(representation);
            this.view.display(representation);
        }
        nextAction(data) {
            if (data.counter === 10) {
                if (data.nextSimulation.reduce((a, b) => (a + b), 0) === 0) {
                    this.action.generate(1);
                    this.action.addManualSimulation();
                }
            }
        }
    }
    exports.State = State;
});
//# sourceMappingURL=state.js.map