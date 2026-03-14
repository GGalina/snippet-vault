"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSnippets } from "@/api/api";
import SnippetCard from "@/components/SnippetCard";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";

export default function Home() {

  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const fetchSnippets = async () => {
    try {
      setLoading(true);

      const res = await getSnippets({
        q: query,
        page,
        limit: 10,
      });

      setSnippets(res.data.data || res.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, [query, page]);

  if (loading) return <p>Loading...</p>;

  if (!snippets.length)
    return <p>No snippets found</p>;

  return (
    <div>

      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">
          Snippet Vault
        </h1>

        <Link
          href="/snippets/new"
          className="bg-green-500 text-white px-3 py-2 rounded"
        >
          Create
        </Link>
      </div>

      <SearchBar onSearch={setQuery} />

      <div className="mt-6">
        {snippets.map((snippet: any) => (
          <SnippetCard key={snippet._id} snippet={snippet} />
        ))}
      </div>

      <Pagination page={page} setPage={setPage} />

    </div>
  );
}