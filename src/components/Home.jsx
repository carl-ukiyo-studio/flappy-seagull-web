import PlayForm from "./PlayForm";
import Header from "./Header";
import Leaderboard from "./Leaderboard";
import { useState } from "react";
import GameHint from "./GameHint";

const Home = () => {
  const [showHint, setShowHint] = useState(false);

  const onShowHint = () => {
    setShowHint(true);
  };

  const onHideHint = () => {
    setShowHint(false);
  };

  return (
    <>
      <Header/>

      <PlayForm/>

      {showHint ? (
        <>
          <GameHint/>
          <button
            onClick={onHideHint}
            type="button"
            className="mr-1 mb-1 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
          >
            Hide
          </button>
        </>
      ) : (
        <button
          onClick={onShowHint}
          type="button"
          className="mr-2 mb-2 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800"
        >
          How to play?
        </button>
      )}

      <Leaderboard/>
    </>
  );
};

export default Home;
