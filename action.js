define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Action {
        constructor(model) {
            this.model = model;
        }
        reset(data) {
            // public increase(data: IModel, present?: (o: IModel) => string) {
            // present = present ? present : this.model.present;
            const proposal = data || {};
            // proposal.counter = proposal.counter || 0;
            proposal.simulations = [];
            proposal.nextSimulation = [0, 0, 0, 0, 0, 0];
            proposal.remainingStories = 100;
            this.present(proposal);
            return false;
        }
        generate(data, nrSamples) {
            // public increase(data: IModel, present?: (o: IModel) => string) {
            // present = present ? present : this.model.present;
            const proposal = data || {};
            // proposal.counter = proposal.counter || 0;
            if (proposal.counter !== undefined) {
                proposal.counter += nrSamples;
            }
            proposal.simulations = this.createSimulations(nrSamples);
            this.present(proposal);
            return false;
        }
        addManualSimulation(data) {
            const proposal = data || {};
            proposal.counter = this.model.data.counter + 1;
            proposal.simulations = [this.model.data.nextSimulation];
            proposal.nextSimulation = [0, 0, 0, 0, 0, 0];
            this.present(proposal);
            return false;
        }
        editSimulation(subject, data) {
            const proposal = data || {};
            const index = Number(subject.charAt(subject.length - 1)) - 1;
            proposal.nextSimulation = this.model.data.nextSimulation;
            proposal.nextSimulation[index] = Number(data.text);
            this.present(proposal);
            return false;
        }
        editStories(data) {
            const proposal = data || {};
            proposal.remainingStories = Number(data.text);
            proposal.activeField = "field01";
            this.present(proposal);
            return false;
        }
        createSimulations(nrSamples) {
            let result = [];
            for (let row = 0; row < nrSamples; row++) {
                result.push([0, 0, 0, 0, 0, 0]);
                for (let i = 0; i < 6; i++) {
                    result[row][i] = this.model.data.historicalCapacity[Math.floor(Math.random() * 6)];
                }
            }
            return result;
        }
        present(data) {
            console.log("Proposal");
            console.table(data);
            this.model.present(data);
        }
    }
    exports.Action = Action;
});
//# sourceMappingURL=action.js.map