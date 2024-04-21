import ReceptsList from "../components/ReceptsList";
import { useFetch } from "../hooks/useFetch";
const Home = () => {
  const {
    data: recepts,
    error,
    isPending,
  } = useFetch("http://localhost:3000/recepts");

  if (error) {
    return <h1 className="text-center text-4xl mt-48 font-bold">{error}</h1>;
  }
  if (isPending) {
    return (
      <h1 className="text-center text-4xl mt-48 font-bold">{isPending}</h1>
    );
  }
  return <div>{recepts && <ReceptsList recepts={recepts} />}</div>;
};
export default Home;
