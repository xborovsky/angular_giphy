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
  public loading = false;
  public totalRecords = 0;

  constructor(private searchService:SearchService) { }

  updateSearchResults(data) {
    this.giphs = data;
    this.updateLoadingStatus();
  }

  loadNext() {
    this.loading = true;
    this.searchService.loadNext()
      .subscribe((more:SearchResult[]) => {
        this.giphs = this.giphs.concat(more);
        this.updateLoadingStatus();
      });
  }

  private updateLoadingStatus() {
    this.loading = false;
    this.totalRecords = this.searchService.getTotalAvailableRecords();
  }
}
