import { ActiveFilters } from "@/app/search/page";
import { Suggestion } from "@/data.types";
import { icons } from "@/data/icons";

type SuggestionsProps = {
  suggestions: Suggestion[];
  activeFilters: ActiveFilters;
  setActiveFilters: (filters: ActiveFilters) => void;
};

export default function Suggestions({
  suggestions,
  activeFilters,
  setActiveFilters,
}: SuggestionsProps) {
  const handleSuggestionClick = (suggestion: Suggestion) => {
    const newFilters = { ...suggestion };
    setActiveFilters(newFilters);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg text-white">Top searches</h3>
      <ul className="pl-4">
        {suggestions.map((suggestion) => (
          <li key={suggestion.keyword}>
            <div className="flex items-center gap-2 p-2">
              {icons["search"]}
              <button
                type="button"
                className="text-sm text-white hover:underline"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.keyword}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
