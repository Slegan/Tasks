import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ActivatedRoute } from '@angular/router';

import { RepoService } from '../repo.service';

import { select } from '@angular-redux/store';
import { repo } from "../store/store";

@Component({
  selector: 'app-repo-box',
  templateUrl: './repo-box.component.html',
  styleUrls: ['./repo-box.component.css']
})
export class RepoBoxComponent {
  @select() repos$: Observable<Array<repo>>;
  reposList: Array<repo>;
  userName: string;
  constructor(
    private route: ActivatedRoute,
    private repoService: RepoService,
  ) { }

  ngOnInit () {
    this.repos$.subscribe(list => this.reposList = list);
    this.userName = this.route.snapshot.paramMap.get('userName');
  }

  getIssues(repo) {
    this.userName = this.route.snapshot.paramMap.get('userName');
    this.repoService.getIssues(repo, this.userName);
  }

    // ngDoCheck() {
  //   this.repos$.subscribe(list => this.reposList = list);
  //   console.log(this.reposList, 'repobox');
  // }
}
