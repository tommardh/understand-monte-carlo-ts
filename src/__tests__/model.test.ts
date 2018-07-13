import { Model } from "./../model";

describe("model", () => {
    it("should be possible to start with no data", () => {
        const input = {};
        const expectedOutput = { data: {} };
        const output = new Model(input);
        // console.log("-----------------------------");
        // console.log(model);
        // console.log("-----------------------------");
        expect(output).toEqual(expectedOutput);
    });
    it("should contain  a represenation of the data", () => {
        const input = { counter: 0};
        const expectedOutput = { data: { counter: 0 } };
        const output = new Model(input);
        // console.log("-----------------------------");
        // console.log(model);
        // console.log("-----------------------------");
        expect(output).toEqual(expectedOutput);
    });
});
