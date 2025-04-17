import { registerWebModule, NativeModule } from 'expo';

import { ExpoToastModuleEvents } from './ExpoToast.types';

class ExpoToastModule extends NativeModule<ExpoToastModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoToastModule);
