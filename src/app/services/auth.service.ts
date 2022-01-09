import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnDestroy, Output } from '@angular/core';
import { IToken, IUser } from '../assets/models';
import { API_URL } from '../assets/constants/constants';


@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
    @Output() onTokenValidityChange = new EventEmitter<boolean>();

    token: IToken = { value: undefined, expires: undefined, valid: false, expiresTimer: undefined };
    authorizationHeader = { headers: { authorization: '' } };

    constructor(private http: HttpClient) {
        // this.removeCookeToken();
        this.setTokenFromCookie();
        console.log("auth service constructor", this.token);
    }

    ngOnDestroy() {
        clearTimeout(this.token.expiresTimer);
    }

    private loginResponseHandler(response) {
        console.log("response", response);
        this.setToken(response.value.token, response.value.expires);
        this.setCookieToken();
    }

    private setCookieToken() {
        document.cookie = `token=${this.token.value}`;
        document.cookie = `expires=${this.token.expires.getTime()}`
    }

    private removeCookeToken() {
        document.cookie = "token=";
        document.cookie = "expires=";
    }

    private setToken(token: string, millisecondExpires: number) {
        this.token.value = token;
        this.token.expires = new Date(millisecondExpires);
        this.token.valid = this.token.expires > new Date();

        if (this.token.valid) {
            this.authorizationHeader.headers.authorization = `Bearer ${this.token.value}`;
            this.setTokenTimer();
        }
        
        this.onTokenValidityChange.emit(this.token.valid);
        return this.token.valid;
    }

    private setTokenFromCookie() {
        const token = { value: undefined, expires: undefined };
        const cookieArray = document.cookie.split(';');

        console.log('cookie array', cookieArray)
        cookieArray.forEach(value => {
            if (value.includes('token'))
                token.value = value.split('=')[1];
            else if (value.includes('expires'))
                token.expires = parseInt(value.split('=')[1]);
        })

        this.setToken(token.value, parseInt(token.expires));
    }

    private setTokenTimer() {
        if (this.token.valid) {
            const now = new Date();
            const timeout = this.token.expires.getTime() - now.getTime();

            this.token.expiresTimer = setTimeout(this.onAccessForbidden.bind(this), timeout);
        }
    }

    login(user: IUser) {
        this.http.post(API_URL.login, user).subscribe({
            next: this.loginResponseHandler.bind(this),
            error: (e) => {
                console.log("login error", e);
                throw e;
            }
        })
    }

    logout() {
        this.onAccessForbidden();
        this.token = { value: undefined, expires: undefined, valid: false, expiresTimer: undefined };
        this.removeCookeToken();
    }

    isAuthenticated() { return this.token.valid; }

    onAccessForbidden() {
        clearTimeout(this.token.expiresTimer);
        this.token.expiresTimer = undefined;
        this.token.valid = false;

        this.onTokenValidityChange.emit(this.token.valid);
    }

}