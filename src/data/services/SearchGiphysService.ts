import { Giphy } from "@/domain/models/Giphy";
import { SearchGiphysUseCase } from "@/domain/use-cases/SearchGiphys";
import {
  HttpProtocol,
  HttpStatusCode,
} from "../protocols/http-protocol/HttpProtocol";

type RemoteGiphyImageVariations = {
  original: { url: string };
  fixed_width: { url: string };
};
type RemoteGiphy = {
  images: RemoteGiphyImageVariations;
};
type RemoteGiphyResponse = {
  data: RemoteGiphy[];
};

export class SearchGiphysService implements SearchGiphysUseCase {
  constructor(
    private readonly apiKey: string,
    private readonly url: string,
    private readonly httpClient: HttpProtocol
  ) {}

  async search(query: string, offSet: number): Promise<Giphy[]> {
    const response = await this.httpClient.request({
      method: "GET",
      url: `${this.url}?api_key=${this.apiKey}&q=${query}&offset=${offSet}&bundle=messaging_non_clips`,
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return this.adapt(response.body as RemoteGiphyResponse);
      case HttpStatusCode.badRequest:
        throw new Error("Invalid request");
      default:
        throw new Error("Api request with error");
    }
  }

  private adapt(response: RemoteGiphyResponse) {
    if (!response) {
      return [];
    }

    return response.data.map((giphy) => ({
      url: giphy.images.fixed_width.url,
    }));
  }
}
