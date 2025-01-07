import { Component } from '@angular/core';
import {HubService} from "../services/hub/hub.service";
import { Chart } from 'chart.js/auto';
import {ChartsService} from "../services/charts/charts.service";
import {HelpersService} from "../services/helpers/helpers.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  public trend_charts: any = {};

  constructor(
    public hub: HubService,
    public charts: ChartsService,
    public helpers: HelpersService,
  ) {}

  // Nodes
  async refreshHub(event: any){
    await this.hub.refresh();
    event.target.complete();
  }

  //Trend Charts
  async sensorTrendChart(sensor: string, mac: string){
    if(this.trend_charts[mac] == sensor){
      this.trend_charts[mac] = null;
      this.charts.hideTrendChart(mac);
      return;
    }

    this.trend_charts[mac] = sensor;

    const ctx = document.getElementById(`node-chart-${mac}`) as HTMLCanvasElement;
    const data = await this.hub.nodeData({
      node_mac_address: mac,
      sensor: sensor,
      sub_hours: 6,
    });

    this.charts.trendChart({
      ctx: ctx,
      id: mac,
      data: data,
      color: this.helpers.sensorColor( sensor )
    });


  }

}
