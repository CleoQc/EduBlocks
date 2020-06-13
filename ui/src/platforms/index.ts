import { Platform, PlatformInterface, PlatformSelection } from '../types';
import { newCalliopePlatform } from './calliope';
import { newCircuitPythonPlatform } from './circuitpython';
import { newMicrobitPlatform } from './microbit';
import { newRaspberryPiPlatform } from './raspberrypi';
import { newWebPlatform } from './python';


export function getPlatformList(): PlatformSelection[] {
  return [
    { platform: 'RaspberryPi', title: 'Raspberry Pi', image: '/images/pi.png', help: 'https://edublocks.org/pi.html' },
  ];
}

export async function getPlatform(platform: Platform): Promise<PlatformInterface> {
  switch (platform) {
    case 'Python':
      return newWebPlatform();
    case 'MicroBit':
      return newMicrobitPlatform(); 
    case 'RaspberryPi':
      return newRaspberryPiPlatform();
    case 'CircuitPython': 
      return newCircuitPythonPlatform();
    case 'Calliope':
      return newCalliopePlatform();
    default:
      throw new Error('Invalid platform: ' + platform);
      
  }
  
  
}
