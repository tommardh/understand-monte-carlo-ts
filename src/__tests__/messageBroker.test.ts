
import { Action } from "./../action.js";
import { MessageBroker } from "./../messageBroker";
import { Model } from "./../model.js";
import { State } from "./../state.js";
import { View } from "./../view.js";

const data = { counter: 0, 
               remainingStories: 100, 
               activeField: "field01",
               nextSimulation: [0, 0, 0, 0, 0, 0], 
               historicalCapacity: [5,7,5,8,12,10], 
               simulations: [] };

const view = new View();
const state = new State(view); // , action);
const model = new Model(data, state);
const action = new Action(model);

state.action = action;

function deepcopy<T>(o: T): T {
  return JSON.parse(JSON.stringify(o));
}

const message: IMessage = { subject: "reset", action: "click", data: { counter: 0 }};

describe("Message Broker", () => {
    it("should be able to create a message broker", () => {
        const input = action;
        const expectedOutput = true;
        const output = new MessageBroker(action);
        expect(output).toBeDefined();
    })

    it("should be able to send a valid message", () => {
        const input = deepcopy(message);
        const expectedOutput = true;
        const messageBroker = new MessageBroker(action);
        const output = messageBroker.send(message);
        expect(output).;
    })
})
