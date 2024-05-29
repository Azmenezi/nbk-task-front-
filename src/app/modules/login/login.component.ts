import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onClick() {
    this.http.get('http://localhost:3000/api').subscribe((data) => {
      console.log(data);
    });
  }
}
