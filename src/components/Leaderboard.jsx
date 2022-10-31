import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import trophy from "../assets/trophy.png";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const playersCollectionRef = collection(db, "players");
  const playersQuery = query(playersCollectionRef, orderBy("score", "desc"));

  const getPlayers = async () => {
    setLoading(true);
    const data = await getDocs(playersQuery);
    const playersData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setPlayers(playersData);
  };

  useEffect(() => {
    getPlayers().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mx-auto max-w-sm text-center">
      <h1 className="m-4 inline-flex items-center text-center text-3xl font-bold">
        <img
          src={trophy}
          alt="trophy icon"
          className="mr-2 -ml-1 h-10 w-10"
        />
        Leaderboard
      </h1>

      {loading ? <ListPlaceholder /> : <LeaderboardTable players={players} />}
    </div>
  );
};

const LeaderboardTable = ({ players }) => (
  <div className="relative overflow-x-auto rounded-lg shadow-md">
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
        {players.map((player, index) => (
          <tr
            className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            key={player.id}
          >
            <th
              scope="row"
              className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
            >
              {index + 1}
            </th>
            <td className="py-4 px-6">{player.id}</td>
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
