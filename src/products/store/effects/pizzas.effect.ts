import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { of } from 'rxjs/observable/of'
import * as pizzasActions from '../actions/pizzas.actions'
import {map, switchMap, catchError} from 'rxjs/operators'
import * as fromServices from '../../services'

@Injectable()
export class PizzasEffect {
    constructor(
        private actions$: Actions,
        private  pizzasService: fromServices.PizzasService
    ) {
    }

    @Effect()
    loaPizzas$ = this.actions$.pipe(
        ofType(pizzasActions.LOAD_PIZZAS),
        switchMap(() => {
            return this.pizzasService
                .getPizzas()
                .pipe(
                map(pizzas => new pizzasActions.LoadPizzasSuccess(pizzas),
                    catchError(err => of (new pizzasActions.LoadPizzasFail(err)))
                )
            )
        })
    )
}
