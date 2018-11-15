import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  view:boolean;
  constructor() { 
    this.view = false;
  }

  renderComponent: String;
  renderProfile() {
    if (this.view == false){
       this.view = true;
    }
    else {
      this.view = false;
    }


    this.renderComponent = "Profile";
  }

  ngOnInit() {
  }

}
