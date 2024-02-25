import { AdapterAxiosToHttpProtocol } from "@/infra/adapters/AdapterAxiosToHttpProtocol";

export function makeAdapterAxiosToHttpProtocol(): AdapterAxiosToHttpProtocol {
  return new AdapterAxiosToHttpProtocol();
}
