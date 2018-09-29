define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Model {
        constructor(data, state) {
            this.data = data;
            this.state = state;
        }
        // public present(data: IModel, render: (o: IModel) => string): string {
        present(data) {
            if (data.counter !== undefined) {
                this.data.counter = data.counter;
            }
            if (data.remainingStories) {
                this.data.remainingStories = data.remainingStories;
            }
            if (data.simulations) {
                if (data.simulations.length === 0) {
                    this.data.simulations = [];
                }
                else {
                    this.data.simulations = this.data.simulations.concat(data.simulations); // push(data.simulations[0]);
                }
            }
            if (data.nextSimulation) {
                this.data.nextSimulation = data.nextSimulation;
            }
            if (this.needRender(data)) {
                this.render(this.data);
            }
        }
        needRender(model) {
            let sum;
            if (model.nextSimulation) {
                sum = model.nextSimulation.reduce((a, b) => a + b, 0);
            }
            else {
                sum = 0;
            }
            return sum === 0; // && !model.remainingStories;
        }
        render(data) {
            this.state.render(data);
        }
    }
    exports.Model = Model;
});
//# sourceMappingURL=model.js.map