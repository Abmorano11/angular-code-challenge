import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({providedIn: 'root'})
export class UserDetailsGuard {
    constructor(private router: Router) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
        if (isNaN(next.params['id'])) this.router.navigateByUrl('');
        return true;
    }
}