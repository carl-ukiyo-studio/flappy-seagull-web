import { Link } from "react-router-dom";
import trophy from "../assets/trophy.png";

const LeaderboardButton = () => (
  <div className="m-8">
    <Link to="/leaderboard">
      <button type="button"
              className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
        <img src={trophy} alt="trophy icon" className="mr-2 -ml-1 w-5 h-5"/>
        Leaderboard
      </button>
    </Link>
  </div>
);
export default LeaderboardButton;
