import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { Subscription } from 'rxjs';
import { CookiesService } from './services/cookies.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  columnDefs: any[] = [];
  rowData: any[] = [];
  users: any;
  cookiesData: Subscription;
  sortDir = 1; //1= 'ASE' -1= DSC

  constructor(private api: CookiesService) {}

  ngOnInit(): void {
    this.cookiesData = this.api.get().subscribe((res) => {
      this.users = res;
      this.users = this.users.cookies;
      console.log('data response', this.users);
    });
  }
  onSortClick(event) {
    let target = event.currentTarget;
    let id = target.innerHTML.split('<i')[0];
    let classList;
    let eachid = target.innerHTML.split('id="')[1];
    console.log(classList);
    console.log("vhgvh", eachid);
    if(eachid.toString().startsWith("nameid")){
      console.log("rtttt",eachid);
      classList = document.getElementById("nameid").classList;
    } else if(eachid.toString().startsWith("priceid")){
      classList = document.getElementById("priceid").classList;
    } else if(eachid.toString().startsWith("categoryid")){
      classList = document.getElementById("categoryid").classList;
    }
    console.log("fhfh", eachid);
    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir = -1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir = 1;
    }
    if (id == ' Product Name') {
      console.log('sortclick', target.innerHTML.split('<i')[0]);
      this.sortArr('name');
    } else if (id == ' Price') {
      console.log('sortclick', target.innerHTML.split('<i')[0]);
      this.sortArr('price');
    } else if (id == ' Category') {
      console.log('sortclick', target.innerHTML.split('<i')[0]);
      this.sortArr('category');
    }
  }
  sortArr(colName: any) {
    console.log("id");
    this.users.sort((a, b) => {
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }
  ngOnDestroy(): void {
    this.cookiesData.unsubscribe();
  }
}
