import {Injectable} from '@angular/core';
import {Chart} from "chart.js/auto";

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  public charts: any = {};

  constructor() {}

  trendChart(options: any){
    const { ctx, id, data, color } = options;

    const labels = data.map((value: number) => '');

    if(this.charts[id]){
      this.charts[id].data.labels = labels;
      this.charts[id].data.datasets[0].data = data;
      this.charts[id].data.datasets[0].borderColor = color;
      this.charts[id].update();
      return;
    }

    this.charts[id] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: '',
            data: data,
            borderColor: color,
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    });


  }
  hideTrendChart(id: string){
    if(!this.charts[id]){ return; }

    this.charts[id].destroy();
    this.charts[id] = null;
  }

}
