'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const Game = forwardRef(function Game(props, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    toggleFullscreen() {
      if (canvasRef.current) {
        if (!document.fullscreenElement) {
          canvasRef.current.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
          });
        } else {
          document.exitFullscreen();
        }
      }
    },
  }));

  useEffect(() => {
    
    if (document.getElementById('unity-loader')) return;

    
    const script = document.createElement('script');
    script.id = 'unity-loader';
    script.src = '/unity/Fundation/Build/Fundation.loader.js';
    script.onload = () => {
      if (canvasRef.current) {
        // @ts-expect-error window.createUnityInstance is a global function provided by Unity loader
        window.createUnityInstance(
          canvasRef.current,
          {
            dataUrl: '/unity/Fundation/Build/Fundation.data',
            frameworkUrl: '/unity/Fundation/Build/Fundation.framework.js',
            codeUrl: '/unity/Fundation/Build/Fundation.wasm',
            streamingAssetsUrl: '/unity/Fundation/StreamingAssets',
            companyName: 'Betty', 
            productName: 'Fundation', 
            productVersion: '1.0',
          }
        );
      }
    };
    document.body.appendChild(script);

    
    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <canvas
        ref={canvasRef}
        id="unity-canvas"
        width={960}
        height={600}
        style={{ width: '100%', height: '100%', background: '#231F20' }}
      />
    </div>
  );
});

export default Game;