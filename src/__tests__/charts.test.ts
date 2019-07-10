import { barChart } from "./../charts/charts";

function deepcopy<T>(o: T): T {
  return JSON.parse(JSON.stringify(o));
}

const lineChartData: IChart = {
                                  data: {
                                      type: "line",
                                      columns: [
                                          {
                                              name: "serie 1",
                                              values: [1, 2, 3],
                                          },
                                      ],
                                  },
                              };

const barChartData: IChart = {
                                  data: {
                                      type: "bar",
                                      columns: [
                                          {
                                              name: "serie 1",
                                              values: [1, 2, 3],
                                          },
                                      ],
                                  },
                              };

const hideAxises = (chart: IChart) => {
    chart.axis = {
        x: {
            show: false,
        },
        y: {
            show: false,
        },
    };
    return chart;
};

const hideXAxis = (chart: IChart) => {
    chart.axis = {
        x: {
            show: false,
        },
    };
    return chart;
};

const hideYAxis = (chart: IChart) => {
    chart.axis = {
        y: {
            show: false,
        },
    };
    return chart;
};

const setPaddingToZero = (chart: IChart) => {
    chart.bar = { padding: 0 };
    return chart;
};

// {
//    bindto: "#chart",
//     data: {
//         type: "bar",
//         x: "x",
//         columns: [{
//                 name: "data",
//                 values: [1,1,1]
//             },{
//                 name: "x",
//                 values: [11, 12, 13]
//             }
//         ]
//     }
// }

describe ("Bar Chart", () => {
    it("should return a error message if the type is not bar", () => {
        const input = deepcopy(lineChartData);
        const expectedOutput = "<p class=\"error\">Given chart is not a Bar Chart!</p>";
        const output = barChart(input);
        expect(output).toBe(expectedOutput);
    });

    it("should be possible to create a bar chart with minimal setup", () => {
        const input = deepcopy(barChartData);
        const expectedOutput: string = "<svg width=\"100%\" perserveAspectRatio=\"xMidYMid\" " +
            "viewbox=\"0 0 3840 1080\">" +
            "<rect x=343 y=654 width=860 height=226 fill=\"blue\" />" +
            "<rect x=1490 y=427 width=860 height=453 fill=\"blue\" />" +
            "<rect x=2636 y=200 width=860 height=680 fill=\"blue\" />" +
            "<line x1=200 y1=200 x2=200 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
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
            "style=\"font-family: sans-serif; font-size: 48px\">3.0</text>" +
            "<line x1=175 y1=880 x2=3640 y2=880 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<line x1=773 y1=880 x2=773 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=773 y=905 fill=\"black\" alignment-baseline=\"hanging\" text-anchor=\"middle\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">1</text>" +
            "<line x1=1919 y1=880 x2=1919 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=1919 y=905 fill=\"black\" alignment-baseline=\"hanging\" text-anchor=\"middle\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">2</text>" +
            "<line x1=3065 y1=880 x2=3065 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=3065 y=905 fill=\"black\" alignment-baseline=\"hanging\" text-anchor=\"middle\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">3</text>" +
            "</svg>";

        const output = barChart(input);
        expect(output).toBe(expectedOutput);
    });

    it("should be possible to create a bar chart without axises", () => {
        let input = deepcopy(barChartData);
        input = hideAxises(input);
        input = setPaddingToZero(input);
        const expectedOutput: string = "<svg width=\"100%\" perserveAspectRatio=\"xMidYMid\" " +
            "viewbox=\"0 0 3840 1080\">" +
            "<rect x=0 y=720 width=1280 height=360 fill=\"blue\" />" +
            "<rect x=1280 y=360 width=1280 height=720 fill=\"blue\" />" +
            "<rect x=2560 y=0 width=1280 height=1080 fill=\"blue\" />" +
            "</svg>";
        const output = barChart(input);
        expect(output).toBe(expectedOutput);
    });

    it("should be possible to create a bar chart with 0 as maximal value", () => {
        let input = deepcopy(barChartData);
        input = hideAxises(input);
        input = setPaddingToZero(input);
        input.data.columns[0].values = [0];
        const expectedOutput: string = "<svg width=\"100%\" perserveAspectRatio=\"xMidYMid\" " +
            "viewbox=\"0 0 3840 1080\">" +
            "<rect x=0 y=1080 width=3840 height=0 fill=\"blue\" />" +
            "</svg>";
        const output = barChart(input);
        expect(output).toBe(expectedOutput);
    });

    it("should be possible to setup space between bars", () => {
        let input = deepcopy(barChartData);
        input.bar = {
            padding: 0.5,
        };
        input = hideAxises(input);
        const expectedOutput: string = "<svg width=\"100%\" perserveAspectRatio=\"xMidYMid\" " +
            "viewbox=\"0 0 3840 1080\">" +
            "<rect x=320 y=720 width=640 height=360 fill=\"blue\" />" +
            "<rect x=1600 y=360 width=640 height=720 fill=\"blue\" />" +
            "<rect x=2880 y=0 width=640 height=1080 fill=\"blue\" /></svg>";
        const output = barChart(input);
        expect(output).toBe(expectedOutput);

    });

    it("should be possible to render graph with specific values on x-axis", () => {
        let input = deepcopy(barChartData);
        input = setPaddingToZero(input);
        // input.bar = {
        //    padding: 0
        // };
        input.data.x = "x";
        input.data.columns[1] = { name: "x", values: [11, 12, 13] };
        input = hideYAxis(input);
        const expectedOutput: string = "<svg width=\"100%\" perserveAspectRatio=\"xMidYMid\" " +
            "viewbox=\"0 0 3840 1080\">" +
            "<rect x=200 y=654 width=1146 height=226 fill=\"blue\" />" +
            "<rect x=1346 y=427 width=1146 height=453 fill=\"blue\" />" +
            "<rect x=2493 y=200 width=1146 height=680 fill=\"blue\" />" +
            "<line x1=175 y1=880 x2=3640 y2=880 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<line x1=773 y1=880 x2=773 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=773 y=905 fill=\"black\" alignment-baseline=\"hanging\" text-anchor=\"middle\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">11</text>" +
            "<line x1=1919 y1=880 x2=1919 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=1919 y=905 fill=\"black\" alignment-baseline=\"hanging\" text-anchor=\"middle\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">12</text>" +
            "<line x1=3065 y1=880 x2=3065 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=3065 y=905 fill=\"black\" alignment-baseline=\"hanging\" text-anchor=\"middle\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">13</text>" +
            "</svg>";

        const output = barChart(input);
        expect(output).toBe(expectedOutput);
    });

    it("should be possible to render a graph with all x values on x-axis " +
        "even if there is a hole in the given x series", () => {
        let input = deepcopy(barChartData);

        input.bar = {
            padding: 0,
        };
        input.data.x = "x";
        input.data.columns[1] = { name: "x", values: [11, 12, 14] };
        input = hideYAxis(input);
        if (input.axis) {
            input.axis.x = { type: "continuous"};
        }
        const expectedOutput: string = "<svg width=\"100%\" perserveAspectRatio=\"xMidYMid\" " +
            "viewbox=\"0 0 3840 1080\">" +
            "<rect x=200 y=654 width=860 height=226 fill=\"blue\" />" +
            "<rect x=1060 y=427 width=860 height=453 fill=\"blue\" />" +
            "<rect x=1920 y=880 width=860 height=0 fill=\"blue\" />" +
            "<rect x=2780 y=200 width=860 height=680 fill=\"blue\" />" +
            "<line x1=175 y1=880 x2=3640 y2=880 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<line x1=630 y1=880 x2=630 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=630 y=905 fill=\"black\" alignment-baseline=\"hanging\" text-anchor=\"middle\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">11</text>" +
            "<line x1=1490 y1=880 x2=1490 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=1490 y=905 fill=\"black\" alignment-baseline=\"hanging\" text-anchor=\"middle\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">12</text>" +
            "<line x1=2350 y1=880 x2=2350 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=2350 y=905 fill=\"black\" alignment-baseline=\"hanging\" text-anchor=\"middle\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">13</text>" +
            "<line x1=3210 y1=880 x2=3210 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
            "<text x=3210 y=905 fill=\"black\" alignment-baseline=\"hanging\" text-anchor=\"middle\" " +
            "style=\"font-family: sans-serif; font-size: 48px\">14</text>" +
            "</svg>";

        const output = barChart(input);
        expect(output).toBe(expectedOutput);

    });

    it("should be possible to render an empty chart", () => {
        let input = deepcopy(barChartData);
        input = hideXAxis(input);
        input = setPaddingToZero(input);
        input.data.columns[0].values = [];
        input.data.x = "x";
        input.data.columns[1] = { name: "x", values: [] };
        const expectedOutput: string = "<svg width=\"100%\" perserveAspectRatio=\"xMidYMid\" " +
            "viewbox=\"0 0 3840 1080\">" +
            "<line x1=200 y1=200 x2=200 y2=905 stroke=\"black\" stroke-width=\"5\"></line>" +
            "</svg>";
        const output = barChart(input);
        expect(output).toBe(expectedOutput);
    });
});
