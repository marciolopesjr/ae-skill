#!/usr/bin/env node

const path = require('node:path');
const {bundle} = require('@remotion/bundler');
const {getCompositions, renderMedia} = require('@remotion/renderer');
const {enableTailwind} = require('@remotion/tailwind-v4');

const compositionId = process.env.COMPOSITION || process.argv[2];
const audioOutput = process.env.AUDIO_OUTPUT || process.argv[3];
const remotionGl = process.env.REMOTION_GL || 'angle-egl';

if (!compositionId) {
  throw new Error('Missing composition id. Usage: render-audio.cjs <composition> <output.aac>');
}

if (!audioOutput) {
  throw new Error('Missing audio output. Usage: render-audio.cjs <composition> <output.aac>');
}

const renderAudio = async () => {
  const serveUrl = await bundle({
    entryPoint: path.resolve('src/index.ts'),
    webpackOverride: enableTailwind,
  });

  const compositions = await getCompositions(serveUrl);
  const composition = compositions.find((candidate) => candidate.id === compositionId);

  if (!composition) {
    throw new Error(`Composition not found: ${compositionId}`);
  }

  await renderMedia({
    composition,
    serveUrl,
    codec: 'aac',
    outputLocation: path.resolve(audioOutput),
    overwrite: true,
    chromiumOptions: {
      gl: remotionGl,
    },
    logLevel: process.env.REMOTION_AUDIO_LOG_LEVEL || 'warn',
  });
};

renderAudio().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
