import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { routerNavigationAction } from '@ngrx/router-store';

import * as TrendsApiActions from '../actions/trends-api.actions';
import * as TrendsActions from '../actions/trends.actions';
import { TrendService } from '../../trend.service';

@Injectable()
export class TrendsEffects {
  loadTrends$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsActions.loadTrends),
      mergeMap(() =>
        this.trendService.getAll().pipe(
          map((trends) => TrendsApiActions.loadTrendsSuccess({ trends })),
          catchError(() => of(TrendsApiActions.loadTrendsError()))
        )
      )
    );
  });

  loadOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigationAction),
      filter(({ payload }) => /^\/trends\/[a-z0-9]+$/.test(payload.event.url)),
      map(({ payload }) => payload.routerState.root.firstChild?.params['id']),
      switchMap((id: string) =>
        this.trendService.getOne(id).pipe(
          map((trend) => TrendsApiActions.loadOneTrendSuccess({ trend })),
          catchError(() => of(TrendsApiActions.loadOneTrendError()))
        )
      )
    );
  });

  createOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsActions.addTrend),
      mergeMap((res) => {
        return this.trendService.createOne(res.trend).pipe(
          map((trend) => TrendsApiActions.createOneTrendSuccess({ trend })),
          catchError(() => of(TrendsApiActions.createOneTrendError()))
        )
      })
    )
  });

  updateOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsActions.updateTrend),
      mergeMap(({ id, trend }) =>
        this.trendService.updateOne(id, trend).pipe(
          map((success) => {
            return success
            ?  TrendsApiActions.updateOneTrendSuccess({ id, trend })
            : TrendsApiActions.updateOneTrendError();
          }),
          catchError(() => of(TrendsApiActions.updateOneTrendError()))
        )
      )
    )
  });

  deleteOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsActions.deleteTrend),
      mergeMap(({ id }) =>
        this.trendService.removeOne(id).pipe(
          map((success) => {
            return success
            ? TrendsApiActions.deleteOneTrendSuccess({ id })
            : TrendsApiActions.deleteOneTrendError();
          }),
          catchError(() => of(TrendsApiActions.deleteOneTrendError()))
        )
      )
    )
  })

  constructor(private actions$: Actions, private trendService: TrendService) {}
}
