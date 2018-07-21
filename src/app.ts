import { Model } from "./model.js";
import { View } from "./view.js";

const data = { counter: 0 };
const model = new Model(data);
const view = new View();
view.display(view.init(model.data));

function increase() {
    console.log("Increase");
}

// window.increase = increase;
const global = window as any;

global.increase = increase;
