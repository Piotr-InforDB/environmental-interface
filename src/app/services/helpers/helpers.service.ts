import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  async post(path: string, data: any = {}){
    return await axios.post(`https://environmental-nodes.meandthebois.com/${path}`, data);
  }

  sensorColor(sensor: string): string{
    switch (sensor.toLowerCase()){
      case 'temperature': return '#FF6F61'
      case 'humidity': return '#5DADE2'
      case 'co2': return '#58D68D'
      case 'light': return '#F4D03F'
      default : return '#FFFFFF'
    }
  }

}
