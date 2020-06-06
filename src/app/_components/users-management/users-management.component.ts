import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ListUserComponent } from '../user/list-user/list-user.component';
import { AddUserComponent } from '../user/add-user/add-user.component';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  constructor(public dialog: MatDialog,) { }
  
  openDialog(){
    const dialogRef = this.dialog.open(ListUserComponent,{
      height: 'auto',
      width:'900px'
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogue(){
    const dialogRef = this.dialog.open(AddUserComponent,{
      height: 'auto',
      width:'auto'
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit() {
  }

}
