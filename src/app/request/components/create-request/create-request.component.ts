import { Component, OnInit } from '@angular/core';
import { Priority } from 'src/app/models/priority';
import { Status } from 'src/app/models/status';
import { Union } from 'src/app/models/union';
import { DropdownOption } from 'src/app/shared/components/dropdown/dropdown.component';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {
  constructor() {}
  status: DropdownOption[] = [
    { value: Status.PI },
    { value: Status.PT },
    { value: Status.SP },
    { value: Status.COMPLETED }
  ];
  priority: DropdownOption[] = [
    { value: Priority.HIGH },
    { value: Priority.LOW },
    { value: Priority.MEDIUM }
  ];
  union: DropdownOption[] = [
    { value: Union.DAG },
    { value: Union.INDEPENDENT },
    { value: Union.SAG },
    { value: Union.WAG }
  ];

  ngOnInit(): void {
    console.log('inside CreateRequestComponent ngOnInit');
  }
}
