import { NativeModule, requireNativeModule } from 'expo';

import { ExpoToastModuleEvents } from './ExpoToast.types';

declare class ExpoToastModule extends NativeModule<ExpoToastModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoToastModule>('ExpoToast');
