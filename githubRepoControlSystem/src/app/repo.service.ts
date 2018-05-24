import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { NgRedux } from '@angular-redux/store'; 
import { CounterActions } from './store/app.actions'; 
import { userRepos, repo } from "./store/store"; 

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  data: any;
  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<userRepos>,
    private actions: CounterActions
  ) { }
  
  getRepos(userName): void {
    let fullUrl = 'https://api.github.com/users/' + userName + '/repos?per_page=100';
    
    this.http.get(fullUrl)
    .subscribe(list => {   
      console.log(list);
      
      this.ngRedux.dispatch(this.actions.setReposToState(list));
    })
  }

  getIssues(repo: repo, userName) {
    let fullUrl = 'https://api.github.com/repos/' + userName + '/' + repo.name + '/issues?per_page=100';
    this.http.get(fullUrl)
    .subscribe(list => {
      this.ngRedux.dispatch(this.actions.setIssuesToState(repo, list));
    })
  }

  getcomments(issue, comments_url) {
    this.http.get(comments_url)
    .subscribe(list => {
      this.ngRedux.dispatch(this.actions.loadComments(issue, list));
    })
  }
}
