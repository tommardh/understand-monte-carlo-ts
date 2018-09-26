export class Axis {

  constructor () {}

  static generateAxis(width: number, height: number, margin: number, chart: IChart, theme: ITheme) {
    let axis = "";

    if (this.hasAxis(chart)) {
        // const axisDist = Math.floor(margin / 2);
        if (this.hasYAxis(chart)) {
            axis += this.generateYAxis(width, height, margin, chart, theme);
        }
        if (this.hasXAxis(chart)) {
            axis += this.generateXAxis(width, height, margin, chart, theme);
        }
    } 
    return axis;
  }

  static hasXAxis(chart: IChart) {
    let result = true;
    if (chart.axis !== undefined) {
      if (chart.axis.x !== undefined) {
        if (chart.axis.x.show !== undefined) {
            result = chart.axis.x.show;
        }
      }  
    } 
    return result;
    //return !chart.axis || !chart.axis.x || !chart.axis.x.show || chart.axis.x.show;
  }

  static hasYAxis(chart: IChart) {
        let result = true;
    if (chart.axis !== undefined) {
      if (chart.axis.y !== undefined) {
        if (chart.axis.y.show !== undefined) {
            result = chart.axis.y.show;
        }
      }  
    } 
    return result;
    // return !chart.axis || !chart.axis.y || !chart.axis.y.show || chart.axis.y.show;
  }

  static hasAxis(chart: IChart) {
    return this.hasXAxis(chart) || this.hasYAxis(chart);
  }

  static generateXAxis(width: number, height: number, margin: number, chart: IChart, theme: ITheme) {
    let axis = "";
    const labels = this.getXAxisLabels(chart);
    const spaceBetweenBars = 0;
    const tickLength = 25;
    const axisDist = margin; // Math.floor(margin / 2);
    const tickCount = labels.length;
    const barWidth = Math.floor((width - margin * 2 - (tickCount - 1) * spaceBetweenBars) / tickCount);
    let x: number;
    let y: number;


    // let axis = "";
    // const spaceBetweenBars = 0;
    // const tickLength = 25;
    // const axisDist = margin; // Math.floor(margin / 2);
    // const tickCount = chart.data.columns[0].values.length;
    // const barWidth = Math.floor((width - margin * 2 - (tickCount - 1) * spaceBetweenBars) / tickCount);
    // let x: number;
    // let y: number;
    // const labels = this.getXAxisLabels(chart);

    axis += "<line x1=" + (axisDist - tickLength) +            
                 " y1=" + (height - axisDist) +
                 " x2=" + (width - axisDist) +
                 " y2=" + (height - axisDist) +
                 " stroke=\"" +
                 theme.stroke +
                  "\" stroke-width=\"5\">" +
                 "</line>";

    for (let i = 0; i < tickCount; i++) {
      x = margin + Math.floor(barWidth/2) + i *(barWidth + spaceBetweenBars);
      y = height - margin;
      axis += "<line x1=" + x +            
                 " y1=" + y +
                 " x2=" + x +
                 " y2=" + (y + tickLength) +
                 " stroke=\"" +
                 theme.stroke + 
                 "\" stroke-width=\"5\">" +
                 "</line>";
      axis += "<text x=" + x +            
                 " y=" + (y + tickLength) +
                 " fill=\"" +
                 theme.stroke +
                 "\" alignment-baseline=\"hanging\" text-anchor=\"middle\" style=\"font-family: sans-serif; font-size: 48px\">" +
                 // "Jag heter Tom" +
                 labels[i] +
                 "</text>";
    }
    return axis;
  }

  static generateYAxis(width: number, height: number, margin: number, chart: IChart, theme: ITheme) {
    let axis = "";
    const spaceBetweenBars = 0;
    const tickLength = 25;
    const axisDist = margin;// Math.floor(margin / 2);
    let x: number;
    let y: number;
    const min = 0;
    const max = this.getMaxValue(chart); // Math.max(...chart.data.columns[0].values);
    let tickCount = 10;
    const labels = this.calculateTicks(min, max, tickCount);
    tickCount = labels.length;
    const barHeightFactor = (height - margin * 2) / max;
    
    axis += "<line x1=" + axisDist +            
                 " y1=" + axisDist +
                 " x2=" + axisDist +
                 " y2=" + (height - axisDist + tickLength) +
                 " stroke=\"" +
                 theme.stroke + 
                 "\" stroke-width=\"5\">" +
                 "</line>";

    for (let i = 0; i < tickCount; i++) {
      x = axisDist-tickLength;
      y = Math.floor(height - margin - Number(labels[i]) * barHeightFactor);
      axis += "<line x1=" + x +            
                 " y1=" + y +
                 " x2=" + (x + tickLength) +
                 " y2=" + y +
                 " stroke=\"" +
                 theme.stroke +
                 "\" stroke-width=\"5\">" +
                 "</line>";
      axis += "<text x=" + x +            
                 " y=" + y +
                 " fill=\"" +
                 theme.stroke +
                 "\" alignment-baseline=\"middle\" text-anchor=\"end\" style=\"font-family: sans-serif; font-size: 48px\">" +
                 labels[i] +
                 "</text>";
    }
    return axis;
  }

  static getXAxisLabels(chart: IChart) {
    let labels: string[];
    if (chart.data.x) {
      const xlabel = chart.data.x;
      const index = chart.data.columns.findIndex((column: IColumn) => column.name === xlabel)
      labels = chart.data.columns[index].values.map((x: number) => String(x));
      if (this.isXAxisTypeContinuous(chart)) {
        labels = this.addMissingXValues(labels); 
      }
    } else {
      labels = chart.data.columns[0].values.map((x: number, i: number) => String(i + 1));
    }
    return labels;
  }

  static addMissingXValues(data: string[]) {
    const numbers = data.map(x => Number(x));
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    for (let i = min + 1; i< max; i++) {
      if (numbers.indexOf(i) === -1) {
        data.push(i.toString());
      }
    }
    return data.sort((a, b) => {
      if (Number(a)<Number(b)) {
        return -1;
      } else if (Number(a)>Number(b)) {
        return 1;
      } else {
        return 0;
      }
    });
  }
 
  static calculateTicks(min: number, max: number, tickCount: number) {
    const span = max - min;
    let step = Math.pow(10, Math.floor(Math.log(span / tickCount) / Math.LN10));

    const err = tickCount / span * step;

    // Filter ticks to get closer to the desired count.
    if (err <= .15) step *= 10;
    else if (err <= .35) step *= 5;
    else if (err <= .75) step *= 2;

    // Round start and stop values to step interval.
    const tstart = Math.ceil(min / step) * step;
    const tstop = Math.floor(max / step) * step + step * .5;
    const labelDecimals = this.countDecimals(step);
    const ticks = [];

    // now generate ticks
    let i: number;
    for (i=tstart; i < tstop; i += step) {
        ticks.push(i.toFixed(labelDecimals));  
    } 
    // ticks.push(max); // last value equals max
    // ticks.push(i); // one more tick to get past max
    return ticks;
}

static countDecimals(value: number) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
}

static getMaxValue(chart: IChart) {
    let max: number;
    let index = 0;
    if (chart.data.x) {
      const xlabel = chart.data.x;
      index = chart.data.columns.findIndex((column: IColumn) => column.name !== xlabel);
    }
    if (chart.data.columns[index].values.length > 0) {
      max = Math.max(...chart.data.columns[index].values); 
    } else {
      max = 0;
    }
    return max;
  }

  static isXAxisTypeContinuous(chart: IChart) {
    let result = false;
    if (chart.axis) {
      if (chart.axis.x) {
        if (chart.axis.x.type ) {
          if (chart.axis.x.type === "continuous") {
            result = true;  
          }
        }
      }
    }
    return result;
  }
 

}
