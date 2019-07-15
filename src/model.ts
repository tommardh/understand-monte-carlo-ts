import { State } from "./state";

export class Model {

    public data: IModel;
    public state: State;

    constructor(data: IModel, state: State) {
        this.data = data;
        this.state = state;
    }

    public present(data: IProposal) {
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

        if (data.nextSimulation) {
            this.data.nextSimulation = data.nextSimulation;
        }
        if (this.needRender(data)) {
            console.log("call render");
            this.render(this.data);
        }
    }

    private render(data: IModel) {
        this.state.render(data);
    }

    private needRender(model: IProposal) {
        let sum: number;
        if (model.nextSimulation) {
            sum = model.nextSimulation.reduce((a, b) => a + b, 0);
        } else {
            sum = 0;
        }
        return sum === 0;
    }
}
