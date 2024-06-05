import { TrendResponse } from "./trend-response.model";

export interface GetAllTrendsResponse {
  trends: TrendResponse[];
}

export interface GetOneTrendResponse {
  trend: TrendResponse;
}

export interface PostOneTrendResponse {
  trend: TrendResponse;
}

export interface PutOneTrendResponse {
  modified: number;
}

export interface DeleteOneTrendResponse {
  success: boolean;
}
