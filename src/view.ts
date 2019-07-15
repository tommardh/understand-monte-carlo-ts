import { barChart } from "./charts/charts";
import { generateButton, repeatElements } from "./templateUtils";

export class View {

    public display(representation: string) {
        const stateRepresentation = document.getElementById("view");
        if (stateRepresentation) {
            stateRepresentation.innerHTML = representation;
        }
    }

    public init(model: IModel) {
        return this.ready(model);
    }

    public ready(model: IModel) {
        console.log("model: -----------------------");
        console.log(JSON.stringify(model));
        return `
${this.drawHeader()}
<div class="w3-display-container w3-row">
${generateButton("Show descriptions", "showDescriptions", model.counter)}
</div>
${model.showDescriptions ? this.drawDescription() : ""}
${this.drawHistory(model.historicalCapacity, model.showDescriptions)}
${this.drawForm(model.counter, model.remainingStories, model.nextSimulation, model.activeField)}
${this.drawData(model)}
${this.drawFooter()}`;
    }

    private drawHeader() {
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

    private drawDescription() {
        return `
            <h2>Introduction</h2>
            <p>
                The purpose of this application is to build understanding of how <b>Monte Carlo Simulation</b>
                works. To accomplish this a short description of the method and a short introduction to the
                scenario used in the application follows.
            </p>
            <p>
                <b>Monte Carlo Simulation</b> is a statistical method that we use, in this context, to make a
                forecast of how many more iterations we need to be able to close the remaning stories in our scope,
                based upon how much we have delivered in the past. The forecast is built from a large number of
                samples generated as combinations of velocities from our previous iterations.
            </p>
            <p>
                <b>Exercise Introduction</b> - The table below shows the velocity of the teams for the last 6 iterations
                and we have 100 stories remaning. When can they be delivered?
                We use 6 iterations because a die have 6 sides.
                In real life it may be sufficient with data from three or four iterations.
            </p>
            <ol>
                <li>Role 6 dice (one for each column in the <i>Create Simulation Data</i> section)</li>
                <li>
                    For each die write the velocity that corresponds to number on the die (e.g.
                    Die with number 2 yields a velocity of 7)
                </li>
                <li>Press <i>Add</i> when all 6 numbers are entered.
            </ol>
            <p>
                Continue as long as it makes sense and then you can use the
                <i>Generate</i> buttons to get more samples faster.
            </p>
            <p>
                Data calculated will be shown as a chart and in a table. In the table you can follow the calculations.
                The last sample is in the top of the table. For each sample the average velocity is calculated and this
                is used to get the remaining number of iterations to close the remaining stories
                (100 / average velocity).
            </p>`;
    }

    private drawHistory(data: number[], showDescriptions: boolean) {
        return `
            <h2>Througput the Last 6 Iterations</h2>
            ${showDescriptions ? `<p>The table below shows the velocity of the team for the last 6 iterations</p>` : ""}
            <table class="w3-table w3-centered">
                <thead>
                    <tr class="w3-squeed-orange w3-text-squeed-black">
                        ${data.reduce<string>((accumulator: string, currentValue: number, currentIndex: number) => {
                            return `${accumulator}
                                <th>
                                    <img
                                        src="die${currentIndex + 1}.svg"
                                        height="24px"
                                        width="24px" />
                                    Iteration ${currentIndex + 1}
                                </th>`;
                        }, "")}
                    </tr>
                </thead>
                <tbody>
                    <tr class="w3-squeed-black">
                        ${data.reduce<string>((accumulator: string, currentValue: number) => {
                            return `${accumulator}\n<td>${currentValue}</td>`;
                        }, "")}
                    </tr>
                </tbody>
            </table>`;
    }

    private drawForm(count: number, remainingStories: number, data: number[], field: string) {
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
                        onchange="send({subject: 'stories', action: 'edit', data: {text: this.value}})">
                </p>
                <table class="w3-table w3-centered">
                    <thead>
                        <tr class="w3-squeed-orange w3-text-squeed-black w3-center">
                            ${repeatElements("th", [1, 2, 3, 4, 5, 6], "Iteration ")}
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="w3-squeed-black">
                            ${data.reduce<string>((accumulator: string, currentValue: number, currentIndex: number) => {
                                return `${accumulator}
                                    <td>
                                        <input
                                            type="text"
                                            name="field0${currentValue}"
                                            value="${data[currentIndex] === 0 ? "" : data[currentIndex]}"
                                            class="w3-squeed-black w3-border-squeed-black w3-center"
                                            size="4"
                                            style="display: inline-block"
                                            onchange="send({
                                                subject: 'field0${currentIndex + 1}',
                                                action: 'edit',
                                                data: {text: this.value}
                                            })"
                                            ${field === "field0" + (currentIndex + 1) ? "autofocus>" : ">"}
                                    </td>`;
                            }, "")}
                        </tr>
                    </tbody>
                </table>
                <br/>
                <div class="w3-row">
                    ${generateButton("Add", "add", count)}
                    <div class="w3-col" style="width:4%">&nbsp</div>
                    ${generateButton("Generate", "generate", count)}
                    <div class="w3-col" style="width:4%">&nbsp</div>
                    ${generateButton("Generate 100", "generate100", count)}
                    <div class="w3-col" style="width:4%">&nbsp</div>
                    ${generateButton("Reset", "reset", count)}
                </div>`;
    }

    private drawData(model: IModel) {
        const data = model.simulations; // :number[][],
        const remainingItems = model.remainingStories; // : number) {
        let output: string = "";
        if (data.length > 0) {
            output = `
                <h2>Simulation Data</h2>
                ${this.drawChart(model)}
                <table class="w3-table w3-centered">
                    <thead>
                        <tr class="w3-squeed-orange w3-text-squeed-black">
                            <th>Sample</th>
                            ${repeatElements("th", data[0], "Iteration ", true)}
                            <th>Average</th>
                            <th>Remaining Iterations</th>
                        </tr>
                    </thead>
                    <tbody>

                        ${data.reduceRight<string>((
                            accumulator: string,
                            currentValue: number[],
                            currentIndex: number,
                        ) => {
                            const sum = currentValue.reduce((a, b) => (a + b), 0);
                            const average = Math.floor(sum / currentValue.length);
                            const remainingIterations = Math.floor(remainingItems / average);

                            return `${accumulator}
                                <tr class="w3-squeed-black">
                                    <td>${currentIndex + 1}</td>
                                    ${repeatElements("td", currentValue)}
                                    <td>${average}</td>
                                    <td>${remainingIterations}</td>
                                </tr>`;
                        }, "")}
          </tbody>
          </table>`;
        }
        return output;
    }

    private drawFooter() {
      return `<br /><img src="squeed_4c_neg.gif" width="100">`;
    }

    private drawChart(model: IModel) {
        const vector = this.calculateVectors(model);
        const barChartData = this.generateChartData(vector);
        return barChart(barChartData);
    }

    private calculateVectors(model: IModel) {
      const vector: IVector = {};
      let sum: number;
      let average: number;
      let remaining: number;
      model.simulations.forEach((simulation) => {
          sum = simulation.reduce((a, b) => a + b, 0);
          average = sum / model.historicalCapacity.length;
          remaining = Math.floor(model.remainingStories / average);
          if (vector[remaining] === undefined) {
              vector[remaining] = 0;
          }
          vector[remaining]++;
      });

      return vector;
    }

    private generateChartData(vector: IVector) {
        const barChartData: IChart = {
            data: {
                type: "bar",
                theme: "dark",
                x: "x",
                columns: [
                    { name: "x", values: []},
                    { name: "serie 1", values: []},
                ],
            },
            axis: {
              x: { type: "continuous"},
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
