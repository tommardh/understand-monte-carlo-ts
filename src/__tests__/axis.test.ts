import { Axis } from "./../charts/axis";

const barChartData: IChart = {
                                  data: {
                                      type: "bar",
                                      columns: [
                                          {
                                              name: "serie 1",
                                              values: [3, 2, 1],
                                          },
                                      ],
                                  },
                              };

const lightTheme = { stroke: "black", fill: "blue" };

function deepcopy<T>(o: T): T {
  return JSON.parse(JSON.stringify(o));
}

describe("axis", () => {
    it("should be default that a chart has an x-axis", () => {
        const input = deepcopy(barChartData);
        const expectedOutput = true;
        const output = Axis.hasXAxis(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should be default that a chart has an x-axis even if axis is defined", () => {
        const input = deepcopy(barChartData);
        input.axis = {};
        const expectedOutput = true;
        const output = Axis.hasXAxis(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should be possible to hide the x-axis", () => {
        const input = deepcopy(barChartData);
        input.axis = {x: { show: false }};
        const expectedOutput = false;
        const output = Axis.hasXAxis(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should be possible explicitly show the x-axis", () => {
        const input = deepcopy(barChartData);
        input.axis = {x: { show: true }};
        const expectedOutput = true;
        const output = Axis.hasXAxis(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should be default that a chart has an y-axis", () => {
        const input = deepcopy(barChartData);
        const expectedOutput = true;
        const output = Axis.hasYAxis(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should be default that a chart has an y-axis even if axis is defined", () => {
        const input = deepcopy(barChartData);
        input.axis = {};
        const expectedOutput = true;
        const output = Axis.hasYAxis(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should be possible to hide the y-axis", () => {
        const input = deepcopy(barChartData);
        input.axis = {y: { show: false }};
        const expectedOutput = false;
        const output = Axis.hasYAxis(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should be possible explicitly show the y-axis", () => {
        const input = deepcopy(barChartData);
        input.axis = {y: { show: true }};
        const expectedOutput = true;
        const output = Axis.hasYAxis(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should be possible to determine that a graph with no axis explicitly declared have axises", () => {
        const input = deepcopy(barChartData);
        const expectedOutput = true;
        const output = Axis.hasAxis(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should be possible to determine if both axises are hidden", () => {
        const input = deepcopy(barChartData);
        input.axis = {x: { show: false }, y: { show: false }};
        const expectedOutput = false;
        const output = Axis.hasAxis(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should be possible to determine to show one axis if the other is hidden", () => {
        const input = deepcopy(barChartData);
        input.axis = {x: { show: false }};
        const expectedOutput = true;
        const output = Axis.hasAxis(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should generate x-axis labels as a sequence if no x-values are supplied", () => {
        const input = deepcopy(barChartData);
        const expectedOutput = ["1", "2", "3"];
        const output = Axis.getXAxisLabels(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should be possible to get the labels for the x axis", () => {
        const input = deepcopy(barChartData);
        input.data.x = "x";
        input.data.columns[1] = { name: "x", values: [11, 12, 13] };
        const expectedOutput = ["11", "12", "13"];
        const output = Axis.getXAxisLabels(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should be possible to generate an x axis that expands missing values", () => {
        const input = deepcopy(barChartData);
        input.data.x = "x";
        input.data.columns[1] = { name: "x", values: [11, 12, 14] };
        input.axis = { x: { type: "continuous" } };
        const expectedOutput = ["11", "12", "13", "14"];
        const output = Axis.getXAxisLabels(input);
        expect(output).toEqual(expectedOutput);
    });

    it("should be possible to generate a x-axis with default values", () => {
        const input = deepcopy(barChartData);
        const theme = deepcopy(lightTheme);
        const expectedOutput = "<line x1=175 y1=880 x2=3640 y2=880 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<line x1=773 y1=880 x2=773 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=773 y=905 fill=\"black\" alignment-baseline=\"hanging\" text-anchor=\"middle\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">1</text>" +
            "<line x1=1919 y1=880 x2=1919 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=1919 y=905 fill=\"black\" alignment-baseline=\"hanging\" text-anchor=\"middle\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">2</text>" +
            "<line x1=3065 y1=880 x2=3065 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=3065 y=905 fill=\"black\" alignment-baseline=\"hanging\" text-anchor=\"middle\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">3</text>";
        const output = Axis.generateXAxis(3840, 1080, 200, input, lightTheme);
        expect(output).toEqual(expectedOutput);
    });

    it("should be possible to generate a y-axis with default values", () => {
        const input = deepcopy(barChartData);
        input.axis = {x: { show: false }};
        const theme = deepcopy(lightTheme);
        const expectedOutput = "<line x1=200 y1=200 x2=200 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<line x1=175 y1=880 x2=200 y2=880 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=175 y=880 fill=\"black\" alignment-baseline=\"middle\" text-anchor=\"end\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">0.0</text>" +
            "<line x1=175 y1=766 x2=200 y2=766 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=175 y=766 fill=\"black\" alignment-baseline=\"middle\" text-anchor=\"end\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">0.5</text>" +
            "<line x1=175 y1=653 x2=200 y2=653 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=175 y=653 fill=\"black\" alignment-baseline=\"middle\" text-anchor=\"end\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">1.0</text>" +
            "<line x1=175 y1=540 x2=200 y2=540 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=175 y=540 fill=\"black\" alignment-baseline=\"middle\" text-anchor=\"end\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">1.5</text>" +
            "<line x1=175 y1=426 x2=200 y2=426 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=175 y=426 fill=\"black\" alignment-baseline=\"middle\" text-anchor=\"end\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">2.0</text>" +
            "<line x1=175 y1=313 x2=200 y2=313 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=175 y=313 fill=\"black\" alignment-baseline=\"middle\" text-anchor=\"end\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">2.5</text>" +
            "<line x1=175 y1=200 x2=200 y2=200 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=175 y=200 fill=\"black\" alignment-baseline=\"middle\" text-anchor=\"end\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">3.0</text>";
        const output = Axis.generateYAxis(3840, 1080, 200, input, lightTheme);
        expect(output).toEqual(expectedOutput);
    });

    it("should genereate an x-axis that is sorted numerically with continuous axis", () => {
        const input = deepcopy(barChartData);
        input.data.x = "x";
        input.data.columns[1] = { name: "x", values: [9, 10, 11] };
        input.axis = { x: { type: "continuous" } };
        const expectedOutput = ["9", "10", "11"];
        const output = Axis.getXAxisLabels(input);
        expect(output).toEqual(expectedOutput);
    });

});
