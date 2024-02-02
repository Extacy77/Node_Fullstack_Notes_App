import react from "react";
import { MdSearch } from "react-icons/md";

const SearchNote = ({ handleSearchNote }) => {
  return (
    <div className="search">
      <MdSearch className="search-icon" size="1.3rem" />
      <input
        type="text"
        onChange={(event) => handleSearchNote(event.target.value)}
        placehlder="Type here to search..."
      />
    </div>
  );
};

export default SearchNote;
