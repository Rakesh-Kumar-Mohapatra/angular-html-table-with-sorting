import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { Subscription } from 'rxjs';
import { CookiesService } from './services/cookies.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  users: any[] = [];
  cookiesData: Subscription;
  sortDirection = 1;

  constructor(private api: CookiesService) {}

  ngOnInit(): void {
    this.cookiesData = this.api.get().subscribe((res) => {
      this.users = res.cookies;
    });
  }

  onSortClick(event) {
    let target = event.currentTarget;
    let id = target.innerHTML.split('<i')[0];
    let classList;
    let eachidFromIcon = target.innerHTML.split('id="')[1];
    if(eachidFromIcon.toString().startsWith("nameid")){
      classList = document.getElementById("nameid").classList;
    } else if(eachidFromIcon.toString().startsWith("priceid")){
      classList = document.getElementById("priceid").classList;
    } else if(eachidFromIcon.toString().startsWith("categoryid")){
      classList = document.getElementById("categoryid").classList;
    }
    console.log("fhfh", eachidFromIcon);
    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDirection = -1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDirection = 1;
    }
    if (id == ' Product Name') {
      this.SortTableByColumnName('name');
    } else if (id == ' Price') {
      this.SortTableByColumnName('price');
    } else if (id == ' Category') {
      this.SortTableByColumnName('category');
    }
  }

  SortTableByColumnName(colName: any) {
    console.log("id");
    this.users.sort((a, b) => {
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDirection;
    });
  }

  ngOnDestroy(): void {
    this.cookiesData.unsubscribe();
  }
}
