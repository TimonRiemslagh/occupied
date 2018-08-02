import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(private http: HttpClient) {
    this.test();
  }
  public test() {
    const url = 'https://auth.mydevices.com/oauth/token';
    const email = 'timon.riemslagh@wijs.be';
    const pwd = '!SF6ocgrl';

    this.http.post(url, {
        'grant_type': 'password',
        'email': email,
        'password': pwd
    }).subscribe((data) => {
        /*const accessToken = JSON.parse(data._body).access_token;*/

        const token = data.access_token;

        console.log(token);


        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token
            })
        };


        this.http.get('https://auth.mydevices.com/applications', httpOptions)
            .subscribe((data2) => {
            console.log(data2);
        });

    });
  }
}
