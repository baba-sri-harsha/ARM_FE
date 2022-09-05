import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
/**
 * @author - Sandeep Pinasimham
 */
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('inside LayoutComponent ngOnInit');
  }
}
