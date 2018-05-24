import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepoBoxComponent } from './repo-box/repo-box.component';
import { IssuesBoxComponent } from './issues-box/issues-box.component';
// import { NavigatePanelComponent } from './navigate-panel/navigate-panel.component';


const routes: Routes = [
  // { path: ':userName', component: NavigatePanelComponent },
  { path: ':userName/repos', component: RepoBoxComponent },
  { path: ':userName/:repoName/issues', component: IssuesBoxComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}