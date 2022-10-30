import { Link } from "react-router-dom";
import BackButton from "./BackButton";

const Leaderboard = () => (
  <>
    <h1 className="text-3xl font-bold">Leaderboard</h1>
    <Link to="/">
      <BackButton/>
    </Link>
  </>
);

export default Leaderboard;
