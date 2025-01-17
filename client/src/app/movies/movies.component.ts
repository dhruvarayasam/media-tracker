import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit{

  // TODO:
  // add/remove to wishlist functionality
  // add/remove to watchlist functionality --> ratings and notes included here

  // represent wishlist and watchlist:
  // have an array going for wishlist and watchlist
  // any updates on array trigger APIService update endpoint
  // display local array

  constructor(private wishlistService: WishlistService, private auth:AuthService) {}
  wishlist: string[] = [];

  ngOnInit() {

    this.auth.user$.subscribe({
      next : (user:any) => {
        this.wishlistService.loadWishlist(user.email); // this sets the observable
      }
    })

    // Subscribe to wishlist changes
    this.wishlistService.wishlist$.subscribe(wishlist => {
      this.wishlist = wishlist;
    });



  }

  toggleWishlist(movieName: string, addStatus: boolean): void {
    this.auth.user$.subscribe({
      next : (user:any) => {
        this.wishlistService.modifyWishlist(movieName,  user.email, addStatus);
      }
    })
  }

  addToWatchedList() {

  }

  removeFromWatchedList() {

  }

  modifyRating() {

  }

  modifyNotes() {

  }







}
