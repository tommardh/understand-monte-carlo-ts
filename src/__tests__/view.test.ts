import { View } from "./../view";

function expectedView(counter: number) {
    return (
        "<h1>Counter Test</h1>\n" +
        "<p>counter: " + counter + "</p>\n" +
        "<button type=\"button\" onClick=\"increase()\">Increase</button>"
    );
}

describe("view", () => {
    it.skip("should be possible to display a view", () => {
// Do not know how to test this

//        const input = "<h1>Test av vy</h1>";
//        const expectedOutput = "<h1>Test av vy</h1>";
//        const view = new View();
//        view.display(input);
//        const stateRepresentation = document.getElementById("view");
//        // console.log("-------------------------------");
//        // console.log(stateRepresentation);
//        // console.log("-------------------------------");
//        let output = "";
//        if (stateRepresentation) {
//            output = stateRepresentation.innerHTML;
//        }
//        expect(output).toEqual(expectedOutput);
    });

    it.skip ("should be possible to render the ready view", () => {
//        const input = { counter: 5 };
//        const expectedOutput = expectedView(input.counter);
//        const view = new View();
//        const output = view.ready(input);
//        expect(output).toEqual(expectedOutput);
    });

    it("should be possible to get a initial rendering of the model", () => {

        const given:IModel = {
            counter: 0,
            remainingStories: 100,
            activeField: "field01",
            showDescriptions: false,
            nextSimulation: [0, 0, 0, 0, 0, 0],
            historicalCapacity: [5, 7, 5, 8, 12, 10],
            simulations: [],
        };

        const view = new View();
        const output = view.ready(given);
        expect(output).toMatchSnapshot();
    });
});
