import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api-service.service';

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

  ngOnInit() {



  }

  addToWishlist() {

  }

  removeFromWishlist() {

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
