import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_networkgraph from 'highcharts/modules/networkgraph';
HC_networkgraph(Highcharts);

@Component({
  selector: 'app-example-network',
  templateUrl: './example-network.component.html',
  styleUrls: ['./example-network.component.css']
})
export class ExampleNetworkComponent 
{
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'networkgraph',
      height: '500',
      width: window.innerWidth,
    },
    title: {
      text: 'Cafe network'
    },
    subtitle: {
        text: 'Reg is a cafe, blue are followers'
    },
    plotOptions: {
      networkgraph: {
        keys: ['from', 'to'],
        layoutAlgorithm: {
          enableSimulation: false,
          integration: 'euler',
          friction: 0
        },
      },
    },

    series: [
      {
        nodes: [{
          id: 'Cafe A',
          dataLabels: {
              enabled: true
          },
          marker: {
              radius: 20,
              fillColor: 'red'
          }
      }],
        marker: {
          radius: 10,
        },

        type: 'networkgraph',
        dataLabels: {
          enabled: true,
        },
        data: [
          ['Follower 1', 'Cafe A'],
          ['Follower 2', 'Cafe A'],
          ['Follower 4', 'Cafe A'],
          ['Follower 5', 'Cafe A'],
          ['Follower 6', 'Cafe A'],
          ['Follower 7', 'Cafe A'],
          ['Follower 2', 'Follower 4'],
          ['Follower 4', 'Follower 2'],
          ['Follower 2', 'Follower 3'],
          ['Follower 3', 'Follower 2'],
          ['Follower 4', 'Follower 3'],
          ['Follower 3', 'Follower 4'],
        ],
      },
    ],
  };


}
