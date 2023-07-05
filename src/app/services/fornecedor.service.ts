import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Fornecedor } from '../models/fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  url = 'https://localhost:7265/Fornecedor/fornecedor';

  // injetando o HttpClient

  constructor(private httpClient: HttpClient) { }
  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // Obtem todos os fornecedores
  getFornecedores(): Observable<Fornecedor[]> {
    return this.httpClient.get<Fornecedor[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um fornecedor pelo id
  getFornecedoresById(id: number): Observable<Fornecedor> {
    return this.httpClient.get<Fornecedor>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // salva um fornecedor
  saveFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.httpClient.post<Fornecedor>(this.url, JSON.stringify(fornecedor), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // atualiza um fornecedor
  updateFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.httpClient.put<Fornecedor>(this.url + '/' + fornecedor.id, JSON.stringify(fornecedor),
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um fornecedor
  deleteFornecedor(fornecedor: Fornecedor) {
    return this.httpClient.delete<Fornecedor>(this.url + '/' + fornecedor.id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  addFornecedor(fornecedor: Fornecedor) {
    console.log(this.url, JSON.stringify(fornecedor))
    return this.httpClient.post<Fornecedor>(this.url, JSON.stringify(fornecedor))
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