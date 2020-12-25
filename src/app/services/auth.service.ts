import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSate: any = null;

  constructor( private afu: AngularFireAuth, private router :Router) {
    this.afu.authState.subscribe((auth =>{
        this.authSate = auth;
      }))
   }
   
   get isUserAnonymousloggedIn():boolean{
     return (this.authSate !==null) ? this.authSate.isAnonymous : false
   }
 
   get currentUserId(): string{
     return (this.authSate !== null ) ? this.authSate.uid : ''
   }
 
   get currentUserName(): string {
     return this.authSate['email']
   }

   get currentUser(): any {
    return (this.authSate !== null) ? this.authSate : null ;
  }

 
   get isUserEmailloggedIn(): boolean {
     if((this.authSate !== null) && (!this.isUserAnonymousloggedIn)) {
       return true
     }
     else false
   }

   registerwithemail(email:string, password:string )
   {
     return this.afu.createUserWithEmailAndPassword(email,password)
     .then((user)=>
     {
       this.authSate = user;
     })
     .catch(error =>{
        console.log(error)
        throw error
      });
   }

  loginwithemail(email:string, password:string ){
    return this.afu.signInWithEmailAndPassword(email,password)
     .then((user)=>
     {
       this.authSate = user;
     })
     .catch(error =>{
        console.log(error)
        throw error
      });

  }

  signOut(): void
  {
    this.afu.signOut();
    this.router.navigate(['/login']);

  }
}
