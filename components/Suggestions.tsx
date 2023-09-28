import { ActiveFilters } from "@/app/search/page";
import { icons } from "@/data/icons";

type SuggestionsProps = {
  suggestions: string[];
  activeFilters: ActiveFilters;
  setActiveFilters: (filters: ActiveFilters) => void;
};

export default function Suggestions({
  suggestions,
  activeFilters: filters,
  setActiveFilters,
}: SuggestionsProps) {
  const handleSuggestionClick = (suggestion: string) => {
    const newFilters = { ...filters, keyword: suggestion };
    setActiveFilters(newFilters);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg text-white">Top searches</h3>
      <ul className="pl-4">
        {suggestions.map((suggestion) => (
          <li key={suggestion}>
            <div className="flex items-center gap-2 p-2">
              {icons["search"]}
              {/* <Link href={`/search?keyword=${suggestion}`}>
                <p className="text-sm text-white hover:underline">
                  {suggestion}
                </p>
              </Link> */}
              <button
                type="button"
                className="text-sm text-white hover:underline"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
