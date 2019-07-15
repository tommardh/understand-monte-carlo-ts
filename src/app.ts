import { Action } from "./action.js";
import { Model } from "./model.js";
import { State } from "./state.js";
import { View } from "./view.js";

const data = {
    counter: 0,
    remainingStories: 100,
    activeField: "field01",
    showDescriptions: false,
    nextSimulation: [0, 0, 0, 0, 0, 0],
    historicalCapacity: [5, 7, 5, 8, 12, 10],
    simulations: [],
};

const view = new View();
const state = new State(view); // , action);
const model = new Model(data, state);
const action = new Action(model);

state.action = action;

view.display(view.init(model.data));

function send(message: IMessage) {
    console.log(action);
    console.table(message);
    if (message.subject) {
        if (message.subject === "reset") {
            if (message.action === "click") {
                if (message.data) {
                    action.reset(message.data);
                }
            }
        } else if (message.subject === "generate") {
            if (message.action === "click") {
                if (message.data) {
                    action.generate(message.data, 1);
                }
            }
        } else if (message.subject === "generate100") {
            if (message.action === "click") {
                if (message.data) {
                    action.generate(message.data, 100);
                }
            }
        } else if (message.subject === "add") {
            if (message.action === "click") {
                if (message.data) {
                    action.addManualSimulation(message.data);
                }
            }
        } else if (message.subject.startsWith("field")) {
            if (message.action === "edit") {
                if (message.data) {
                    action.editSimulation(message.subject, message.data);
                }
            }
        } else if (message.subject === "stories") {
            if (message.action === "edit") {
                if (message.data) {
                    action.editStories(message.data);
                }
            }
        } else if (message.subject === "showDescriptions") {
            if (message.action === "click") {
                if (message.data) {
                    action.showDescriptionsClick(message.data);
                }
            }
        }
    }
}

const global = window as any;

global.send = send;
