import { Injectable } from '@angular/core';
import { Action } from 'redux';

import { repo, issue } from "../store/store";

@Injectable()
export class CounterActions {
  static SETREPOSTOSTATE = 'SETREPOSTOSTATE';
  static SORTBYNAME = 'SORTBYNAME';
  static FILTERBYLANGUAGE = 'FILTERBYLANGUAGE';
  static SHOWALLREPOS = 'SHOWALLREPOS';
  static EDITREPO = 'EDITREPO'
  static DELETEREPO = 'DELETEREPO';
  static SETISSUESTOSTATE = 'SETISSUESTOSTATE';
  static CREATENEWISSUE = 'CREATENEWISSUE';
  static LOADCOMMENTS = 'LOADCOMMENTS';
  static ADDNEWCOMMENT = 'ADDNEWCOMMENT';

  static repos: Array<repo>;
  static sortDirection: string;
  static language: string;
  static repo;
  static newName: string;
  static newDescription: string;  
  static issues: Array<issue>;
  static newIssueName: string;
  static newIssueDescription: string;
  static comments: any;
  static issue: issue;
  static newComment: string;
  
  setReposToState(data): Action {
    CounterActions.repos = data;
    return { type: CounterActions.SETREPOSTOSTATE }
  }

  sortByName(direction): Action {
    CounterActions.sortDirection = direction;
    return { type: CounterActions.SORTBYNAME }
  }

  filterByLanguage(language) {
    CounterActions.language = language;
    return { type: CounterActions.FILTERBYLANGUAGE }
  }

  showAllRepos() {
    return { type: CounterActions.SHOWALLREPOS }
  }

  editRepo(repo, newName, newDescription) {
    CounterActions.repo = repo;
    CounterActions.newName = newName;
    CounterActions.newDescription = newDescription;
    return { type: CounterActions.EDITREPO }
  }

  deleteRepository(repo) {
    CounterActions.repo = repo;
    return { type: CounterActions.DELETEREPO }
  }

  setIssuesToState(repo, issues) {
    CounterActions.repo = repo;
    CounterActions.issues = issues;
    return { type: CounterActions.SETISSUESTOSTATE }
  }

  createNewIssue(newIssueName, newIssueDescription) {
    CounterActions.newIssueName = newIssueName;
    CounterActions.newIssueDescription = newIssueDescription;
    return { type: CounterActions.CREATENEWISSUE }
  }

  loadComments(issue, comments) {
    CounterActions.issue = issue;
    CounterActions.comments = comments;
    return { type: CounterActions.LOADCOMMENTS }
  }

  addNewComment(issue, newComment) {
    CounterActions.issue = issue;
    CounterActions.newComment = newComment;
    return { type: CounterActions.ADDNEWCOMMENT }
  }
}