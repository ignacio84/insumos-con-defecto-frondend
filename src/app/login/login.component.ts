import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
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
    public authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    // console.log(CryptoJS.AES.encrypt('hola', 'hola').toString())
    // console.log(CryptoJS.AES.decrypt('U2FsdGVkX1/jVUDoIn1UptfvD/ch5meZ8iZNu6Ucb5M=', 'hola').toString(CryptoJS.enc.Utf8));

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
    this.authService.login(this.formulario.get('username').value, this.formulario.get('userpass').value)
      .then(
        data => {
          this.authService.saveUser(data);
          this.router.navigate(['/con-ins']);
        })
      .catch(
        error => {
          Swal.fire('Error', 'Usuario o contraseña no validos!', 'error');
        }
      )
  }
}
