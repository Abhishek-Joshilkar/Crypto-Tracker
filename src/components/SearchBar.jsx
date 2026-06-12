import "../styles/searchbar.css";

function SearchBar({ search, setSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search coin..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;