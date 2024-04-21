import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const SingleRecept = () => {
  const { id } = useParams();
  const { data: recept } = useFetch("http://localhost:3000/recepts/" + id);
  return (
    <div>
      {recept && (
        <div>
          <h1 className="text-2xl mb-4 font-semibold">Recept elements</h1>
          <img
            src={recept.image}
            alt=""
            className="w-full h-80 object-cover rounded mb-5 "
          />
          <div>
            <h1 className="font-bold text-2xl mb-5">{recept.name}</h1>
          </div>
          <span className="flex gap-2 justify-start items-center mb-3">
            Ingredients:
            <span className="flex gap-2">
              {recept.ingredients.map((ing) => {
                return (
                  <span className="btn btn-primary-content" key={ing}>
                    {ing}
                  </span>
                );
              })}
            </span>
          </span>
          <p className="mb-3">
            Cooking time:
            <span className="p-1 bg-slate-200 rounded-lg">
              {" "}
              {recept.time} minutes
            </span>
          </p>
          <div className="mb-3">
            <p className="text-xl font-medium mb-3">Method</p>
            <p>{recept.body}</p>
          </div>
        </div>
      )}
      <div className="text-right">
        <Link to="/" className=" btn btn-primary ">
          Back
        </Link>
      </div>
    </div>
  );
};

export default SingleRecept;
