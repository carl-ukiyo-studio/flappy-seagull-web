import React, { useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Game = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const navigate = useNavigate();
  const userName = localStorage.getItem("username");

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

  const getPlayer = async () => {
    debugger;
    const docRef = doc(db, "players", userName);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const player = docSnap.data();
        console.log(player);
        setHighScore(player.score);
        console.log(highScore);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveHighScore = (score) => {
    debugger;
    if (score > highScore) {
      setHighScore(score);
      saveHighScoreToDatabase(score);
    }
  };

  const saveHighScoreToDatabase = (score) => {
    const docRef = doc(db, "players", userName);
    const data = {
      score: score,
    };
    setDoc(docRef, data)
      .then((docRef) => {
        console.log("Entire Document has been updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGameOver = useCallback((score) => {
    setIsGameOver(true);
    setScore(score);
    console.log(`Game Over ${userName}! You've scored ${score} points.`);
    saveHighScore(score);
    // eslint-disable-next-line
  }, []);

  const handlePlayAgain = useCallback(() => {
    setIsGameOver(false);
    console.log(`Playing Again!`);
  }, []);

  function goBackToHomePage() {
    navigate("/");
  }

  useEffect(() => {
    return () => {
      detachAndUnloadImmediate().catch((reason) => {
        console.log(reason);
      });
    };
  }, [detachAndUnloadImmediate]);

  useEffect(() => {
    if (userName == null) {
      goBackToHomePage();
    }
    getPlayer().then((r) => {
      addEventListener("GameOver", handleGameOver);
      addEventListener("PlayAgain", handlePlayAgain);
    });
    return () => {
      removeEventListener("GameOver", handleGameOver);
      removeEventListener("PlayAgain", handlePlayAgain);
    };
    // eslint-disable-next-line
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
        <div className="mt-4 flex justify-center bg-gray-800 py-4 align-middle text-2xl font-medium text-white">
          <p>{`Game Over ${userName}! You've scored ${score} points.`}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
