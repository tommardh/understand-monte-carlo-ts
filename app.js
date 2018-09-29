define(["require", "exports", "./action.js", "./model.js", "./state.js", "./view.js"], function (require, exports, action_js_1, model_js_1, state_js_1, view_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const data = { counter: 0,
        remainingStories: 100,
        activeField: "field01",
        nextSimulation: [0, 0, 0, 0, 0, 0],
        historicalCapacity: [5, 7, 5, 8, 12, 10],
        simulations: [] };
    const view = new view_js_1.View();
    const state = new state_js_1.State(view); // , action);
    const model = new model_js_1.Model(data, state);
    const action = new action_js_1.Action(model);
    state.action = action;
    view.display(view.init(model.data));
    function send(message) {
        console.table(message);
        if (message.subject) {
            if (message.subject === "reset") {
                if (message.action === "click") {
                    if (message.data) {
                        action.reset(message.data);
                    }
                }
            }
            else if (message.subject === "generate") {
                if (message.action === "click") {
                    if (message.data) {
                        action.generate(message.data, 1);
                    }
                }
            }
            else if (message.subject === "generate100") {
                if (message.action === "click") {
                    if (message.data) {
                        action.generate(message.data, 100);
                    }
                }
            }
            else if (message.subject === "add") {
                if (message.action === "click") {
                    if (message.data) {
                        action.addManualSimulation(message.data);
                    }
                }
            }
            else if (message.subject.startsWith("field")) {
                if (message.action === "edit") {
                    if (message.data) {
                        action.editSimulation(message.subject, message.data);
                    }
                }
            }
            else if (message.subject === "stories") {
                if (message.action === "edit") {
                    if (message.data) {
                        action.editStories(message.data);
                    }
                }
            }
        }
    }
    const global = window;
    global.send = send;
});
//# sourceMappingURL=app.js.map