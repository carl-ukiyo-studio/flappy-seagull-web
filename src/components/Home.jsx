import Button from "./Button";
import Header from "./Header";
import { Link } from "react-router-dom";

const Home = () => (
  <>
    <Header />
    <Link to="/game">
      <Button>Play</Button>
    </Link>
  </>
);

export default Home;
