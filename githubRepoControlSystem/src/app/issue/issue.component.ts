import { Component, Input, TemplateRef } from '@angular/core';

import { RepoService } from '../repo.service';

import { NgRedux } from '@angular-redux/store'; 
import { CounterActions } from '../store/app.actions'; 
import { userRepos, issue } from "../store/store";

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent {
  @Input() issue: issue;
  public modalRef: BsModalRef;
  commentsList: Array<object>;
  newComment: string;
  disabled: boolean = true;

  constructor(
    private repoService: RepoService,
    private ngRedux: NgRedux<userRepos>,
    private actions: CounterActions,
    private modalService: BsModalService,
  ) { }

  ngDoCheck() {
    this.commentsList = this.issue.comments_arr;
  }

  getcomments() {
    if (this.issue.comments_url) {
      this.repoService.getcomments(this.issue, this.issue.comments_url);        
    } else {
      alert('That issue did not have comments')
    }    
    this.disabled = !this.disabled;
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  addNewComment(template: TemplateRef<any>) {
    this.ngRedux.dispatch(
      this.actions.addNewComment(this.issue, this.newComment)
    );
    this.modalRef.hide();
    this.newComment = '';
  }

}