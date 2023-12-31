import { Component } from '@angular/core';
import { ProdutoService } from './services/produto.service';
import { Produto } from './models/produto';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BandPar';

  produto = {} as Produto;
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}
  
  ngOnInit() {
    this.getProdutos();
  }

  /*
  addPessoa(){
    this.pessoa.nome = "Astolfo";
    this.pessoaService.savePessoa(this.pessoa);
 
  }
  */

  saveProduto(form: NgForm) {
    if (this.produto.id !== undefined) {
      this.produtoService.updateProduto(this.produto).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.produtoService.saveProduto(this.produto).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  SaveProdutoDescricao(n: string){
    this.produto.descricao = n;
    this.produtoService.saveProduto(this.produto);
  }

  getProdutos() {
    this.produtoService.getProdutos().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
    });
  }

  deleteProdutos(produto: Produto) {
    this.produtoService.deleteProduto(produto).subscribe(() => {
      this.getProdutos();
    });
  }


  editProduto(produto: Produto) {
    this.produto = { ...produto };
  }
  
  cleanForm(form: NgForm) {
    this.getProdutos();
    form.resetForm();
    this.produto = {} as Produto;
  }

}