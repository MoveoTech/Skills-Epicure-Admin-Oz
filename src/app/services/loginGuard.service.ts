import { Injectable } from "@angular/core";
import {  CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean | UrlTree {
        return !this.authService.isAuthenticated() ? true : this.router.parseUrl('');
    }
}