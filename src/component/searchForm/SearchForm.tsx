import { generationList, typesList, sortList } from "@/utils/optionList";
import { useSearchForm } from "@/component/searchForm/SearchForm.hook";

const SearchForm = () => {
  const { fieldKeyword, fieldGen, fieldSort, fieldType } = useSearchForm();
  return (
    <form className="grid sm:grid-cols-2 md:grid-cols-4 gap-x-[20px]">
      <div>
        <label
          htmlFor="generation"
          className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
          Generation
        </label>
        <select
          {...fieldGen}
          id="generation"
          className="bg-[#599bf6] text-gray-900 dark:bg-[#253641] border border-[#284977] dark:border-gray-300 dark:text-white text-sm rounded-lg focus:border-blue-500 block w-full p-2.5">
          {generationList.map((item, index) => {
            return (
              <option key={`generation-key-${index}`} value={index}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label
          htmlFor="type"
          className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
          Type
        </label>
        <select
          {...fieldType}
          id="type"
          className="capitalize bg-[#599bf6] text-gray-900 dark:bg-[#253641] border border-[#284977] dark:border-gray-300 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          {typesList.map((item, index) => {
            return (
              <option
                className="capitalize"
                key={`type-key-${index}`}
                value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label
          htmlFor="sort"
          className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
          Sort by
        </label>
        <select
          {...fieldSort}
          id="sort"
          className="capitalize bg-[#599bf6] text-gray-900 dark:bg-[#253641] border border-[#284977] dark:border-gray-300 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          {sortList.map((item, index) => {
            return <option key={`sort-key-${index}`}>{item}</option>;
          })}
        </select>
      </div>
      <div>
        <label
          htmlFor="search"
          className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
          Search
        </label>
        <input
          {...fieldKeyword}
          type="text"
          id="search"
          className="bg-[#599bf6] text-gray-900 dark:bg-[#253641] border border-[#284977] dark:border-gray-300 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
    </form>
  );
};

export default SearchForm;
