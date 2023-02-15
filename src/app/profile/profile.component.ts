import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firstName = "";
  lastName = "";
  email = "";

  constructor(private readonly router: ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParams.subscribe(
      params => {
        this.firstName = params['firstName'];
        this.lastName = params['lastName'];
        this.email = params['email'];
      });

  }

}
