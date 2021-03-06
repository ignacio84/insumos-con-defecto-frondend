import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    public loginService: LoginService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm(): void {
    this.formulario = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(5)]],
        userpass: ['', [Validators.required, Validators.minLength(5)]],
      }
    );
  }

  public login(): void {
    this.loginService.login(this.formulario.get('username').value, this.formulario.get('userpass').value)
      .then(
        data => {
          this.loginService.saveTockenInSessionStorage(data);
          this.router.navigate(['/con-ins']);
        })
      .catch(
        error => {
          console.log(error);
          Swal.fire('Error', 'Usuario o contraseña no validos!', 'error');
        }
      )
  }
}
