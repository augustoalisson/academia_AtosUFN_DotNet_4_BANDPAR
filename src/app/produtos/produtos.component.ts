import { Component } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';
import { NgForm } from '@angular/forms';
import { FornecedoresComponent } from '../fornecedores/fornecedores.component';
import { FornecedorService } from '../services/fornecedor.service';
import { Fornecedor } from '../models/fornecedor';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  //title = 'BandPar';

  produto = {} as Produto;
  produtos: Produto[] = [];

  fornecedor = {} as Fornecedor;
  fornecedores: Fornecedor[] = [];

  constructor(private produtoService: ProdutoService, private fornecedorService: FornecedorService) {}
  
  ngOnInit() {
    this.getProdutos();
  }


  saveProduto(form: NgForm) {
    if (this.produto.id !== undefined) {
      this.produtoService.updateProduto(this.produto).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      //console.log(this.produto);
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

  getFornecedores() {
    this.fornecedorService.getFornecedores().subscribe((fornecedores: Fornecedor[]) => {
      this.fornecedores = fornecedores;
    });
  }

}
