import { Component, VERSION } from '@angular/core';
import { Subscription } from 'rxjs';
import { CookiesService } from './services/cookies.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  columnDefs: any[] = [];
  rowData: any[] = [];
  users: any;
  cookiesData: Subscription;
  sortDir = 1;//1= 'ASE' -1= DSC


  constructor(private api: CookiesService) {}

  ngOnInit(): void {
    this.cookiesData = this.api.get().subscribe((res) => {
      this.users = res;
      this.users = this.users.cookies;
      console.log('data response', this.users);
    });
  }
  onSortClick(event) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir=-1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir=1;
    }
    this.sortArr('name');
  }

  sortArr(colName:any){
    this.users.sort((a,b)=>{
      a= a[colName].toLowerCase();
      b= b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }

  ngOnDestory(){
    this.cookiesData.unsubscribe();
  }
}
