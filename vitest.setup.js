// vitest.setup.ts
import { afterAll, vi } from 'vitest';
// @ts-expect-error: Global type missing
global.jest = vi;
// eslint-disable-next-line import/first
import getCanvasWindow from 'jest-canvas-mock/lib/window';

const apis = [
  'Path2D',
  'CanvasGradient',
  'CanvasPattern',
  'CanvasRenderingContext2D',
  'DOMMatrix',
  'ImageData',
  'TextMetrics',
  'ImageBitmap',
  'createImageBitmap',
];

const canvasWindow = getCanvasWindow({ document: window.document });

apis.forEach((api) => {
  // @ts-expect-error: Global type missing
  global[api] = canvasWindow[api];
  // @ts-expect-error: Global type missing
  global.window[api] = canvasWindow[api];
});

afterAll(() => {
  // @ts-expect-error: type
  delete global.jest;
  // @ts-expect-error: type
  delete global.window.jest;
});
