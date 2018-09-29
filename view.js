define(["require", "exports", "./charts/charts"], function (require, exports, charts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class View {
        constructor() { }
        display(representation) {
            const stateRepresentation = document.getElementById("view");
            if (stateRepresentation) {
                stateRepresentation.innerHTML = representation;
            }
        }
        init(model) {
            return this.ready(model);
        }
        ready(model) {
            console.log("model: -----------------------");
            console.log(JSON.stringify(model));
            return this.drawHeader() +
                this.drawHistory(model.historicalCapacity) +
                // this.drawSamples(model.counter) +
                this.drawForm(model.counter, model.remainingStories, model.nextSimulation, model.activeField) +
                // this.drawChart(model) +
                this.drawData(model) +
                this.drawFooter();
        }
        drawHeader() {
            // return "<h1>Monte Carlo Simulation</h1>";
            return "<div class=\"w3-display-container\">" +
                "<img src=\"montecarlo.jpg\" class=\"w3-image\">" +
                // <!-- div class="w3-display-topleft w3-container w3-text-orange w3-xxlarge" style="text-shadow:1px 1px 0 #000"><p><b>MONTE CARLO SIMULATION</b></p></div -->
                "<h1 class=\"w3-display-topleft w3-container w3-text-squeed-orange\" style=\"text-shadow:1px 1px 0 #000\">" +
                "<b>MONTE CARLO SIMULATION</b></h1>" +
                "</div>";
        }
        drawHistory(data) {
            let output;
            output = "<h2>Througput the Last 6 Iterations</h2>" +
                "<table class=\"w3-table w3-centered\">" +
                "<thead>" +
                "<tr class=\"w3-squeed-orange w3-text-squeed-black\">";
            for (let i = 1; i <= data.length; i++) {
                output += "<th>Iteration " + i + "</th>";
            }
            output += "</tr>" +
                "</thead>" +
                "<tbody>" +
                "<tr class=\"w3-squeed-black\">";
            for (let i = 0; i < data.length; i++) {
                output += "<td>" + data[i] + "</td>";
            }
            output += "</tr>" +
                "</tbody>" +
                "</table>";
            return output;
        }
        drawForm(count, remainingStories, data, field) {
            let output;
            let name;
            output = "<h2>Creaste Simulation Data</h2>" +
                "<p><b>Remaining Stories: </b><input type=\"text\" name=\"stories\" value=\"" +
                remainingStories +
                "\" class=\"w3-squeed-black w3-border-white w3-center\" style=\"display: inline-block\" onchange=\"" +
                "send({subject: 'stories', action: 'edit', data: {text: this.value" +
                "}})\"";
            output += "></p>" +
                "<table class=\"w3-table w3-centered\">" +
                "<thead>" +
                "<tr class=\"w3-squeed-orange w3-text-squeed-black w3-center\">";
            for (let i = 1; i <= 6; i++) {
                output += "<th>Iteration " + i + "</th>";
            }
            output += "</tr>" +
                "</thead>" +
                "<tbody>" +
                "<tr class=\"w3-squeed-black\">";
            for (let i = 1; i <= 6; i++) {
                name = "field0" + i;
                output += "<td><input type=\"text\" name=\"" + name + "\" value=\"";
                if (data[i - 1] === 0) {
                    output += "";
                }
                else {
                    output += data[i - 1];
                }
                output += "\" class=\"w3-squeed-black w3-border-squeed-black w3-center\" size=\"4\" style=\"display: inline-block\" onchange=\"" +
                    "send({subject: 'field0" + i + "', action: 'edit', data: {text: this.value" +
                    "}})\"";
                if (field === name) {
                    output += " autofocus";
                }
                output += "></td>";
            }
            output += "</tr>" +
                "</tbody>  " +
                "</table>" +
                "<br/>" +
                "<div class=\"w3-row\">" +
                // "<div class = \"w3-bar w3-squeed-black\">" +
                // "<div class=\"w3-third\">&nbsp</div>" +
                "<button class=\"w3-button w3-ripple w3-white w3-col\" style=\"width:22%\" onclick=\"" +
                "send({subject: 'add', action: 'click', data: {counter: " +
                count +
                "}})" +
                "\">Add</button>" +
                "<div class=\"w3-col\"style=\"width:4%\">&nbsp</div>" +
                "<button class=\"w3-button w3-ripple w3-white w3-col\" style=\"width:22%\" onClick=\"" +
                "send({subject: 'generate', action: 'click', data: {counter: " +
                count +
                "}})" +
                "\">Generate</button>" +
                "<div class=\"w3-col\"style=\"width:4%\">&nbsp</div>" +
                "<button class=\"w3-button w3-ripple w3-white w3-col\" style=\"width:22%\" onClick=\"" +
                "send({subject: 'generate100', action: 'click', data: {counter: " +
                count +
                "}})" +
                "\">Generate 100</button>" +
                "<div class=\"w3-col\"style=\"width:4%\">&nbsp</div>" +
                "<button class=\"w3-button w3-ripple w3-white w3-col\" style=\"width:22%\" onClick=\"" +
                "send({subject: 'reset', action: 'click', data: {counter: " +
                0 +
                "}})" +
                "\">Reset</button>" +
                "</div>";
            return output;
        }
        drawData(model) {
            const data = model.simulations; // :number[][], 
            const remainingItems = model.remainingStories; // : number) {
            let output = "";
            let average;
            let remainingIterations;
            if (data.length > 0) {
                output = "<h2>Simulation Data</h2>" +
                    // "<p><b>Samples:</b> " + data.length + "</p>" +
                    this.drawChart(model) +
                    "<table class=\"w3-table w3-centered\">" +
                    "<thead>" +
                    "<tr class=\"w3-squeed-orange w3-text-squeed-black\">" +
                    "<th>Sample</th>";
                for (let i = 1; i <= data[0].length; i++) {
                    output += "<th>Iteration " + i + "</th>";
                }
                output += "<th>Average</th>" +
                    "<th>Remaining Iterations</th>" +
                    "</tr>" +
                    "</thead>" +
                    "<tbody>";
                // for(let row=0; row < data.length; row++) {
                for (let row = data.length - 1; row >= 0; row--) {
                    output += "<tr class=\"w3-squeed-black\">" +
                        "<td>" + (row + 1) + "</td>";
                    average = 0;
                    for (let i = 0; i < data[row].length; i++) {
                        output += "<td>" + data[row][i] + "</td>";
                        average += data[row][i];
                    }
                    average = average / data[row].length;
                    remainingIterations = remainingItems / average;
                    output += "<td>" + Math.floor(average) + "</td>" +
                        "<td>" + Math.floor(remainingIterations) + "</td>" +
                        "</tr>";
                }
                output += "</tbody>" +
                    "</table>";
            }
            return output;
        }
        drawFooter() {
            return "<br /><img src=\"squeed_4c_neg.gif\" width=\"100\">";
        }
        drawChart(model) {
            let vector = this.calculateVectors(model);
            const barChartData = this.generateChartData(vector);
            return charts_1.barChart(barChartData);
        }
        calculateVectors(model) {
            let vector = {}; // {[key: number]: number} = {};
            let sum;
            let average;
            let remaining;
            model.simulations.forEach((simulation) => {
                sum = simulation.reduce((a, b) => a + b, 0); // Math.floor(model.remainingStories / simulation.data.reduce((a, b) => a + b, 0)/6);
                average = sum / model.historicalCapacity.length;
                remaining = Math.floor(model.remainingStories / average);
                if (vector[remaining] === undefined) {
                    vector[remaining] = 0;
                    //vector[sum].push(0);
                }
                vector[remaining]++;
            });
            return vector;
        }
        generateChartData(vector) {
            let barChartData = {
                data: {
                    type: "bar",
                    theme: "dark",
                    x: "x",
                    columns: [{ name: "x", values: [] },
                        { name: "serie 1", values: [] }]
                },
                axis: {
                    x: { type: "continuous" }
                }
            };
            for (let key in vector) {
                barChartData.data.columns[0].values.push(Number(key));
                barChartData.data.columns[1].values.push(vector[key]);
            }
            console.log(JSON.stringify((barChartData)));
            // barChartData.data.columns[1].values[0] = model.counter;
            return barChartData;
        }
    }
    exports.View = View;
});
//# sourceMappingURL=view.js.map