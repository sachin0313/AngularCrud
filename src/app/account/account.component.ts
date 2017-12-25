import { $ } from 'protractor/built';
import { Router,ActivatedRoute } from '@angular/router';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'contact',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  contactEditId: any;
  stateid: any;
  msg: any;
  title = 'Contact Form';
  model: any = {};
  constructor(private _httpService: Http, private router: Router,private route:ActivatedRoute) { }
  contactsData: ContactModel[] = [];
  countries: CountryModel[] = [];
  states: CountryModel[] = [];
  ngOnInit(): void {
    //this.route.params.switchMap((params: Params) => this._service.getUser(+params['id']))
    //  .subscribe(user => this.user = user);
    this.contactEditId = parseInt(this.route.snapshot.params['id']);
    if (this.contactEditId > 0) {
      this.editContact(this.contactEditId);

    }
    this.getCountries();
    this.model.countryId="";

  }





  addContact() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(this.model);
    console.log(this.model, "save");
    this._httpService.post('http://localhost:50042/api/values/register', body, options).toPromise().then(data => {
      // this.model = {};
      this.model.countryId = "";
      this.msg = "Contact Saved Successfully!";
      this.router.navigate(["/contactlist"]);
    });

  }
  editContact(id) {
    this._httpService.get('http://localhost:50042/api/values/contact/' + id).subscribe(values => {
      this.model = values.json() as ContactModel[];
      console.log(this.model, "2nd");
      this.contactEditId = id;
      this.stateid = this.model.stateId
      this.onSelect(this.model.countryId);
      //this.model.stateId=this.model.stateId;
    });
  }

  updateContact() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(this.model);
    let id = this.model.id;
    this._httpService.put('http://localhost:50042/api/values/update/' + id, body, options).toPromise().then(data => {
      // this.model = {};
      this
      this.model.countryId = "";
      this.model.contactId = 0;

      this.msg = "Contact Updated Successfully!";
this.router.navigate(["/contactlist"]);
    });
  }
saveData(){
  if (this.model.id>0){
    console.log()
    this.updateContact();
  }else{
    this.addContact();
  }
}
  getCountries() {
    this._httpService.get('http://localhost:50042/api/values/getCountries').subscribe(values => {
      this.countries = values.json() as CountryModel[];
    });
  }
  onSelect(countryid) {
    console.log("hiiii");
    if (countryid == -1)
      this.states = null;
    else
      this.getStates(countryid);
    if ((this.contactEditId > 0)) {
      this.model.stateId = this.stateid;
      this.contactEditId = 0;
    }
    else
      this.model.stateId = "";
  }
  getStates(countryid: number) {
    this._httpService.get("http://localhost:50042/api/values/getStates/" + countryid).subscribe(values => {
      this.states = values.json() as CountryModel[];
    });
  }
  clickMe() {
    this.msg = "";

  }

}
interface ContactModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  id: number;
  countryId: number;
  stateId: number;
}

export class CountryModel {
  id: number;
  name: string;

}

export class StateModel {
  id: number;
  name: string;
  countryId: number;

}
