export default function SearchBar({ onSearch }: any) {
  return (
    <input
      className="border p-2 w-full"
      placeholder="Search..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}