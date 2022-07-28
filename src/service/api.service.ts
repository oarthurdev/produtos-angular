import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Produto } from 'src/model/produto';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProdutos (): Observable<Produto[]> {
    const url = `${apiUrl}/produto`;
    return this.http.get<Produto[]>(url)
      .pipe(
        tap(produtos => console.log('leu os produtos')),
        catchError(this.handleError('getProdutos', []))
      );
  }

  getProduto(id: number): Observable<Produto> {
    const url = `${apiUrl}/produto/${id}`;
    return this.http.get<Produto>(url).pipe(
      tap(_ => console.log(`leu o produto id=${id}`)),
      catchError(this.handleError<Produto>(`getProduto id=${id}`))
    );
  }

  addProduto (produto): Observable<Produto> {
    const url = `${apiUrl}/produto`;
    return this.http.post<Produto>(url, produto, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((produto: Produto) => alert(`Adicionou o produto ${produto.name}`)),
      catchError(this.handleError<Produto>('addProduto'))
    );
  }
  
  getCategory(): Observable<Produto> {
    const url = `${apiUrl}/category`;
    return this.http.get<Produto>(url).pipe(
      tap(_ => console.log(`leu as categorias`)),
      catchError(this.handleError<Produto>(`getCategory}`))
    );
  }

  updateProduto(id, produto): Observable<any> {
    const url = `${apiUrl}/produto/${id}`;
    return this.http.put(url, produto, httpOptions).pipe(
      tap(_ => alert('Alterou o produto ' + produto.name)),
      catchError(this.handleError<any>('updateProduto'))
    );
  }

  deleteProduto (id): Observable<Produto> {
    const url = `${apiUrl}/produto/${id}`;

    return this.http.delete<Produto>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o produto com id=${id}`)),
      catchError(this.handleError<Produto>('deleteProduto'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
