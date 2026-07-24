'use client';

import dynamic from 'next/dynamic';

const BackgroundCanvas = dynamic(
  () => import('./BackgroundCanvas'),
  { ssr: false, loading: () => null }
);

export default function BackgroundCanvasLoader() {
  return <BackgroundCanvas />;
}
