import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Usuario } from '../pages/models-scanner/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  public usuario: Usuario;

  constructor(public authService: AuthService,
    private router: Router) {
    this.usuario = authService.getUser();
  }

  ngOnInit(): void {
  }

  public logout():void {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
