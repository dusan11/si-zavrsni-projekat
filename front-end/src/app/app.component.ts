import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SI projekat';
  constructor(private bnIdle: BnNgIdleService, private router:Router, private toastr:ToastrService) {

  }
  ngOnInit(): void {
    this.bnIdle.startWatching(5).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        sessionStorage.removeItem('token');
        this.router.navigate(['/login']);
        this.bnIdle.stopTimer();
        this.toastr.error(JSON.stringify("Your session has expired. Please sign in again."), JSON.stringify("Session expired!"));
      }
    });
  }
}



