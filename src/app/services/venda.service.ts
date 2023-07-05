import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Venda } from '../models/venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  url = 'https://localhost:7265/Vendas/vendas';

  // injetando o HttpClient

  constructor(private httpClient: HttpClient) { }
  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos as vendas
  getVendas(): Observable<Venda[]> {
    return this.httpClient.get<Venda[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem uma venda pelo codigoVenda
  getVendasByCodigoVenda(codigoVenda: number): Observable<Venda> {
    return this.httpClient.get<Venda>(this.url + '/' + codigoVenda)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // salva uma venda
  saveVenda(venda: Venda): Observable<Venda> {
    return this.httpClient.post<Venda>(this.url, JSON.stringify(venda), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // deleta uma venda
  deleteVenda(venda: Venda) {
    return this.httpClient.delete<Venda>(this.url + '/' + venda.id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  addVenda(venda: Venda) {
    //console.log(this.url, JSON.stringify(fornecedor))
    return this.httpClient.post<Venda>(this.url, JSON.stringify(venda))
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` +
        `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}