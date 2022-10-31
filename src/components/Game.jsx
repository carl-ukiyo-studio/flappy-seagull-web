import React, { useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const {
    unityProvider,
    UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
    isLoaded,
    loadingProgression,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: "/game/FlappySeagull.loader.js",
    dataUrl: "/game/FlappySeagull.data.unityweb",
    frameworkUrl: "/game/FlappySeagull.framework.js.unityweb",
    codeUrl: "/game/FlappySeagull.wasm.unityweb",
  });

  const handleGameOver = useCallback((score) => {
    setIsGameOver(true);
    setScore(score);
    console.log(`Game Over ${userName}! You've scored ${score} points.`);
  }, []);

  const handlePlayAgain = useCallback(() => {
    setIsGameOver(false);
    console.log(`Playing Again!`);
  }, []);

  function goBackToHomePage() {
    navigate("/");
  }

  const Initialise = () => {
    const userNameFromLocalStorage = localStorage.getItem("username");
    if (userNameFromLocalStorage == null) {
      goBackToHomePage();
    } else {
      setUserName(userNameFromLocalStorage);
    }
  };

  useEffect(() => {
    Initialise();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      detachAndUnloadImmediate().catch((reason) => {
        console.log(reason);
      });
    };
  }, [detachAndUnloadImmediate]);

  useEffect(() => {
    addEventListener("GameOver", handleGameOver);
    addEventListener("PlayAgain", handlePlayAgain);
    return () => {
      removeEventListener("GameOver", handleGameOver);
      removeEventListener("PlayAgain", handlePlayAgain);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);

  // We'll round the loading progression to a whole number to represent the
  // percentage of the Unity Application that has loaded.
  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <div className="container mx-auto">
      <Unity className="w-full" unityProvider={unityProvider} />
      {isLoaded === false && (
        // We'll conditionally render the loading overlay if the Unity
        // Application is not loaded.
        <div className="flex justify-center bg-gray-800 align-middle text-2xl font-medium  text-white">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}
      {isGameOver === true && (
        <div className="flex justify-center bg-gray-800 align-middle text-2xl font-medium text-white mt-4 py-4">
          <p>{`Game Over ${userName}! You've scored ${score} points.`}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
