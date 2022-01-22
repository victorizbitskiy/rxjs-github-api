import { fromEvent, Observable } from 'rxjs'
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

const url = 'https://api.github.com/search/users?q='

const search = document.getElementById('search')

const stream$ = fromEvent(search, 'input')
  .pipe(
    map(e => e.target.value),
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap(v => {
      return ajax.getJSON(url + v)
    })
  )

stream$.subscribe(value => {
  console.log(value)
})

// import { ajax } from 'rxjs/ajax';
// import { map, catchError, of } from 'rxjs';

// const obs$ = ajax.getJSON('https://api.github.com/users?per_page=5').pipe(
//   map(userResponse => console.log('users: ', userResponse)),
//   catchError(error => {
//     console.log('error: ', error);
//     return of(error);
//   })
// );

// obs$.subscribe({
//   next: value => console.log(value),
//   error: err => console.log(err)
// });