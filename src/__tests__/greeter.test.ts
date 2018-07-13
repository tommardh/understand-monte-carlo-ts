import { greeter } from "./../greeter";

describe("greeter", () => {
    it("should greet a person given a name", () => {
        const input = "Tom";
        const expectedOutput = "<h3>Typescript Header</h3><p>Hello, flytta på <b>Tom</b></p>";
        const output = greeter(input);
        expect(output).toBe(expectedOutput);
    });

    it("should return empty string if no name is given", () => {
        const input = "";
        const expectedOutput = "";
        const output = greeter(input);
        expect(output).toBe(expectedOutput);
    });

});
