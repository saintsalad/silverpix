import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoToastViewProps } from './ExpoToast.types';

const NativeView: React.ComponentType<ExpoToastViewProps> =
  requireNativeView('ExpoToast');

export default function ExpoToastView(props: ExpoToastViewProps) {
  return <NativeView {...props} />;
}
