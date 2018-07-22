import { Model } from "./Model";

export class Action {

    public model: Model;

    constructor(model: Model) {
        this.model = model;
    }

    public increase(data: IModel) {
    // public increase(data: IModel, present?: (o: IModel) => string) {
        // present = present ? present : this.model.present;
        console.log("Action Increase");
        const proposal: IModel = data || {};
        proposal.counter = proposal.counter || 0;
        proposal.counter += 1;
        console.table(proposal);
        this.present(proposal);
        return false;
    }

    private present(data: IModel) {
        this.model.present(data);
    }
}
