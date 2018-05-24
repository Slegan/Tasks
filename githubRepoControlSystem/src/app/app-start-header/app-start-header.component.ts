import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { RepoService } from '../repo.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-app-start-header',
  templateUrl: './app-start-header.component.html',
  styleUrls: ['./app-start-header.component.css']
})
export class AppStartHeaderComponent {
  userName: string;
  constructor(
    private repoService: RepoService,
    private router: Router
  ) { }

  getRepos(): void {
    if (this.userName) {
      this.router.navigate(['/' + this.userName + '/repos']);
      this.repoService.getRepos(this.userName);
      this.userName = '';
    } else {
      alert('Enter the github user name')
    }
  }

}
