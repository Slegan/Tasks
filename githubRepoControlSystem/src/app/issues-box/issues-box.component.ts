import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RepoService } from '../repo.service';

import { select } from '@angular-redux/store';
import { issue } from "../store/store";

@Component({
  selector: 'app-issues-box',
  templateUrl: './issues-box.component.html',
  styleUrls: ['./issues-box.component.css']
})
export class IssuesBoxComponent {
  @select() issues$: Observable<Array<issue>>;
  issuesList: Array<issue>;
  constructor(
    private repoService: RepoService,
  ) { }

  ngOnInit() {
    this.issues$.subscribe(list => this.issuesList = list);
  }

}
