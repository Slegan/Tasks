import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClientModule }    from '@angular/common/http';

import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { rootReducer, userRepos, INITIAL_STATE } from './store/store';
import { CounterActions } from './store/app.actions'; 

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AppStartHeaderComponent } from './app-start-header/app-start-header.component';
import { RepoBoxComponent } from './repo-box/repo-box.component';
import { RepositoryComponent } from './repository/repository.component';
import { NavigatePanelComponent } from './navigate-panel/navigate-panel.component';
import { IssuesBoxComponent } from './issues-box/issues-box.component';
import { IssueComponent } from './issue/issue.component';

@NgModule({
  declarations: [
    AppComponent,
    AppStartHeaderComponent,
    RepoBoxComponent,
    RepositoryComponent,
    NavigatePanelComponent,
    IssuesBoxComponent,
    IssueComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [CounterActions],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(ngRedux: NgRedux<userRepos>) {
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE
    );
  }
}
