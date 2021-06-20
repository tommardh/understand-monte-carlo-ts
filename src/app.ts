import { Action } from "./action.js";
import { Model } from "./model.js";
import { State } from "./state.js";
import { View } from "./view.js";

import type { IMessage } from './interfaces/iMessage'; 

const data = {
    counter: 0,
    remainingStories: 100,
    activeField: "field01",
    showDescriptions: true,
    nextSimulation: [0, 0, 0, 0, 0, 0],
    historicalCapacity: [5, 7, 5, 8, 12, 10],
    simulations: [],
    calculatedData: [],
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
                action.reset();
            }
        } else if (message.subject === "generate") {
            if (message.action === "click") {
                if (message.data) {
                    action.generate(1);
                }
            }
        } else if (message.subject === "generate100") {
            if (message.action === "click") {
                if (message.data) {
                    action.generate(100);
                }
            }
        } else if (message.subject === "add") {
            if (message.action === "click") {
                if (message.data) {
                    action.addManualSimulation();
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
                    action.showDescriptionsClick();
                }
            }
        }
    }
}

const global = window as any;

global.send = send;
