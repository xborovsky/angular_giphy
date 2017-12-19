import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { SearchResult } from './search-result';

@Injectable()
export class SearchService {
  private pageSize = 9;
  private loaded = 0;
  private searchStr = '';

  constructor(private http:HttpClient) { }

  doSearch(str:string):Observable<SearchResult[]> {
    this.searchStr = str;
    return this.http.get(this.getSearchUrl())
      .map((response:any) => { 
        this.loaded = response.data.length;
        return this.filterResult(response); 
      });
  }

  loadNext():Observable<SearchResult[]> {
    return this.http.get(this.getSearchUrl())
    .map((response:any) => {
      this.loaded += response.data.length;
      return this.filterResult(response); 
    });
  }

  private filterResult(response:any):SearchResult[] {
    let data = response.data,
        results = [];

    for (let i=0; i<data.length; i++) {
      let result = new SearchResult();
      result.id = data[i].id;
      result.title = data[i].title;
      result.url = data[i].images.fixed_height.url;
      results.push(result);
    }

    return results;
  }

  private getSearchUrl() {
    const API_KEY = 'RwQunBjZAhb68PHoHL03vEbsS8i0CA0E';
    return `http://api.giphy.com/v1/gifs/search?q=${this.searchStr}&api_key=${API_KEY}&limit=${this.pageSize}&offset=${this.loaded}`;
  }

}
