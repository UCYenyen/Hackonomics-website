'use client';

import { useEffect, useRef } from 'react';

export default function Game() {
  const unityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent duplicate script injection
    if (document.getElementById('unity-loader')) return;

    // Create the script tag for the Unity loader
    const script = document.createElement('script');
    script.id = 'unity-loader';
    script.src = '/unity/Fundation/Build/Fundation.loader.js';
    script.onload = () => {
      // @ts-ignore
      window.createUnityInstance(
        document.getElementById('unity-canvas'),
        {
          dataUrl: '/unity/Fundation/Build/Fundation.data',
          frameworkUrl: '/unity/Fundation/Build/Fundation.framework.js',
          codeUrl: '/unity/Fundation/Build/Fundation.wasm',
          streamingAssetsUrl: '/unity/Fundation/StreamingAssets',
          companyName: 'Betty', // match your Unity build
          productName: 'Fundation', // match your Unity build
          productVersion: '1.0',
        }
      );
    };
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      script.remove();
    };
  }, []);

  return (
    <div ref={unityRef} className="w-full h-full flex items-center justify-center bg-black">
      <canvas
        id="unity-canvas"
        width={960}
        height={600}
        style={{ width: '100%', height: '100%', background: '#231F20' }}
      />
    </div>
  );
}