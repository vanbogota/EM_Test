import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Post } from '../post';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

    httpOption = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.postsUrl)
            .pipe(
                tap(_ => this.log('fetched posts')),
                catchError(this.handleError<Post[]>('getPosts', []))
            );
    }

    getPostById(id: number) {
        const url = `${this.postsUrl}/${id}`;
        return this.http.get<Post>(url)
            .pipe(
                tap(_ => this.log(`fetched post id=${id}`)),
                catchError(this.handleError<Post>(`getPostById id=${id}`))
            );
    }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);

            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    /** Log a AppService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`AppService: ${message}`);
    }
}