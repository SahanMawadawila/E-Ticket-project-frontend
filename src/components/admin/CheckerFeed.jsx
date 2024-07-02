import React from "react";
import CheckerProfile from "../ui/CheckerProfile";
import { useState } from "react";
import axios from "../../api/axios";
import { useEffect } from "react";
import Loading from "../ui/Loading";

const CheckerFeed = ({ filteredCheckers, setCheckers }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [wantToReRender, setWantToReRender] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCheckers = async () => {
      try {
        const response = await axios.get("/checkers");

        setCheckers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckers();
  }, [wantToReRender]);

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="text-center text-red-500font-boldtext-2xl">{error}</div>
    );
  if (filteredCheckers.length === 0)
    return <div className="text-center text-2xl">No checkers found</div>;

  return (
    <div className="flex flex-grow">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 flex-1">
        {filteredCheckers.map((checker, id) => (
          <CheckerProfile
            key={id}
            checker={checker}
            wantToReRender={wantToReRender}
            setWantToReRender={setWantToReRender}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckerFeed;
