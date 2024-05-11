import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { catchError,map,of } from 'rxjs';



export const authGuard: CanActivateFn = (route, state) => {
  const authservice = inject(AuthService) as AuthService;
  const router = inject(Router) as Router;
  return authservice.isAuthenticated().pipe(
    map(()=>{
      return true;
  }),
  catchError(()=>{
    router.navigate(['/']);
    return of(false);
  })
);
};
