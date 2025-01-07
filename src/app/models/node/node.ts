export class Node {

  public mac: string;

  public light: number;
  public temperature: number;
  public CO2: number;
  public humidity: number;

  constructor(node: any) {
    this.mac = node.mac;
    this.light = Number(node.light) || 0;
    this.temperature = Number(node.temperature) || 0;
    this.CO2 = Number(node.co2) || 0;
    this.humidity = Number(node.humidity) || 0;
  }

}
