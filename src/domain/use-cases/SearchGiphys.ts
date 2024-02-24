import { Giphy } from "@/domain/models/Giphy";

export interface SearchGiphysUseCase {
  search(query: string, offSet: number): Promise<Giphy[]>;
}
