import { HomeView } from "@/presentation/views/home-view";
import { makeSearchGiphyUseCase } from "../use-cases-factory/make-search-giphys-use-case";

export function MakeHomeView() {
  return <HomeView searchGiphys={makeSearchGiphyUseCase()} />;
}
