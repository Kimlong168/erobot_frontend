import Form from "next/form";
import SearchFormReset from "@/components/form/SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ query, actionPath }) => {
  return (
    <Form action={actionPath} scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input outline-none"
        placeholder="Search"
      />

      <div className="flex gap-2">
        {query && <SearchFormReset href={actionPath} />}

        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
