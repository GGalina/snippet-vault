export default function Pagination({
  page,
  setPage,
  hasNextPage,
}: {
  page: number;
  setPage: (p: number) => void;
  hasNextPage: boolean;
}) {
  return (
    <div className="flex justify-center gap-2 mt-6">

      {/* Prev */}
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={`px-4 py-2 border rounded transition-colors
        ${page === 1
          ? "text-gray-400 border-gray-300 cursor-not-allowed"
          : "cursor-pointer hover:border-blue-600 hover:text-blue-600"
        }`}
      >
        Prev
      </button>

      {/* Next */}
      <button
        onClick={() => setPage(page + 1)}
        disabled={!hasNextPage}
        className={`px-4 py-2 border rounded transition-colors
        ${!hasNextPage
          ? "text-gray-400 border-gray-300 cursor-not-allowed"
          : "cursor-pointer hover:border-blue-600 hover:text-blue-600"
        }`}
      >
        Next
      </button>

    </div>
  );
}
