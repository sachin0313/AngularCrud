import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent  implements OnInit{
 msg: any;
 title = 'Contact List!';
  constructor(private _httpService:Http,private _router:Router) { }
contactsData: ContactModel[] = [];
  ngOnInit() {
    this.getData();
  }

  getData() {
    this._httpService.get('http://localhost:50042/api/values/getContacts').subscribe(values => {
      this.contactsData = values.json() as ContactModel[];
    });
  }

    deleteContact(id) {
    this._httpService.delete('http://localhost:50042/api/values/delete/' + id).subscribe(values => {
      this.getData();
      this.msg = "Contact Deleted Successfully!";

    });
  }
   clickMe() {
    this.msg = "";

  }
  editContact(id){
    console.log(id)
this._router.navigate(["/contact/"+id])
  }

}
interface ContactModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  id: number;
  state: string;
  country: string;
}