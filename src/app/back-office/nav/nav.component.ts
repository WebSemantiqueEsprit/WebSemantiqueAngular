import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
    constructor(private tokenStorage:TokenStorageService) {
  } 
   logout() {
  this.tokenStorage.signOut();
    window.location.reload();
}
}
