import { Component, TemplateRef } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { NgRedux } from '@angular-redux/store'; 
import { CounterActions } from '../store/app.actions'; 
import { userRepos } from "../store/store"; 

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-navigate-panel',
  templateUrl: './navigate-panel.component.html',
  styleUrls: ['./navigate-panel.component.css']
})
export class NavigatePanelComponent {
  public modalRef: BsModalRef;
  repoName: string;
  userName: string;
  sortDirection: string = 'A-Z';
  language: string = '';
  newIssueName: string;
  newIssueDescription: string;

  constructor(
    private route: ActivatedRoute,
    private ngRedux: NgRedux<userRepos>,
    private actions: CounterActions,
    private modalService: BsModalService,
  ) { }

  ngDoCheck() {
    this.repoName = this.route.snapshot.paramMap.get('repoName');
    this.userName = this.route.snapshot.paramMap.get('userName');
  }

  sortByName(): void {
    this.sortDirection === 'A-Z' ? 
      this.sortDirection = 'Z-A' : 
      this.sortDirection = 'A-Z';    
    this.ngRedux.dispatch(this.actions.sortByName(this.sortDirection));
  }

  filterByLanguage(): void {
    this.ngRedux.dispatch(this.actions.filterByLanguage(this.language));
    this.language = '';
  }

  showAllRepos(): void {
    this.sortDirection = 'A-Z';
    this.ngRedux.dispatch(this.actions.showAllRepos());
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  public createNewIssue(template: TemplateRef<any>) {
    if (this.newIssueDescription && this.newIssueName) {
      this.ngRedux.dispatch(
        this.actions.createNewIssue(this.newIssueName, this.newIssueDescription)
      );
    }
    this.modalRef.hide();
    this.newIssueDescription = '';
    this.newIssueName = '';
  }
}
