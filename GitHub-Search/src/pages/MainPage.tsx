import { useEffect, useState } from "react";
import { useSearchReposQuery } from "../shared/gitAPI";
import { useTheme } from "../context/hook";

export const MainPage = () => {
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState(text);
  const { data, isLoading, error } = useSearchReposQuery(debouncedText, {
    skip: debouncedText.trim() === "",
  });
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedText(text), 500);
    return () => clearTimeout(handler);
  }, [text]);

  const [currentPage, setCurrentPage] = useState(1);
  const [favorite, setFavorite] = useState<number[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const toggleFavorite = (id: number) => {
    setFavorite((prev) => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter((fav) => fav !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const repoPerPage = 10;
  const lastIndex = currentPage * repoPerPage;
  const firstIndex = lastIndex - repoPerPage;
  const currentRepos = data?.items.slice(firstIndex, lastIndex) || [];
  const totalPages = data ? Math.ceil(data.items.length / repoPerPage) : 0;

  const { toggleTheme } = useTheme();

  if (error) return <p>Error</p>;

  return (
    <section className="p-4 flex flex-col items-center justify-center">
      <div className="flex flex-row gap-4">
        <h3 className="text-3xl">Repository Search</h3>
        <button
          className="p-2 border rounded-xl bg-gray-100 hover:bg-gray-300"
          onClick={toggleTheme}
        >
          Switch Theme
        </button>
      </div>
      <div className="my-6">
        <input
          type="text"
          placeholder="Type Name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-80 p-3 border border-gray-300 rounded-lg  shadow-sm  placeholder-gray-400 dark: placeholder-white dark:bg-gray-800 dark:text-white"
        />
      </div>
      {isLoading && <p>Loading</p>}
      {!isLoading &&
        currentRepos.length === 0 &&
        debouncedText.trim() !== "" && <p>No repositories found</p>}
      <div>
        <div className="w-full max-w-4xl mx-auto p-4">
          {currentRepos.map((repo) => (
            <div
              key={repo.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 mb-4 bg-white rounded-xl shadow-lg dark:bg-gray-800 "
            >
              <div className="flex flex-col w-full sm:w-4/5">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                  {repo.name}
                </h3>
                <p className="text-gray-600 mt-1 dark:text-white">
                  {repo.description}
                </p>
                <div className="flex flex-wrap mt-2 text-sm text-gray-500 gap-4 dark:text-white">
                  <span className="dark:text-white">
                    {repo.stargazers_count}
                  </span>
                  <span className="dark:text-white">{repo.language}</span>
                </div>
              </div>
              <button
                onClick={() => toggleFavorite(repo.id)}
                className={`mt-3 sm:mt-0 px-4 py-2 rounded-lg font-medium transition-colors ${
                  favorite.includes(repo.id)
                    ? "bg-yellow-400 text-gray-800 hover:bg-yellow-500"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {favorite.includes(repo.id) ? "Remove" : "Add"}
              </button>
            </div>
          ))}
        </div>
        {data && (
          <div
            className={` pt-4 justify-center items-center space-x-4 ${
              isLoading ? "hidden" : "flex"
            }`}
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className=" p-2 border bg-gray-100 rounded-xl text-black  hover:bg-gray-400"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded  hover:bg-gray-400 ${
                  currentPage === i + 1 ? "bg-gray-500 text-black" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className=" p-2 border bg-gray-100 rounded-xl text-black  hover:bg-gray-400"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
