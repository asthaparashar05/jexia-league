import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})

export class SportsComponent implements OnInit {
  public project_name = "Test";
  public games_list;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.games_list = ""; 
    this.authService.getAuthToken().subscribe((res) => {
      this.authService.getGames().subscribe(val => {
        if (val) {
          // TODO Loop into val
          this.games_list += val[0].name;
        }
console.log(this.games_list);
      });
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
