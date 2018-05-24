import { Action } from 'redux';
import { CounterActions } from './app.actions';
import { ArrayType } from '@angular/compiler/src/output/output_ast';

export interface repo {
  description: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  language: string;
  name: string;
  issues?: Array<issue>;
}

export interface issue {
  comments_arr?: Array<object>;
  comments_url?: string;
  body: string;
  title: string;
}

export interface userRepos {
  initialRepos: Array<repo>;
  repos: Array<repo>;
  issues: Array<issue>;
}

export const INITIAL_STATE: userRepos = {
  repos: [],
  initialRepos: [],
  issues: [],
};

export function rootReducer(lastState: userRepos, action: Action): userRepos {
  switch(action.type) {
    
    case CounterActions.SETREPOSTOSTATE: 
    lastState.initialRepos = CounterActions.repos.map(elem => elem);
    lastState.repos = CounterActions.repos.map(elem => elem);
    return { 
      repos: lastState.repos, 
      initialRepos: lastState.initialRepos,
      issues: lastState.issues
    };
    
    case CounterActions.SORTBYNAME: 
      lastState.repos.reverse();
    return { 
      repos: lastState.repos, 
      initialRepos: lastState.initialRepos,
      issues: lastState.issues
    };

    case CounterActions.FILTERBYLANGUAGE: 
      lastState.repos = lastState.initialRepos.filter(
        elem => {
          let str = elem.language || '';
          return str.toLowerCase() === CounterActions.language.toLowerCase();
        }) 
    return { 
      repos: lastState.repos, 
      initialRepos: lastState.initialRepos,
      issues: lastState.issues
    };

    case CounterActions.SHOWALLREPOS: 
      lastState.repos = lastState.initialRepos.map(elem => elem);
    return { 
      repos: lastState.repos, 
      initialRepos: lastState.initialRepos,
      issues: lastState.issues
    };

    case CounterActions.EDITREPO: 
      let editRepo = lastState.repos.find(elem => elem === CounterActions.repo);
      editRepo.name = CounterActions.newName;
      editRepo.description = CounterActions.newDescription;
      lastState.repos = sortByObjName(lastState.repos);
      lastState.initialRepos = sortByObjName(lastState.initialRepos);
    return { 
      repos: lastState.repos, 
      initialRepos: lastState.initialRepos,
      issues: lastState.issues
    };

    case CounterActions.DELETEREPO: 
      lastState.repos = lastState.repos.filter(elem => elem !== CounterActions.repo);
      lastState.initialRepos = lastState.initialRepos.filter(elem => elem !== CounterActions.repo);
    return { 
      repos: lastState.repos, 
      initialRepos: lastState.initialRepos,
      issues: lastState.issues
    };

    case CounterActions.SETISSUESTOSTATE: 
      let selectRepo = lastState.repos.find(elem => elem === CounterActions.repo);
      if (!selectRepo.issues) {
        selectRepo.issues = CounterActions.issues;
      }
      lastState.issues = selectRepo.issues;
    return { 
      repos: lastState.repos, 
      initialRepos: lastState.initialRepos,
      issues: lastState.issues
    };

    case CounterActions.CREATENEWISSUE:
      let newIssue: issue = {
        body: CounterActions.newIssueDescription,
        title: CounterActions.newIssueName
      }
      lastState.issues.unshift(newIssue);
    return { 
      repos: lastState.repos, 
      initialRepos: lastState.initialRepos,
      issues: lastState.issues
    };

    case CounterActions.LOADCOMMENTS:
      lastState.issues.find(elem => elem === CounterActions.issue)
        .comments_arr = CounterActions.comments;
    return { 
      repos: lastState.repos, 
      initialRepos: lastState.initialRepos,
      issues: lastState.issues
    };

    case CounterActions.ADDNEWCOMMENT:
      let arr = lastState.issues.find(elem => elem === CounterActions.issue)
      .comments_arr;
      if (!arr) {
        console.log('lalala');
        lastState.issues.find(elem => elem === CounterActions.issue)
          .comments_arr = [];
        lastState.issues.find(elem => elem === CounterActions.issue)
        .comments_arr.unshift({ body: CounterActions.newComment });
        
      } else {
        lastState.issues.find(elem => elem === CounterActions.issue)
          .comments_arr.unshift({ body: CounterActions.newComment });
        
      }
    return { 
      repos: lastState.repos, 
      initialRepos: lastState.initialRepos,
      issues: lastState.issues
    };

  }

  return lastState;
};

function sortByObjName (arr) {
  return arr.sort(function(a, b) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    return 0;
  })
}