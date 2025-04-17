// Reexport the native module. On web, it will be resolved to ExpoToastModule.web.ts
// and on native platforms to ExpoToastModule.ts
export { default } from './ExpoToastModule';
export { default as ExpoToastView } from './ExpoToastView';
export * from  './ExpoToast.types';
