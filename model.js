define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    class Model {
        constructor(data, state) {
            if (this.accept(data)) {
                this.data = data;
                this.state = state;
            }
            else {
                throw ("Wrong initial state");
            }
        }
        present(data) {
            if (this.accept(data)) {
                this.updateModel(data);
                if (this.needRender(data)) {
                    console.log("call render");
                    this.render(this.data);
                }
            }
            else {
                console.log("Proposal NOT accepted!");
            }
        }
        accept(data) {
            return this.initialStateAcceptor(data) ||
                this.resetAcceptor(data) ||
                this.descriptionAcceptor(data) ||
                this.addAcceptor(data) ||
                this.generateAcceptor(data) ||
                this.generateSeveralAcceptor(data) ||
                this.changeRemainingStoriesAcceptor(data);
        }
        updateModel(data) {
            if (data.counter !== undefined) {
                this.data.counter = data.counter;
            }
            if (data.remainingStories) {
                this.data.remainingStories = data.remainingStories;
            }
            if (data.showDescriptions !== undefined) {
                this.data.showDescriptions = data.showDescriptions;
            }
            if (data.simulations) {
                if (data.simulations.length === 0) {
                    this.data.simulations = [];
                }
                else {
                    this.data.simulations = this.data.simulations.concat(data.simulations);
                }
            }
            if (data.calculatedData) {
                if (data.calculatedData.length === 0) {
                    this.data.calculatedData = [];
                }
                else {
                    this.data.calculatedData = this.data.calculatedData.concat(data.calculatedData);
                }
            }
            if (data.nextSimulation) {
                this.data.nextSimulation = data.nextSimulation;
            }
        }
        initialStateAcceptor(data) {
            console.log("check");
            console.log(data);
            return data.counter === 0 &&
                data.remainingStories === 100 &&
                data.activeField === "field01" &&
                data.showDescriptions === true &&
                JSON.stringify(data.nextSimulation) === JSON.stringify([0, 0, 0, 0, 0, 0]) &&
                JSON.stringify(data.historicalCapacity) === JSON.stringify([5, 7, 5, 8, 12, 10]) &&
                JSON.stringify(data.simulations) === JSON.stringify([]) &&
                JSON.stringify(data.calculatedData) === JSON.stringify([]);
        }
        resetAcceptor(data) {
            console.log("check");
            console.log(data);
            return data.counter === 0 &&
                data.remainingStories === undefined &&
                data.activeField === "field01" &&
                data.showDescriptions === true &&
                JSON.stringify(data.nextSimulation) === JSON.stringify([0, 0, 0, 0, 0, 0]) &&
                data.historicalCapacity === undefined &&
                JSON.stringify(data.simulations) === JSON.stringify([]) &&
                JSON.stringify(data.calculatedData) === JSON.stringify([]);
        }
        descriptionAcceptor(data) {
            return data.counter === undefined &&
                data.remainingStories === undefined &&
                data.activeField === undefined &&
                data.showDescriptions !== undefined &&
                data.nextSimulation === undefined &&
                data.historicalCapacity === undefined &&
                JSON.stringify(data.simulations) === undefined &&
                JSON.stringify(data.calculatedData) === undefined;
        }
        addAcceptor(data) {
            const nrSimulations = this.getNumberOfSimulations(data);
            return data.counter === this.data.counter + nrSimulations &&
                data.remainingStories === undefined &&
                data.activeField === undefined &&
                data.showDescriptions === false &&
                JSON.stringify(data.nextSimulation) === JSON.stringify([0, 0, 0, 0, 0, 0]) &&
                data.historicalCapacity === undefined &&
                data.simulations ?
                data.simulations.length === nrSimulations &&
                    this.AllNumbersAreInRange(data.simulations, 0, this.data.historicalCapacity.length) :
                false &&
                    this.acceptCalculatedData(data);
        }
        getNumberOfSimulations(data) {
            return (data ? (data.simulations ? (data.simulations.length ? data.simulations.length : 0) : 0) : 0);
        }
        acceptCalculatedData(data) {
            const nrSimulations = this.getNumberOfSimulations(data);
            return data.calculatedData ?
                data.calculatedData.length === nrSimulations &&
                    this.AllNumbersAreInArray(data.calculatedData, this.data.historicalCapacity) :
                false;
        }
        generateSeveralAcceptor(data) {
            const nrSimulations = (data ? (data.simulations ? (data.simulations.length ? data.simulations.length : 0) : 0) : 0);
            return data.counter === this.data.counter + nrSimulations &&
                data.remainingStories === undefined &&
                data.activeField === undefined &&
                data.showDescriptions === false &&
                data.nextSimulation === undefined &&
                data.historicalCapacity === undefined &&
                data.simulations ?
                data.simulations.length === nrSimulations &&
                    this.AllNumbersAreInRange(data.simulations, 0, this.data.historicalCapacity.length) :
                false &&
                    this.acceptCalculatedData(data);
        }
        generateAcceptor(data) {
            return data.counter === undefined &&
                data.remainingStories === undefined &&
                data.activeField === undefined &&
                data.showDescriptions === undefined &&
                data.nextSimulation ?
                this.AllNumbersAreInRange([data.nextSimulation], 0, this.data.historicalCapacity.length) :
                false &&
                    data.historicalCapacity === undefined &&
                    JSON.stringify(data.simulations) === undefined &&
                    JSON.stringify(data.calculatedData) === undefined;
        }
        changeRemainingStoriesAcceptor(data) {
            return data.counter === undefined &&
                data.remainingStories !== undefined &&
                data.activeField === "field01" &&
                data.showDescriptions === undefined &&
                data.nextSimulation === undefined &&
                data.historicalCapacity === undefined &&
                JSON.stringify(data.simulations) === undefined &&
                JSON.stringify(data.calculatedData) === undefined;
        }
        AllNumbersAreInRange(values, from, to) {
            return values.reduce((outerAccumulator, currentVector) => {
                return outerAccumulator && currentVector.reduce((innerAccumuator, currentValue) => {
                    return innerAccumuator &&
                        currentValue >= from &&
                        currentValue <= to;
                }, true);
            }, true);
        }
        AllNumbersAreInArray(values, allowedValues) {
            return values.reduce((outerAccumulator, currentVector) => {
                return outerAccumulator && currentVector.reduce((innerAccumuator, currentValue) => {
                    return innerAccumuator &&
                        allowedValues.includes(currentValue);
                }, true);
            }, true);
        }
        render(data) {
            this.state.render(data);
        }
        needRender(model) {
            // let sum: number;
            return true;
            // if (model !== undefined && model.nextSimulation !== undefined) {
            //     sum = model.nextSimulation.reduce((a, b) => a + b, 0);
            // } else {
            //     sum = 0;
            // }
            // return sum === 0;
        }
    }
    exports.Model = Model;
});
//# sourceMappingURL=model.js.map