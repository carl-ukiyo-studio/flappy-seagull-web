import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const playersCollectionRef = collection(db, "players");

  const getPlayers = async () => {
    setLoading(true);
    const data = await getDocs(playersCollectionRef);
    const playersData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    setPlayers(playersData);
  };

  useEffect(() => {
    getPlayers().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold">Leaderboard</h1>

      {loading ? <ListPlaceholder /> : <LeaderboardTable players={players} />}

      <BackButton />
    </>
  );
};

const LeaderboardTable = ({ players }) => (
  <div className="relative overflow-x-auto">
    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="py-3 px-6">
            #
          </th>
          <th scope="col" className="py-3 px-6">
            Name
          </th>
          <th scope="col" className="py-3 px-6">
            Score
          </th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800" key={player.id}>
            <th
              scope="row"
              className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
            >
              {player.position}
            </th>
            <td className="py-4 px-6">{player.name}</td>
            <td className="py-4 px-6">{player.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ListPlaceholder = () => (
  <div
    role="status"
    className="max-w-md animate-pulse space-y-4 divide-y divide-gray-200 rounded border border-gray-200 p-4 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
      <div>
        <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
      <div>
        <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
      <div>
        <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
      <div>
        <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
    </div>
    <span className="sr-only">Loading...</span>
  </div>
);

export default Leaderboard;
