import {
  HttpProtocol,
  HttpRequest,
  HttpResponse,
} from "@/data/protocols/http-protocol/HttpProtocol";
import axios, { AxiosError, AxiosResponse } from "axios";

export class AdapterAxiosToHttpProtocol implements HttpProtocol {
  async request(payload: HttpRequest) {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: payload.url,
        method: payload.method,
      });
    } catch (error) {
      const axiosError = error as AxiosError;

      axiosResponse = axiosError.response as AxiosResponse;
    }

    return this.adapt(axiosResponse);
  }
  private adapt(axiosResponse: AxiosResponse): HttpResponse {
    return {
      body: axiosResponse.data,
      statusCode: axiosResponse.status,
    };
  }
}
