import { Injectable } from '@angular/core';
import { APIService } from './api-service.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistSubject = new BehaviorSubject<string[]>([]);
  public wishlist$ = this.wishlistSubject.asObservable();

  constructor(private apiService: APIService) {}

  // Fetch the initial wishlist
  loadWishlist(email: string): void {
    this.apiService.getWishlist(email).subscribe((data: any) => {
      let latestWishlist = []

      try {
        latestWishlist = data['wishlist']
      } catch (err) {
        console.log(err)
      }
  
      this.wishlistSubject.next(latestWishlist);
    });
  }

  modifyWishlist(movieName: string, email: string, addStatus: boolean): void {
    const currentWishlist = this.wishlistSubject.getValue();
    let updatedWishlist: string[];

    if (addStatus) {
      // Add movie
      updatedWishlist = [...currentWishlist, movieName];
    } else {
      // Remove movie
      updatedWishlist = currentWishlist.filter(movie => movie !== movieName);
    }

    // Update the BehaviorSubject
    this.wishlistSubject.next(updatedWishlist);

    // Call API to update the database
    this.apiService.modifyWishlist(movieName, email, addStatus).subscribe({
      next: () => console.log('Database updated successfully'),
      error: (err) => console.error('Error updating database', err)
    });
  }
}
