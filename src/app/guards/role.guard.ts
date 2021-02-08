import { Injectable } from  "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class RoleGuard implements CanActivate{
 
  constructor(private auth: AuthService){}
  
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean>{
      const USER_ROLE = await this.auth.checkRole()
      if(USER_ROLE){
        return USER_ROLE === state.url.slice(1);
      } 
    }
}