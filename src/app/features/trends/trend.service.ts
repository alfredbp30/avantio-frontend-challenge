import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { Trend } from './models/trend.model';
import { TrendProvider } from './models/trend-provider.model';
import { TrendResponse } from './models/trend-response.model';
import { environment } from 'src/environments/environment';
import { DeleteOneTrendResponse, GetAllTrendsResponse, GetOneTrendResponse, PostOneTrendResponse, PutOneTrendResponse } from './models/trend-service-responses.model';

@Injectable()
export class TrendService {
  private readonly urlBase = environment.avantioAPIHost;

  public readonly trendServiceUrl = `${this.urlBase}/v1/trends`;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Trend[]> {
    return this.httpClient
      .get<GetAllTrendsResponse>(this.trendServiceUrl)
      .pipe(map(({ trends }) => [...trends.map(this.mapToTrendModel)]));
  }

  public getOne(id: string): Observable<Trend> {
    const url = `${this.trendServiceUrl}/${id}`;
    return this.httpClient
      .get<GetOneTrendResponse>(url)
      .pipe(map(({ trend }) => this.mapToTrendModel(trend)));
  }

  public createOne(trend: Trend): Observable<Trend> {
    const { id, createdAt, ...body } = trend;
    return this.httpClient
      .post<PostOneTrendResponse>(this.trendServiceUrl, body)
      .pipe(map(({ trend }) => this.mapToTrendModel(trend)));
  }

  public updateOne(trend: Trend): Observable<boolean> {
    const { id, ...body } = trend;
    const url = `${this.trendServiceUrl}/${id}`;
    return this.httpClient
      .put<PutOneTrendResponse>(url, body)
      .pipe(map(({ modified }) => modified === 1));
  }

  public removeOne(id: string): Observable<boolean> {
    const url = `${this.trendServiceUrl}/${id}`;
    return this.httpClient
      .delete<DeleteOneTrendResponse>(url)
      .pipe(map(({ success }) => success));
  }



  private mapToTrendModel(trendResponse: TrendResponse): Trend {
    return {
      id: trendResponse._id,
      body: trendResponse.body.split('\n\n'),
      createdAt: new Date(trendResponse.createdAt),
      image: trendResponse.image,
      provider: trendResponse.provider as TrendProvider,
      title: trendResponse.title,
      url: trendResponse.url,
    };
  }
}
