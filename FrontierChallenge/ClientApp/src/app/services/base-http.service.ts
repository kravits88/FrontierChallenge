import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";

export abstract class BaseHttpService {

  abstract url: string;
  private readonly baseEndPoint = "/api/";
  private httpClient = inject(HttpClient);

  get() {
    return this.httpClient.get(this.baseEndPoint + this.url);
  }

  post(data:any) {
    return this.httpClient.post(this.baseEndPoint + this.url, data);
  }

  put(id: number | string, data: any) {
    return this.httpClient.put(`${this.baseEndPoint}${this.url}/${id}`, data);
  }

  delete(id: number | string) {
    return this.httpClient.delete(`${this.baseEndPoint}${this.url}/${id}`);
  }

}
