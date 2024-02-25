import { PageTemplate } from "@/presentation/templates/page-template";
import { ChangeEvent, FormEvent, useId, useState } from "react";
import { Footer } from "@/presentation/components/footer";
import { Header } from "@/presentation/components/header";
import { SearchGiphysUseCase } from "@/domain/use-cases/SearchGiphys";
import { Giphy } from "@/domain/models/Giphy";

interface HomeProps {
  searchGiphys: SearchGiphysUseCase;
}

export function HomeView({ searchGiphys }: HomeProps) {
  const searchInputId = useId();
  const [searchText, setSearchText] = useState("");
  const [offSet, setOffset] = useState(0);
  const [giphys, setGiphys] = useState<Giphy[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const hasGiphysToShow = giphys.length > 0;

  const onSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const results = await searchGiphys.search(searchText, 0);
      setGiphys([...results]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const nextOffSet = offSet + 1;
      const results = await searchGiphys.search(searchText, nextOffSet);
      setOffset(nextOffSet);
      setGiphys((state) => [...results, ...state]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
  };

  return (
    <PageTemplate>
      <Header.Root>
        <Header.Title>Search millions of Giphys </Header.Title>
        <Header.Marker> for free </Header.Marker>
      </Header.Root>

      <section>
        <form
          onSubmit={onSearch}
          className="flex flex-wrap items-end md:flex-nowrap"
        >
          <div className="flex flex-col w-full gap-2 max-lg:max-w-full max-w-md bg-yellow-400 p-2">
            <label
              className="font-semibold text-gray-900"
              htmlFor={searchInputId}
            >
              Search Giphys:
            </label>
            <input
              value={searchText}
              type="text"
              placeholder="a funny dog, a bored cat, ..."
              id={searchInputId}
              onChange={handleChange}
              className="flex p-3 h-12 text-3xl  font-semibold tracking-tight outline-none hover:ring-2 hover:ring-violet-400"
              required
              name="search"
            />
          </div>
          <button
            className="bg-violet-400 text-violet-950 font-semibold hover:ring-2 hover:ring-purple-900 outline-none max-lg:w-full h-12 w-32 p-3 text-center"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex flex-1 items-center justify-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-900 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
                </span>
                Loading
              </div>
            ) : (
              "Search"
            )}
          </button>
        </form>
      </section>

      {!hasGiphysToShow && (
        <p className="text-gray-100">waiting for you awesome search</p>
      )}

      <section>
        <button
          type="button"
          disabled={isLoading}
          className="text-gray-100 p-4 bg-yellow-400 mb-4"
          onClick={handleLoadMore}
        >
          LoadMore
        </button>
        <div className="grid grid-cols-gallery gap-3">
          {giphys.map((giphy) => (
            <img
              className="aspect-video w-full h-48 object-cover rounded-s-sm rounded-e-3xl"
              key={giphy.url}
              src={giphy.url}
              alt="giphy image"
            />
          ))}
        </div>
      </section>

      <Footer />
    </PageTemplate>
  );
}
