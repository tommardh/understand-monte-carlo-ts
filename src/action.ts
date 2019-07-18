import { Model } from "./model";

export class Action {

    public model: Model;

    constructor(model: Model) {
        this.model = model;
    }

    public showDescriptionsClick() {
        const proposal: IProposal = {};
        proposal.showDescriptions = !this.model.data.showDescriptions;
        this.present(proposal);
        return false;
    }

    public reset() {
        const proposal: IProposal = {};
        proposal.counter = 0;
        proposal.remainingStories = 100;
        // proposal.activeField =
        // proposal.showDescriptions =
        proposal.nextSimulation = [0, 0, 0, 0, 0, 0];
        // proposal.historicalCapacity =
        proposal.simulations = [];
        proposal.calculatedData = [],
        this.present(proposal);
        return false;
    }

    public generate(nrSamples: number) {
        const proposal: IProposal = {}; // = data || {};
        const newSimulations = this.createSimulations(nrSamples);
        if (nrSamples > 1) {
            proposal.counter = this.model.data.counter + nrSamples;
            // proposal.activeField =
            // proposal.showDescriptions =
            // proposal.nextSimulation = [0, 0, 0, 0, 0, 0];
            proposal.simulations = newSimulations;
            proposal.calculatedData = newSimulations.map((simulation: number[]) => {
                return simulation.map((value: number) => this.model.data.historicalCapacity[value]);
            });
        } else {
            // proposal.counter = this.model.data.counter + nrSamples;
            // proposal.activeField =
            // proposal.showDescriptions =
            proposal.nextSimulation = newSimulations[0];
            // proposal.simulations = newSimulations;
            // proposal.calculatedData = newSimulations.map((simulation: number[]) => {
            //     return simulation.map((value: number) => this.model.data.historicalCapacity[value]);
            // });
        }
        this.present(proposal);
        return false;
    }

    public addManualSimulation() {
        const proposal: IProposal = {}; // data || {};
        proposal.counter = this.model.data.counter + 1;
        // proposal.activeField =
        // proposal.showDescriptions =
        proposal.nextSimulation = [0, 0, 0, 0, 0, 0];
        proposal.simulations = [this.model.data.nextSimulation];
        proposal.calculatedData = [
            this.model.data.nextSimulation.map((value: number) => this.model.data.historicalCapacity[value]),
        ];
        this.present(proposal);
        return false;
    }

    public editSimulation(subject: string, data: string) {
        const proposal: IProposal = {}; // data || {};
        const index = Number(subject.charAt(subject.length - 1)) - 1;
        // proposal.counter =
        proposal.nextSimulation = this.model.data.nextSimulation;
        proposal.nextSimulation[index] = Number(data);
        // proposal.activeField
        this.present(proposal);
        return false;
    }

    public editStories(data: string) {
        const proposal: IProposal = {}; // data || {};
        // proposal.counter =
        proposal.remainingStories = Number(data);
        proposal.activeField = "field01";
        // proposal.showDescriptions =
        // proposal.nextSimulation =
        // proposal.historicalCapacity =
        // proposal.simulations =
        // proposal.calculatedData =
        this.present(proposal);
        return false;
    }

    private createSimulations(nrSamples: number) {
        const result: number[][] = [];

        for (let row = 0; row < nrSamples; row++) {
            result.push([0, 0, 0, 0, 0, 0]);
            for (let i = 0; i < 6 ; i++) {
                result[row][i] = Math.floor(Math.random() * 6);
                // this.model.data.historicalCapacity[Math.floor(Math.random() * 6)];
            }
        }
        return result;
    }

    private present(data: IProposal) {
        console.log("Proposal");
        console.table(data);

        this.model.present(data);
    }
}
