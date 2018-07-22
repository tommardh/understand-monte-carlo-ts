import { Action } from "./action.js";
import { Model } from "./model.js";
import { State } from "./state.js";
import { View } from "./view.js";

const data = { counter: 0 };

const view = new View();
const state = new State(view); // , action);
const model = new Model(data, state);
const action = new Action(model);

// state.action = action;

view.display(view.init(model.data));

function increase() {
    console.log("Increase");
}

function send(message: IMessage) {
    console.table(message);
    if (message.subject === "increase") {
        if (message.action === "click") {
            if (message.data) {
                action.increase(message.data);
            }
        }
    }
}
// window.increase = increase;
const global = window as any;

global.increase = increase;
global.send = send;
