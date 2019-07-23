import { State } from "./state";

export class Model {

    public data: IModel;
    public state: State;

    constructor(data: IModel, state: State) {
        if (this.accept(data)) {
            this.data = data;
            this.state = state;
        } else {
            throw("Wrong initial state");
        }
    }

    public present(data: IProposal) {
        if (this.accept(data)) {
            this.updateModel(data)
        if (this.needRender(data)) {
            console.log("call render");
            this.render(this.data);
        }
        } else {
            console.log("Proposal NOT accepted!");
        }
    }

    private accept(data: IProposal) {
        return this.initialStateAcceptor(data) ||
            this.resetAcceptor(data) ||
            this.descriptionAcceptor(data) ||
            this.addAcceptor(data) ||
            this.generateAcceptor(data) ||
            this.generateSeveralAcceptor(data) ||
            this.changeRemainingStoriesAcceptor(data);
    }

    private updateModel(data: IProposal) {
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
            } else {
                this.data.simulations = this.data.simulations.concat(data.simulations);
            }
        }
        if (data.calculatedData) {
            if (data.calculatedData.length === 0) {
                this.data.calculatedData = [];
            } else {
                this.data.calculatedData = this.data.calculatedData.concat(data.calculatedData);
            }
        }
        if (data.nextSimulation) {
            this.data.nextSimulation = data.nextSimulation;
        }
    }

    private initialStateAcceptor(data: IProposal) {
        console.log("check");
        console.log(data);

        return data.counter === 0 &&
            data.remainingStories === 100 &&
            data.activeField === "field01" &&
            data.showDescriptions === true &&
            JSON.stringify(data.nextSimulation) === JSON.stringify([0, 0, 0, 0, 0, 0]) &&
            JSON.stringify(data.historicalCapacity) === JSON.stringify([5, 7, 5, 8, 12, 10]) &&
            JSON.stringify(data.simulations) === JSON.stringify([])  &&
            JSON.stringify(data.calculatedData) === JSON.stringify([]);
    }

    private resetAcceptor(data: IProposal) {
        console.log("check");
        console.log(data);
        return data.counter === 0 &&
            data.remainingStories === undefined &&
            data.activeField === "field01" &&
            data.showDescriptions === true &&
            JSON.stringify(data.nextSimulation) === JSON.stringify([0, 0, 0, 0, 0, 0]) &&
            data.historicalCapacity === undefined &&
            JSON.stringify(data.simulations) === JSON.stringify([])  &&
            JSON.stringify(data.calculatedData) === JSON.stringify([]);
    }

    private descriptionAcceptor(data: IProposal) {
        return data.counter === undefined &&
            data.remainingStories === undefined &&
            data.activeField === undefined &&
            data.showDescriptions !== undefined &&
            data.nextSimulation === undefined &&
            data.historicalCapacity === undefined &&
            JSON.stringify(data.simulations) === undefined  &&
            JSON.stringify(data.calculatedData) === undefined;
    }

    private addAcceptor(data: IProposal) {
        const nrSimulations = (
            data ? (data.simulations ? (data.simulations.length ? data.simulations.length : 0) : 0) : 0
        );
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
            data.calculatedData ?
                data.calculatedData.length === nrSimulations &&
                this.AllNumbersAreInArray(data.calculatedData, this.data.historicalCapacity) :
                false;
    }

    private generateSeveralAcceptor(data: IProposal) {
        const nrSimulations = (
            data ? (data.simulations ? (data.simulations.length ? data.simulations.length : 0) : 0) : 0
        );
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
            data.calculatedData ?
                data.calculatedData.length === nrSimulations &&
                this.AllNumbersAreInArray(data.calculatedData, this.data.historicalCapacity) :
                false;
    }

    private generateAcceptor(data: IProposal) {
        return data.counter === undefined &&
            data.remainingStories === undefined &&
            data.activeField === undefined &&
            data.showDescriptions === undefined &&
            data.nextSimulation ?
                this.AllNumbersAreInRange([data.nextSimulation], 0, this.data.historicalCapacity.length) :
                false &&
            data.historicalCapacity === undefined &&
            JSON.stringify(data.simulations) === undefined  &&
            JSON.stringify(data.calculatedData) === undefined;
    }

    private changeRemainingStoriesAcceptor(data: IProposal) {
        return data.counter === undefined &&
            data.remainingStories !== undefined &&
            data.activeField === "field01" &&
            data.showDescriptions === undefined &&
            data.nextSimulation === undefined &&
            data.historicalCapacity === undefined &&
            JSON.stringify(data.simulations) === undefined  &&
            JSON.stringify(data.calculatedData) === undefined;
    }

    private AllNumbersAreInRange(values: number[][], from: number, to: number) {
        return values.reduce<boolean>(
            (outerAccumulator: boolean, currentVector: number[]) => {
                return outerAccumulator && currentVector.reduce<boolean>(
                    (innerAccumuator: boolean, currentValue: number) => {
                        return innerAccumuator &&
                            currentValue >= from &&
                            currentValue <= to;
                    },
                    true,
                );
            },
            true,
        );
    }

    private AllNumbersAreInArray(values: number[][], allowedValues: number[]) {
        return values.reduce<boolean>(
            (outerAccumulator: boolean, currentVector: number[]) => {
                return outerAccumulator && currentVector.reduce<boolean>(
                    (innerAccumuator: boolean, currentValue: number) => {
                        return innerAccumuator &&
                            allowedValues.includes(currentValue);
                    },
                    true,
                );
            },
            true,
        );
    }

    private render(data: IModel) {
        this.state.render(data);
    }

    private needRender(model: IProposal) {
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
