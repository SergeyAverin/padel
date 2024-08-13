import { useInfinityScroll } from "@hooks/useInfinityScroll";
import { useGetUserMatchesQuery } from "@redux/api/matchesApi";
import React, { useState } from "react";

export const MatchesTemplate: React.FC = () => {
  const [page, setPage] = useState(0);
  const { data, isFetching } = useGetUserMatchesQuery(page);
  const pokemon = useInfinityScroll<{ name: string }>(
    page,
    setPage,
    data,
    isFetching
  );
  return (
    <>
      {pokemon.map((p, i) => (
        <h3 key={i}>{p.name}</h3>
      ))}
    </>
  );
};
