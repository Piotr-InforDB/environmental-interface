import { Component } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  public devices: any[] = [];

  constructor(
  ) {}

  ionViewWillEnter(){

    this.init();

  }

  async init(){
    await BleClient.initialize();

    const device = await BleClient.requestDevice({
      services: ['your-service-uuid'],
    });

  }

}
