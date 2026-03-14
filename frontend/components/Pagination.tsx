export default function Pagination({
  page,
  setPage,
}: {
  page: number;
  setPage: (p: number) => void;
}) {
  return (
    <div className="flex gap-2 mt-4">

      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="border px-3 py-1"
      >
        Prev
      </button>

      <button
        onClick={() => setPage(page + 1)}
        className="border px-3 py-1"
      >
        Next
      </button>

    </div>
  );
}