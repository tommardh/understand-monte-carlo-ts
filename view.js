define(["require", "exports", "./charts/charts", "./templateUtils"], function (require, exports, charts_1, templateUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class View {
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
            return `
<div class="w3-medium">
    ${this.drawHeader()}
        <div class="w3-display-container w3-row">
            </div>
            <div class="w3-cell-row">
                <div class="w3-cell w3-padding w3-mobile" style="width:50%"">
                ${this.drawHistory(model.historicalCapacity, model.showDescriptions)}
                ${this.drawForm(model.counter, model.remainingStories, model.nextSimulation, model.historicalCapacity, model.activeField)}
                ${this.drawFooter()}
            </div>
            <div class="w3-cell w3-padding w3-mobile" style="width:50%">
                ${model.showDescriptions ? this.drawDescription() : ""}
                ${this.drawData(model)}
            </div>
    </div>
</div>`;
        }
        drawHeader() {
            return `
            <div class="w3-display-container">
                <img src="montecarlo.jpg" class="w3-image">
                    <h1
                        class="w3-display-topleft w3-container w3-text-squeed-orange"
                        style="text-shadow:1px 1px 0 #000">
                        <b>MONTE CARLO SIMULATION</b>
                    </h1>
             </div>`;
        }
        drawDescription() {
            return `
            <h2>Description</h2>
            <p>
                The purpose of this application is to build understanding of how <b>Monte Carlo Simulation</b>
                works. To accomplish this a short description of the method and a short introduction to the
                scenario used in the application follows.
            </p>
            <p>
                <b>Monte Carlo Simulation</b> is a statistical method that, in this context, makes a
                forecast of how many more iterations we need to be able to close the remaning stories in the scope,
                based upon how much was delivered in the past. The forecast is built from a large number of
                samples generated as combinations of velocities from the previous iterations.
            </p>
            <div class="w3-card w3-squeed-orange w3-text-black w3-round w3-margin w3-padding">
                <p>
                    <b>Exercise Introduction</b> -
                    The table below shows the velocity of the teams for the last six iterations
                    and we have 100 stories remaning. When can they be delivered?
                    We use six iterations because a dice have six sides.
                    In real life it may be sufficient with data from three or four iterations.
                </p>
                <ol>
                    <li>Role six die (one for each column in the <i>Create Simulation Data</i> section)</li>
                    <li>
                        For each dice write the velocity that corresponds to number on the dice<br/>
                        (e.g. Dice with number two yields a velocity of seven)
                    </li>
                    <li>Press <i>Add</i> when all 6 numbers are entered.
                </ol>
                <p>
                    Continue as long as it makes sense and then you can use the
                    <i>Generate</i> button to get more samples faster.
                </p>
            </div>
            <p>
                Data calculated will be shown as a chart and in a table. In the table you can follow the calculations.
                The last sample is in the top of the table. For each sample the average velocity is calculated and this
                is used to get the remaining number of iterations to close the remaining stories
                (100 / average velocity).
            </p>`;
        }
        drawHistory(data, showDescriptions) {
            return `
            <h2>Througput the Last 6 Iterations</h2>
            <p>The table below shows the velocity of the team for the last 6 iterations</p>
            <table class="w3-table w3-centered">
                <thead>
                    <tr class="w3-squeed-orange w3-text-squeed-black">
                        ${data.reduce((accumulator, currentValue, currentIndex) => {
                return `${accumulator}
                                <th>
                                    <img
                                        src="die${currentIndex + 1}.svg"
                                        height="24px"
                                        width="24px" />
                                    <br/>
                                    Iteration ${currentIndex + 1}
                                </th>`;
            }, "")}
                    </tr>
                </thead>
                <tbody>
                    <tr class="w3-squeed-black">
                        ${data.reduce((accumulator, currentValue) => {
                return `${accumulator}\n<td>${currentValue}</td>`;
            }, "")}
                    </tr>
                </tbody>
            </table>`;
        }
        drawForm(count, remainingStories, data, historicalCapacity, field) {
            return `
            <h2>Create Simulation Data</h2>
                <p>
                    <b>Remaining Stories: </b>
                    <input
                        type="text"
                        name="stories"
                        value="${remainingStories}"
                        class="w3-squeed-black w3-border-white w3-center"
                        style="display: inline-block"
                        onchange="send({subject: 'stories', action: 'edit', data: this.value})">
                </p>
                <p>The table below shows the six volocities building the next sample</p>
                <table class="w3-table w3-centered">
                    <thead>
                        <tr class="w3-squeed-orange w3-text-squeed-black w3-center">
                            ${templateUtils_1.repeatElements("th", [1, 2, 3, 4, 5, 6], "Iteration ")}
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="w3-squeed-black">
                            ${data.reduce((accumulator, currentValue, currentIndex) => {
                return `${accumulator}
                                    <td class="w3-center">
                                        ${templateUtils_1.generateDiceDropdown("field0" + (currentIndex + 1), currentValue, historicalCapacity, currentIndex === data.length - 1 ? "right" : "left")}
                                    </td>`;
            }, "")}
                        </tr>
                    </tbody>
                </table>
                <br/>
                <div class="w3-row">
                    ${templateUtils_1.generateButton("Add", "add", count)}
                    <div class="w3-col" style="width:4%">&nbsp</div>
                    ${templateUtils_1.generateButton("Roll Die", "generate", count)}
                    <div class="w3-col" style="width:4%">&nbsp</div>
                    ${templateUtils_1.generateButton("Generate 100", "generate100", count)}
                    <div class="w3-col" style="width:4%">&nbsp</div>
                    ${templateUtils_1.generateButton("Reset", "reset")}
                </div>`;
        }
        drawData(model) {
            const data = model.calculatedData; // model.simulations; // :number[][],
            const remainingItems = model.remainingStories; // : number) {
            let output = "";
            if (data.length > 0) {
                output = `
                <h2>Simulation Visualization</h2>
                ${this.drawChart(model)}
                <h2>Simulation Data</h2>
                <table class="w3-table w3-centered">
                    <thead>
                        <tr class="w3-squeed-orange w3-text-squeed-black">
                            <th>Sample</th>
                            ${templateUtils_1.repeatElements("th", data[0], "Iteration ", true)}
                            <th>Average</th>
                            <th>Remaining Iterations</th>
                        </tr>
                    </thead>
                    <tbody>

                        ${data.reduceRight((accumulator, currentValue, currentIndex) => {
                    const sum = currentValue.reduce((a, b) => (a + b), 0);
                    const average = sum / currentValue.length;
                    const remainingIterations = Math.ceil(remainingItems / average);
                    return `${accumulator}
                                <tr class="w3-squeed-black">
                                    <td>${currentIndex + 1}</td>
                                    ${templateUtils_1.repeatElements("td", currentValue)}
                                    <td>${Math.ceil(average * 10) / 10}</td>
                                    <td>${remainingIterations}</td>
                                </tr>`;
                }, "")}
          </tbody>
          </table>`;
            }
            return output;
        }
        drawFooter() {
            return `<br /><img src="squeed_4c_neg.gif" width="100">`;
        }
        drawChart(model) {
            const vector = this.calculateVectors(model);
            const barChartData = this.generateChartData(vector);
            return charts_1.barChart(barChartData);
        }
        calculateVectors(model) {
            const vector = {};
            let sum;
            let average;
            let remaining;
            model.calculatedData.forEach((simulation) => {
                sum = simulation.reduce((a, b) => a + b, 0);
                average = sum / model.historicalCapacity.length;
                remaining = Math.ceil(model.remainingStories / average);
                if (vector[remaining] === undefined) {
                    vector[remaining] = 0;
                }
                vector[remaining]++;
            });
            return vector;
        }
        generateChartData(vector) {
            const barChartData = {
                data: {
                    type: "bar",
                    theme: "dark",
                    x: "x",
                    columns: [
                        { name: "x", values: [] },
                        { name: "serie 1", values: [] },
                    ],
                },
                axis: {
                    x: { type: "continuous" },
                },
            };
            for (const key in vector) {
                if (vector.hasOwnProperty(key)) {
                    barChartData.data.columns[0].values.push(Number(key));
                    barChartData.data.columns[1].values.push(vector[key]);
                }
            }
            console.log("Bar Chart Data");
            console.log(JSON.stringify((barChartData)));
            return barChartData;
        }
    }
    exports.View = View;
});
//# sourceMappingURL=view.js.map