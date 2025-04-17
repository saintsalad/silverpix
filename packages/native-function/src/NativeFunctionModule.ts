import { NativeModule, requireNativeModule } from "expo";

import { NativeFunctionModuleEvents } from "./NativeFunction.types";

declare class NativeFunctionModule extends NativeModule<NativeFunctionModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
  showToast(message: string): void;
  likePhoto(imageId: string): Promise<string>;
  isPhotoFavorite(imageId: string): Promise<boolean>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<NativeFunctionModule>("NativeFunction");
