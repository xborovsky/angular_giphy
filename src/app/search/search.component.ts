import { Component, Output, EventEmitter } from '@angular/core';

import {Subject, Observable} from 'rxjs';

import { SearchService } from './../search.service';
import { SearchResult } from './../search-result';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  public searchText = "";
  private searchTextStream = new Subject<string>()
  @Output()
  public searchResults:EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private searchService:SearchService) {
    const searchSource = this.searchTextStream
      .debounceTime(400)
      .distinctUntilChanged()
      .flatMap(term => this.searchService.doSearch(term))
      .subscribe((results:SearchResult[]) => {
        this.searchResults.emit(results);
      });
  }

  search(search:string) {
    this.searchTextStream.next(search);
  }
}
