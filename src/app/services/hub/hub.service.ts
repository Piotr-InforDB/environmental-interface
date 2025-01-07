import { Injectable } from '@angular/core';
import { Node } from '../../models/node/node'
import {HelpersService} from "../helpers/helpers.service";

@Injectable({
  providedIn: 'root'
})
export class HubService {

  // public mac_address = localStorage.getItem('hub_mac_address');
  public mac_address = "FC:E8:C0:74:96:08";
  public nodes: Node[] = [];

  public seconds_till_refresh: number | null = null;
  public refreshed_at: number = (new Date).getTime();
  public refresh_interval: number = 60;

  constructor(
    private helpers: HelpersService,
  ) {
    this.refresh();
    this.initRefreshTimer();
  }

  async refresh(){
    if(!this.mac_address){ return; }
    this.refreshed_at = new Date().getTime();

    const { data } = await this.helpers.post('api/hub/latest', { hub_mac_address: this.mac_address });

    this.nodes = data.nodes.map((node: any) => {
      return new Node(node);
    })
  }
  initRefreshTimer(){
    setInterval(() => {
      const diff = Number( (((new Date).getTime() - this.refreshed_at) / 1000).toFixed(0) );
      this.seconds_till_refresh = this.refresh_interval - diff;

      if(this.seconds_till_refresh <= 0){ this.refresh(); }
    }, 1000);
  }

  async nodeData(options: any){
    const { data } = await this.helpers.post('api/node/get', options)
    return data.data.map((value: string) => Number(value));
  }

}
