import { SearchResult } from './../search-result';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {

  @Input()
  giph:SearchResult;

  constructor() { }

}
