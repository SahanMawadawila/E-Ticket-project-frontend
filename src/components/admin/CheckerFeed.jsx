import React from "react";
import CheckerProfile from "../ui/CheckerProfile";
import axios from "../../api/axios";
import Loading from "../ui/Loading";
import useSWR from "swr";

const CheckerFeed = ({ filteredCheckers, setCheckers }) => {
  const { error, isLoading: loading } = useSWR(
    "/checkers",
    async () => {
      const response = await axios.get("/checkers");
      return response.data;
    },
    {
      onSuccess: (data) => {
        setCheckers(data);
      },
    }
  );

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
          <CheckerProfile key={id} checker={checker} />
        ))}
      </div>
    </div>
  );
};

export default CheckerFeed;
