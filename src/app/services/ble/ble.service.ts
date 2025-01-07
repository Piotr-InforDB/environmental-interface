import { Injectable } from '@angular/core';
import { BluetoothLe } from '@capacitor-community/bluetooth-le';

@Injectable({
  providedIn: 'root'
})
export class BleService {

  public scanning: boolean = false;
  private serviceUuid = '12345678-1234-1234-1234-1234567890ab';
  private characteristicUuid = 'abcdef01-1234-1234-1234-1234567890ab';

  constructor() { }

  async initialize() {
    const result = await BluetoothLe.initialize();
    console.log('Bluetooth initialized', result);
  }

  async scanForDevices(): Promise<any> {

    return new Promise(async resolve => {
      await BluetoothLe.requestLEScan({});

      BluetoothLe.addListener('onScanResult', (result) => {
        if (result.localName === 'Environmental Node Hub') {
          alert('FOUND')
          resolve(result);
        }
      });

      setTimeout(async () => {
        await BluetoothLe.stopLEScan();
        resolve(null);
        alert(`Scanning stopped.`);
      }, 10000);
    })
  }

  async connectToDevice(deviceId: string) {
    const connection = await BluetoothLe.connect({ deviceId });
    alert(`Connected to device: ${JSON.stringify(connection)}`);

    const macAddress = await this.readCharacteristic(deviceId);
    alert(`MAC Address: ${JSON.stringify(macAddress)}`);
    return macAddress;
  }

  async readCharacteristic(deviceId: string) {
    const response = await BluetoothLe.read({
      deviceId,
      service: this.serviceUuid,
      characteristic: this.characteristicUuid,
    })
    alert(JSON.stringify(response));

    // return new TextDecoder().decode(response.value);
  }

  async disconnectFromDevice(deviceId: string) {
    await BluetoothLe.disconnect({ deviceId });
    alert(`Disconnected from device: ${deviceId}`);
  }

}
