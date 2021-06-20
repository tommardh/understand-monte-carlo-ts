define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = void 0;
    class Action {
        constructor(model) {
            this.model = model;
        }
        showDescriptionsClick() {
            const proposal = {};
            proposal.showDescriptions = !this.model.data.showDescriptions;
            this.present(proposal);
            return false;
        }
        reset() {
            const proposal = {};
            proposal.counter = 0;
            // proposal.remainingStories = 100;
            proposal.activeField = "field01";
            proposal.showDescriptions = true;
            proposal.nextSimulation = [0, 0, 0, 0, 0, 0];
            // proposal.historicalCapacity =
            proposal.simulations = [];
            proposal.calculatedData = [],
                this.present(proposal);
            return false;
        }
        generate(nrSamples) {
            const proposal = {}; // = data || {};
            const newSimulations = this.createSimulations(nrSamples);
            if (nrSamples > 1) {
                proposal.counter = this.model.data.counter + nrSamples;
                // proposal.activeField =
                proposal.showDescriptions = false;
                // proposal.nextSimulation = [0, 0, 0, 0, 0, 0];
                proposal.simulations = newSimulations;
                proposal.calculatedData = newSimulations.map((simulation) => {
                    return simulation.map((value) => this.model.data.historicalCapacity[value]);
                });
            }
            else {
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
        addManualSimulation() {
            const proposal = {}; // data || {};
            proposal.counter = this.model.data.counter + 1;
            // proposal.activeField =
            proposal.showDescriptions = false;
            proposal.nextSimulation = [0, 0, 0, 0, 0, 0];
            proposal.simulations = [this.model.data.nextSimulation];
            proposal.calculatedData = [
                this.model.data.nextSimulation.map((value) => this.model.data.historicalCapacity[value]),
            ];
            this.present(proposal);
            return false;
        }
        editSimulation(subject, data) {
            const proposal = {}; // data || {};
            const index = Number(subject.charAt(subject.length - 1)) - 1;
            // proposal.counter =
            proposal.nextSimulation = this.model.data.nextSimulation;
            proposal.nextSimulation[index] = Number(data);
            // proposal.activeField
            this.present(proposal);
            return false;
        }
        editStories(data) {
            const proposal = {}; // data || {};
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
        createSimulations(nrSamples) {
            const result = [];
            for (let row = 0; row < nrSamples; row++) {
                result.push([0, 0, 0, 0, 0, 0]);
                for (let i = 0; i < 6; i++) {
                    result[row][i] = Math.floor(Math.random() * 6);
                    // this.model.data.historicalCapacity[Math.floor(Math.random() * 6)];
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