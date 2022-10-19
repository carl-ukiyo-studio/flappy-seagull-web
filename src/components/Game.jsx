import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const Game = () => {
  const {
    unityProvider,
    UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
    isLoaded, loadingProgression
  } = useUnityContext({
    loaderUrl: "/game/FlappySeagull.loader.js",
    dataUrl: "/game/FlappySeagull.data.unityweb",
    frameworkUrl: "/game/FlappySeagull.framework.js.unityweb",
    codeUrl: "/game/FlappySeagull.wasm.unityweb",
  });

  useEffect(() => {
    return () => {
      detachAndUnloadImmediate().catch((reason) => {
        console.log(reason);
      });
    };
  }, [detachAndUnloadImmediate]);

  // We'll round the loading progression to a whole number to represent the
  // percentage of the Unity Application that has loaded.
  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <div className="container mx-auto">
      <Unity
        className="w-full"
        unityProvider={unityProvider}
      />
      {isLoaded === false && (
        // We'll conditionally render the loading overlay if the Unity
        // Application is not loaded.
        <div className="bg-gray-800 flex justify-center align-middle text-white font-medium  text-2xl">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}
    </div>
  );
};

export default Game;
