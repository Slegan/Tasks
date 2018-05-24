import { Component, Input, TemplateRef } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { CounterActions } from '../store/app.actions'; 
import { userRepos, repo } from "../store/store"; 

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent {
  @Input() repository: repo;
  public modalRef: BsModalRef;
  newRepositoryName: string;
  newDescription: string;

  constructor(
    private modalService: BsModalService,
    private ngRedux: NgRedux<userRepos>,
    private actions: CounterActions,
  ) { }


  public openModal(event, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    event.stopPropagation();
  }

  public closeModal(template: TemplateRef<any>) {
    this.modalRef.hide();
  }

  public deleteRepository(template: TemplateRef<any>) {
    this.ngRedux.dispatch(this.actions.deleteRepository(this.repository));
    this.modalRef.hide();
  }

  public editRepository(template: TemplateRef<any>) {    
    if (!this.newRepositoryName && !this.newDescription) {
    } else {
      if (this.newRepositoryName && !this.newDescription) {
        this.newDescription = this.repository.description;
      }
      if (!this.newRepositoryName && this.newDescription) {
        this.newRepositoryName = this.repository.name;
      }

      this.ngRedux.dispatch(this.actions.editRepo(
        this.repository, 
        this.newRepositoryName,
        this.newDescription
      ));
    }
    this.newRepositoryName = '';
    this.newDescription = '';
    this.modalRef.hide();
  }

}


