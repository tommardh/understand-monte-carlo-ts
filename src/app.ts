import { greeter } from "./greeter.js";
import { View } from "./view.js";
import { Model } from "./model.js";

const user = "Tom";
const data = { counter: 0 };
const model = new Model(data);
const view = new View();
view.display(view.init(model.data));
// view.display(greeter(user));

function increase() {
    console.log("Increase");
}

// window.increase = increase;
const _global = window  as any;

_global.increase = increase;
