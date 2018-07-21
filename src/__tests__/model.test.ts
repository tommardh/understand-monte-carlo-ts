import { Model } from "./../model";

function render(data: IModel) {
    let output = "";
    output += "<h3>Counting Down</h3>";
    output += "<p>Counter: ";
    output += "<b>" + data.counter + "</b>";
    output += "</p>";
    return output;
}

describe("model", () => {
    it("should be possible to start with no data", () => {
        const input = {};
        const expectedOutput = { data: {} };
        const output = new Model(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should contain  a represenation of the data", () => {
        const input = { counter: 0 };
        const expectedOutput = { counter: 0 };
        const model = new Model(input);
        const output = model.data;
        expect(output).toEqual(expectedOutput);
    });

    it("should create a presentation of the data", () => {
        const input = { counter: 5 };
        const expectedOutput = "<h3>Counting Down</h3><p>Counter: <b>5</b></p>";
        const model = new Model(input);
        const output = model.present(model.data, render);
        expect(output).toEqual(expectedOutput);
    });

});
