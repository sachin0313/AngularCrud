import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-cascade-dropdown',
  templateUrl: './cascade-dropdown.component.html',
  styleUrls: ['./cascade-dropdown.component.css']
})
export class CascadeDropdownComponent implements OnInit {

  constructor(private _httpService: Http) { }
 countries: CountryModel[] = [];
  model: any = {};
   states: CountryModel[] = [];
  ngOnInit() {
    this.getCountries();
    this.model.countryId="";
  }

getCountries() {
    this._httpService.get('http://localhost:50042/api/values/getCountries').subscribe(values => {
      this.countries = values.json() as CountryModel[];
    });
  }

   getStates(countryid: number) {
    this._httpService.get("http://localhost:50042/api/values/getStates/" + countryid).subscribe(values => {
      this.states = values.json() as CountryModel[];
      this.model.stateId="";
    });
  }

  onSelect(countryid) {
   
    if (countryid == -1)
      this.states = null;
    else
      this.getStates(countryid);
    
  }
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