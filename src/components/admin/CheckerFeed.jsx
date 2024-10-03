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
    <div className="flex flex-col w-full gap-2">
      {filteredCheckers.map((checker, id) => (
        <CheckerProfile key={id} checker={checker} />
      ))}
    </div>
  );
};

export default CheckerFeed;
