import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  get results() {
    return this.gifsService.results;
  }

  constructor( private gifsService: GifsService) { }

  ngOnInit(): void {
  }

}
