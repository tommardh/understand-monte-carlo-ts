import { Model } from "./model";

export class Action {

    public model: Model;

    constructor(model: Model) {
        this.model = model;
    }

    public showDescriptionsClick(data: IProposal) {
        const proposal: IProposal = data || {};
        proposal.counter = this.model.data.counter;
        proposal.showDescriptions = !this.model.data.showDescriptions;
        this.present(proposal);
        return false;
    }

    public reset(data: IProposal) {
        const proposal: IProposal = data || {};
        proposal.simulations = [];
        proposal.nextSimulation = [0, 0, 0, 0, 0, 0];
        proposal.remainingStories = 100;
        this.present(proposal);
        return false; //
    }

    public generate(data: IProposal, nrSamples: number) {
        const proposal: IProposal = data || {};
        if (proposal.counter !== undefined) {
            proposal.counter += nrSamples;
        }
        proposal.simulations = this.createSimulations(nrSamples);
        this.present(proposal);
        return false;
    }

    public addManualSimulation(data: IProposal) {
        const proposal: IProposal = data || {};
        proposal.counter = this.model.data.counter + 1;
        proposal.simulations = [this.model.data.nextSimulation];
        proposal.nextSimulation = [0, 0, 0, 0, 0, 0];
        this.present(proposal);
        return false;
    }

    public editSimulation(subject: string, data: IProposal) {
        const proposal: IProposal = data || {};
        const index = Number(subject.charAt(subject.length - 1)) - 1;
        proposal.nextSimulation = this.model.data.nextSimulation;
        proposal.nextSimulation[index] = Number(data.text);
        this.present(proposal);
        return false;
    }

    public editStories(data: IProposal) {
        const proposal: IProposal = data || {};
        proposal.remainingStories = Number(data.text);
        proposal.activeField = "field01";
        this.present(proposal);
        return false;
    }

    private createSimulations(nrSamples: number) {
        const result: number[][] = [];

        for (let row = 0; row < nrSamples; row++) {
            result.push([0, 0, 0, 0, 0, 0]);
            for (let i = 0; i < 6 ; i++) {
                result[row][i] = this.model.data.historicalCapacity[Math.floor(Math.random() * 6)];
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
