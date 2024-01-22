import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import HC_networkgraph from 'highcharts/modules/networkgraph';
import * as WheelZoom from 'highcharts/modules/mouse-wheel-zoom';
HC_networkgraph(Highcharts);

@Component({
  selector: 'app-instagram-network',
  templateUrl: './instagram-network.component.html',
  styleUrls: ['./instagram-network.component.css']
})
export class InstagramNetworkComponent {
  //#region Properties

  public title: string | undefined;

  public Highcharts: typeof Highcharts = Highcharts;

  public chartOptions: Highcharts.Options = {
    chart: {
      reflow: false,
      animation: false,
      type: 'networkgraph',
      height: 700,
      width: 800,
      zooming: {
        mouseWheel: true,
        type: 'xy',
        key: 'ctrl'
      }
    },
    boost: {
      useGPUTranslations: true,
      usePreallocated: true
    },
    pane: {
      center : ['50%', '50%'],
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
        onPoint: {
          position: {
            x: 100,
            y: 100
          }
        }
      },
      area: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
        arearange: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
        areaspline: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
        areasplinerange: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
        bar: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
        boxplot: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
        bubble: { animation: false, enableMouseTracking: false, stickyTracking: true, dataLabels: { style: { textShadow: false } } },
        column: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
        columnrange: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
        errorbar: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
        funnel: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
        gauge: { animation: false, enableMouseTracking: false, stickyTracking: true, dataLabels: { style: { textShadow: false } } },
        heatmap: { animation: false, enableMouseTracking: false, stickyTracking: true, dataLabels: { style: { textShadow: false } } },
        line: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
        pie: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
        polygon: { animation: false, enableMouseTracking: false, stickyTracking: true, dataLabels: { style: { textShadow: false } } },
        pyramid: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
        scatter: { animation: false, enableMouseTracking: false, stickyTracking: true, dataLabels: { style: { textShadow: false } } },
        series: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
        solidgauge: { animation: false, enableMouseTracking: false, stickyTracking: true, dataLabels: { style: { textShadow: false } } },
        spline: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
        treemap: { animation: false, enableMouseTracking: false, stickyTracking: true, dataLabels: { style: { textShadow: false } } },
        waterfall: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
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
        ],
      },
    ],
  };

  public isLoaded: boolean = false;

  //#endregion Properties

  //#region Data members

  private _fileName: string | undefined;

  //#endregion Data members

  //#region Getters and Setters

  @Input()
  public set inputTitle(value: string) {
    this.title = value;
  }

  @Input()
  public set fileNameInput(value: string) {
    this._fileName = value;
  }

  //#endregion Getters and Setters

  //#region Constructors

  constructor(private httpClient: HttpClient)
  {
  }

  //#endregion Constructors

  //#region Methods

  public async loadNetwork(): Promise<void> 
  {
    await this.httpClient.get(`assets/networks_restaurants/${this._fileName}.json`).toPromise()
      .then((response: any) => 
        {
          this.chartOptions.series = [
            {
              nodes: [{
                id: this._fileName,
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
              data: response["data"],
            },
          ];
        });
  }

  public async onLoadClicked(): Promise<void>
  {
    await this.loadNetwork();
    this.isLoaded = true;
  }

  public onHideClicked(): void
  {
    this.isLoaded = false;

    this.chartOptions.series = [
      {
        nodes: [{
          id: this._fileName,
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
        data: [],
      },
    ];
  }

  //#endregion Methods
}
