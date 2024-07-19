import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    constructor(private router:Router) { }

    ngOnInit() {}
    navigateSignup(){
        this.router.navigateByUrl('/signup');
    }
}
