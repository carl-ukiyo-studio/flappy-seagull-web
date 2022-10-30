import PlayForm from "./PlayForm";
import Header from "./Header";
import LeaderboardButton from "./LeaderboardButton";

const Home = () => (
  <>
    <Header/>

    <PlayForm/>
    <LeaderboardButton/>

    <div className="block max-w-sm rounded-lg border border-gray-900 bg-gray-800 p-6 text-center shadow-md">
      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
        You are a seagull trying to navigate the streets of Brighton City.
      </h5>
      <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
        Use mouse click or space bar to flap your wings and fly through the city
        trying to avoid the obstacles in the way. See how many points you can
        score!
      </p>
    </div>
  </>
);

export default Home;
