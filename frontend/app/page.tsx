"use client";

import { useEffect, useState } from "react";
import { getSnippets } from "@/api/api";
import SnippetCard from "@/components/SnippetCard";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import Header from "@/components/Header";

export default function Page() {
  const [snippets, setSnippets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({ q: "", tag: "" });
  const [page, setPage] = useState(1);

  const [hasNextPage, setHasNextPage] = useState(false);

  const itemsPerPage = 10;

  const fetchSnippets = async () => {
    try {
      setLoading(true);

      const res = await getSnippets({
        page,
        limit: itemsPerPage,
        q: searchParams.q,
        tag: searchParams.tag,
      });

      const result = res.data;

      setSnippets(result.data);
      setHasNextPage(result.hasNextPage);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, [searchParams, page]);

  return (
    <div className="p-6">
      <Header />

      <h2 className="text-xl font-bold mb-4">Your snippets</h2>

      <SearchBar onSearch={(params: any) => {
        setSearchParams(params);
        setPage(1); // reset page on new search
      }} />

      <div className="mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : snippets.length ? (
          snippets.map((snippet) => (
            <SnippetCard key={snippet._id} snippet={snippet} />
          ))
        ) : (
          <p>No snippets found.</p>
        )}
      </div>

      {!loading && (hasNextPage || page > 1) && (
        <Pagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
      )}
    </div>
  );
};
