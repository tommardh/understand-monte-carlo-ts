import { View } from "./../view";

function expectedView(counter: number) {
    return (
        "<h1>Counter Test</h1>\n" +
        "<p>counter: " + counter + "</p>\n" +
        "<button type=\"button\" onClick=\"increase()\">Increase</button>"
    );
}

describe("view", () => {

    it("should be possible to get a initial rendering of the model", () => {
        const given: IModel = {
            counter: 0,
            remainingStories: 100,
            activeField: "field01",
            showDescriptions: false,
            nextSimulation: [0, 0, 0, 0, 0, 0],
            historicalCapacity: [5, 7, 5, 8, 12, 10],
            simulations: [],
            calculatedData: [],
        };
        const view = new View();
        const output = view.ready(given);
        expect(output).toMatchSnapshot();
    });

    it("should be possible to get a view with descriptions", () => {
        const given: IModel = {
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
        const output = view.ready(given);
        expect(output).toMatchSnapshot();
    });
});
