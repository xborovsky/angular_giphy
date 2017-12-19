import { SearchResult } from './search-result';
import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public giphs:SearchResult[] = [];

  constructor(private searchService:SearchService) { }

  updateSearchResults(data) {
    this.giphs = data;
  }

  loadNext() {
    this.searchService.loadNext()
      .subscribe((more:SearchResult[]) => {
        this.giphs = this.giphs.concat(more);
      });
  }
}
