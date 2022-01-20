import { fromEvent } from 'rxjs'
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators'

const url = 'http://api.github.com/search/users?q='

const search = document.getElementById('search')

const stream$ = fromEvent(search, 'input')
  .pipe(
    map(e => e.target.value),
    debounceTime(1000),
    distinctUntilChanged()
  )

stream$.subscribe(value => {
  console.log(value)
})