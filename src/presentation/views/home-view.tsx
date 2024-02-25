import { PageTemplate } from "@/presentation/templates/page-template";
import { ChangeEvent, FormEvent, useId, useState } from "react";
import { Footer } from "@/presentation/components/footer";
import { Header } from "@/presentation/components/header";
import { SearchGiphysUseCase } from "@/domain/use-cases/SearchGiphys";

interface HomeProps {
  searchGiphys: SearchGiphysUseCase;
}

export function HomeView({ searchGiphys }: HomeProps) {
  const searchInputId = useId();
  const [searchText, setSearchText] = useState("");

  const onSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await searchGiphys.search(searchText, 10);
      console.log(result);
    } catch (error) {
      console.log(error);
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
            className="bg-violet-400 text-violet-950 font-semibold hover:ring-2 hover:ring-purple-900 outline-none max-lg:w-full h-12 w-32 "
            type="submit"
          >
            Search
          </button>
        </form>
      </section>

      <Footer />
    </PageTemplate>
  );
}
