import * as React from 'react';

import { ExpoToastViewProps } from './ExpoToast.types';

export default function ExpoToastView(props: ExpoToastViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
