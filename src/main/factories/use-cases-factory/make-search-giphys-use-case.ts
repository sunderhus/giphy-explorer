import { SearchGiphysService } from "@/data/services/SearchGiphysService";
import { SearchGiphysUseCase } from "@/domain/use-cases/SearchGiphys";
import { makeGiphyApiKey } from "../api/make-giphy-api-key";
import { makeGiphyApiBaseUrl } from "../api/make-giphy-api-base-url";
import { makeAdapterAxiosToHttpProtocol } from "../adapters-factory/make-adapter-axios-to-http-protocol";

export function makeSearchGiphyUseCase(): SearchGiphysUseCase {
  return new SearchGiphysService(
    makeGiphyApiKey(),
    makeGiphyApiBaseUrl("gifs/search"),
    makeAdapterAxiosToHttpProtocol()
  );
}
