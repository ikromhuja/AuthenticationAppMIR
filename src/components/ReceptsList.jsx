import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { useState } from "react";
const ReceptsList = ({ recepts }) => {
  const [check, setCheck] = useState(0);
  const deleteRecept = (id) => {
    fetch("http://localhost:3000/recepts/" + id, {
      method: "DELETE",
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setCheck(Math.random());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">Recepts</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 ">
        {recepts.map((recept) => {
          return (
            <div key={recept.id} className="card  bg-base-100 shadow-xl">
              <figure>
                <img
                  src={recept.image}
                  alt="Shoes"
                  className=" h-[200px] w-full object-cover md:h-auto  "
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl">{recept.name}</h2>
                <span className="">{recept.time} minutes</span>
                <p className="line-clamp-3">{recept.body}</p>

                <div className="card-actions flex-nowrap items-center">
                  <Link
                    to={`/singleRecept/${recept.id}`}
                    className="btn btn-sm  md:btn-md btn-primary "
                  >
                    Read more
                  </Link>
                  <button
                    onClick={() => deleteRecept(recept.id)}
                    className="btn btn-secondary"
                  >
                    <IoTrashOutline className="btn-primary" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReceptsList;
