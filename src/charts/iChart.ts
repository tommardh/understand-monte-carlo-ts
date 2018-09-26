interface IChart {
    data: IChartData;
    axis?: IChartAxis;
    bar?: IBar;
}
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
//     },
//     axis: {
//           x: {
//               show: false
//           },
//           y: {
//               show: true
//           }
//      }
// }


/*
      const barChartData: IChart = {
                                  data: {
                                      type: "bar",
                                      x: "x",
                                      columns: [
                                          {
                                              name: "x",
                                              values: [11, 15, 20]
                                          },
                                          {
                                              name: "serie 1",
                                              values: [1, 20, 3]
                                          }
                                      ]
                                  },
                                  axis: {
                                    x: {
                                      show: true,
                                      type: "continuous"
                                    },
                                    y: {
                                      show: true
                                    }
                                  },
                                  bar: {
                                    padding: 0.25
                                  }
                              };

*/