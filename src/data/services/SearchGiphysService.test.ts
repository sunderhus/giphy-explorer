import { describe, expect, it, vi } from "vitest";
import { SearchGiphysService } from "./SearchGiphysService";
import { HttpResponse } from "../protocols/http-protocol/HttpProtocol";

interface SutParams {
  apiKey: string;
  endpoint: string;
}

const makeSut = ({ apiKey, endpoint }: SutParams) => {
  const stubResponse: HttpResponse = {
    statusCode: 200,
    body: [],
  };
  const mockHttpClient = {
    request: async () => stubResponse,
  };
  const sut = new SearchGiphysService(apiKey, endpoint, mockHttpClient);

  return {
    sut,
    mockHttpClient,
  };
};

describe("SearchGiphyService", () => {
  it("should be able to call api with correct params", async () => {
    const mockApiKey = "123-A$BK-9";
    const mockEnpointUrl = "/test/giphys-mocks";
    const mockQuery = "mock-query-text";
    const offSetMock = 100;
    const { sut, mockHttpClient } = makeSut({
      apiKey: mockApiKey,
      endpoint: mockEnpointUrl,
    });
    const requestSpy = vi
      .spyOn(mockHttpClient, "request")
      .mockResolvedValueOnce({
        statusCode: 200,
        body: null,
      });

    await sut.search(mockQuery, offSetMock);

    expect(requestSpy).toHaveBeenCalledWith({
      method: "GET",
      url: `${mockEnpointUrl}?api_key=${mockApiKey}&q=${mockQuery}&offset=${offSetMock}&bundle=messaging_non_clips`,
    });
  });

  it("should return empty data on success request with no results", () => {
    const { sut, mockHttpClient } = makeSut({
      apiKey: "stub-key",
      endpoint: "stub-url",
    });
    vi.spyOn(mockHttpClient, "request").mockResolvedValueOnce({
      statusCode: 200,
      body: null,
    });

    const result = sut.search("stub-query", 0);

    expect(result).resolves.toEqual([]);
  });

  it("should return giphys on success request with results", () => {
    const { sut, mockHttpClient } = makeSut({
      apiKey: "stub-key",
      endpoint: "stub-url",
    });
    vi.spyOn(mockHttpClient, "request").mockResolvedValueOnce({
      statusCode: 200,
      body: {
        data: [
          {
            id: "AbC$321&",
            images: {
              fixed_width: { url: "giphy-url-b" },
              original: { url: "giphy-url-a" },
            },
          },
        ],
      },
    });

    const results = sut.search("stub-query", 10);

    expect(results).resolves.toEqual([
      {
        id: "AbC$321&-10",
        url: {
          maxQuality: "giphy-url-a",
          previewQuality: "giphy-url-b",
        },
      },
    ]);
  });

  it("should return correct error on bad request", () => {
    const { sut, mockHttpClient } = makeSut({
      apiKey: "stub-key",
      endpoint: "stub-url",
    });
    vi.spyOn(mockHttpClient, "request").mockResolvedValueOnce({
      statusCode: 400,
    });

    const promise = sut.search("stub-query", 0);

    expect(promise).rejects.toHaveProperty("message", "Invalid request");
  });

  it("should return correct error on unhandle requests", () => {
    const { sut, mockHttpClient } = makeSut({
      apiKey: "stub-key",
      endpoint: "stub-url",
    });
    vi.spyOn(mockHttpClient, "request").mockResolvedValueOnce({
      statusCode: 579,
    });

    const promise = sut.search("stub-query", 0);

    expect(promise).rejects.toHaveProperty("message", "Api request with error");
  });
});
