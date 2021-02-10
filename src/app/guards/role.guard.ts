import { Injectable } from  "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class RoleGuard implements CanActivate{
 
  constructor(private auth: AuthService, private router: Router){}
  
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean>{
      const USER= await this.auth.checkRole()
      if(USER && USER.role === state.url.slice(1) && USER.confirm === true){
        console.log('work')
        return true;
      } else if(USER && USER.confirm === false){
        alert('Ожидайте подтверждения вашего аккаунта администратором')
      } else {
        this.router.navigateByUrl('/');
      }
    }
}