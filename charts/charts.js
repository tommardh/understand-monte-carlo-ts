define(["require", "exports", "./axis"], function (require, exports, axis_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function barChart(chart) {
        const width = 3840;
        const height = 1080;
        let margin = 0; // 200; // 0;
        let svgChart;
        if (axis_1.Axis.hasAxis(chart)) {
            margin = 200;
        }
        const theme = getTheme(chart);
        // console.log("theme: " + JSON.stringify(theme));
        const bars = generateBars(width, height, margin, chart, theme);
        const axis = axis_1.Axis.generateAxis(width, height, margin, chart, theme);
        if (chart.data.type === "bar") {
            svgChart = generateSVGHeader(width, height) +
                bars +
                axis +
                "</svg>";
        }
        else {
            svgChart = "<p class=\"error\">Given chart is not a Bar Chart!</p>";
        }
        return svgChart;
    }
    exports.barChart = barChart;
    function generateSVGHeader(width, height) {
        let header;
        header = "<svg" +
            " width=\"100%\"" +
            " perserveAspectRatio=\"xMidYMid\"" +
            " viewbox=\"0 0 " + width + " " + height +
            "\">";
        return header;
    }
    function generateBars(width, height, margin, chart, theme) {
        const data = getData(chart); // chart.data.columns[0].values;
        const padding = getBarPadding(chart); // 20; // width * 0.05;
        const columnWidth = (width - margin * 2) / data.length;
        const barWidth = Math.floor((1 - padding) * columnWidth);
        const spaceWidth = padding * columnWidth;
        const max = Math.max(...data);
        let barHeightFactor;
        if (max === 0) {
            barHeightFactor = 0;
        }
        else {
            barHeightFactor = (height - margin * 2) / Math.max(...data);
        }
        let barHeight;
        let output = "";
        let x;
        let y;
        for (let i = 0; i < data.length; i++) {
            barHeight = Math.floor(data[i] * barHeightFactor);
            x = Math.floor(margin + spaceWidth / 2 + i * columnWidth);
            y = height - margin - barHeight;
            output += "<rect x=" + x + " y=" + y + " width=" + barWidth + " height=" + barHeight + " fill=\"" +
                theme.fill +
                "\" />";
        }
        return output;
    }
    function getBarPadding(chart) {
        let padding = 0.25;
        if (chart.bar !== undefined) {
            if (chart.bar.padding !== undefined) {
                padding = chart.bar.padding;
            }
        }
        return padding;
    }
    function getData(chart) {
        let data;
        if (chart.data.x) {
            if (axis_1.Axis.isXAxisTypeContinuous(chart)) {
                data = addMissingYValues(chart);
            }
            else {
                const xlabel = chart.data.x;
                const index = chart.data.columns.findIndex((column) => column.name !== xlabel);
                data = chart.data.columns[index].values;
            }
        }
        else {
            data = chart.data.columns[0].values;
        }
        // console.log(data);
        return data;
    }
    function addMissingYValues(chart) {
        let data = [];
        const xlabel = chart.data.x;
        const labelIndex = chart.data.columns.findIndex((column) => column.name === xlabel);
        const labelData = chart.data.columns[labelIndex].values;
        const YIndex = chart.data.columns.findIndex((column) => column.name !== xlabel);
        const YValues = chart.data.columns[YIndex].values;
        const min = Math.min(...labelData);
        const max = Math.max(...labelData);
        let index;
        for (let i = min; i <= max; i++) {
            index = labelData.indexOf(i);
            if (index === -1) {
                data.push(0);
            }
            else {
                data.push(YValues[index]);
            }
        }
        return data;
    }
    function getTheme(chart) {
        let themeName = "light";
        let theme;
        if (chart.data.theme) {
            themeName = chart.data.theme;
        }
        if (themeName === "light") {
            theme = { stroke: "black", fill: "blue" };
        }
        else {
            theme = { stroke: "white", fill: "royalblue" };
        }
        return theme;
    }
});
//# sourceMappingURL=charts.js.map