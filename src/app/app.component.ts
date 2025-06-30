import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  showLoading = true;

  ngOnInit() {
     this.showLoadingFunc()
  }
  showLoadingFunc(){
    setTimeout(() => {
      this.showLoading = false;
    }, 2000);
  }
}
