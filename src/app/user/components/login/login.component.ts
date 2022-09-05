import { Component, OnInit } from '@angular/core';
/**
 * @author - Dibya Prakash Ojha
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('inside LoginComponent ngOnInit');
  }
}
