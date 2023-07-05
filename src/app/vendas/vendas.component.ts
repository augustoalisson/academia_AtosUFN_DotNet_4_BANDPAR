import { Component } from '@angular/core';
import { VendaService } from '../services/venda.service';
import { Venda } from '../models/venda';
import { NgForm } from '@angular/forms';
import { ProdutosComponent } from '../produtos/produtos.component';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent {

  venda = {} as Venda;
  vendas: Venda[] = [];
  codigoNovaVenda = 0;
  mostrarElemento = false;

  constructor(private vendaService: VendaService, private produtoService: ProdutoService) { }

  ngOnInit() {
    this.getVendas();
    this.getProdutos();
  }

  saveVenda(form: NgForm) {
    this.vendaService.saveVenda(this.venda).subscribe(() => {
      //this.cleanForm(form);
    });
  }

  getVendas() {
    this.vendaService.getVendas().subscribe((vendas: Venda[]) => {
      this.vendas = vendas;
    });
  }

  deleteVendas(venda: Venda) {
    this.vendaService.deleteVenda(venda).subscribe(() => {
      this.getVendas();
    });
  }

  produto = {} as Produto;
  produtos: Produto[] = [];

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

  item = {} as Venda;
  carrinho: Venda[] = [];

  adicionarCarrinho(produto: Produto) {
    let checkEstoque = (document.getElementById('quantidade-venda') as HTMLInputElement)?.value;

    if (checkEstoque == null) {
      alert('Informe a quantidade que deseja adicionar ao carrinho!');
    } else {
      let quantidade = parseInt(checkEstoque, 10);

      if (isNaN(quantidade)) {
        alert('Quantidade inválida!');
      } else if (quantidade > produto.quantidade) {
        alert('Quantidade insuficiente em estoque para venda!');
      } else {
        var produtoVenda = {} as Venda;
        produtoVenda.codigoVenda = this.codigoNovaVenda;
        produtoVenda.valorProduto = produto.valor;
        produtoVenda.quantidadeProduto = quantidade;
        produtoVenda.dataVenda = new Date();
        produtoVenda.nomeProduto = produto.descricao;

        this.carrinho.push(produtoVenda);
      }
    }
  }

  removerItemCarrinho(venda: Venda) {
    const index = this.carrinho.indexOf(venda); // Obtém o índice do produto no carrinho
    if (index !== -1) {
      this.carrinho.splice(index, 1); // Remove o produto do carrinho
    }
  }

  fecharVenda() {
    if (this.carrinho.length == 0) {
      alert('Carrinho vazio!');
    } else {
      alert('Venda finalizada com sucesso!');
      this.imprimeNota();

      for (let item of this.carrinho) {
        this.vendaService.saveVenda(item).subscribe(() => {
          //console.log(item);
          this.carrinho = [];
          this.ngOnInit();
        });;
      }
      this.mostrarElemento = false;
    }
  }

  cancelarVenda() {
    this.mostrarElemento = false;
    this.carrinho = [];
    this.ngOnInit();
    this.codigoNovaVenda = 0;
    alert('Venda cancelada!');
  }

  novaVenda() {
    this.mostrarElemento = true;
    this.getVendas();
    let ultimaVenda = this.vendas.length - 1;
    this.codigoNovaVenda = ((this.vendas[ultimaVenda].codigoVenda) + 1);
    //console.log(this.codigoNovaVenda);
  }

  imprimeNota() {
    if (this.carrinho.length > 0) {
      let table = `
        
       <div style="width:100%; text-align: center;">
        <img src="../assets/images/img-impressao.png" alt="Logo da Empresa">
       </div>
       <div style="width:100%; text-align: center; margin-top: 5px;">CNPJ: XX.XXX.XXX/XXXX-XX BANDPAR COM.PARAFUSOS E FERRAMENTAS LTDA</div>
       <div style="width:100%; text-align: center; margin-top: 5px;">RUA SERRA DOS PERINEUS, 00576 - J BANDEIRANTES LONDRINA - PR <br>fone: (43)3028-5949 e-mail: bandparferramentas1@hotmail.com</div>
        <table style="width:100%; margin-top: 10px; border-collapse: collapse;" border="1">
          <tr>
            <th>Item</th>
            <th>Nome produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Subtotal</th>
          </tr>
      `;

      let subtotal = 0;

      this.carrinho.forEach((item, index) => {
        const itemSubtotal = item.quantidadeProduto * item.valorProduto;
        subtotal += itemSubtotal;

        table += `
          <tr>
            <td>${index + 1}</td>
            <td>${item.nomeProduto}</td>
            <td>${item.quantidadeProduto}</td>
            <td>R$ ${item.valorProduto}</td>
            <td>R$ ${itemSubtotal.toFixed(2)}</td>
          </tr>`;
      });

      table += `
        <tr>
          <td colspan="4" style="text-align: right;"><strong>Total:</strong></td>
          <td>R$ ${subtotal.toFixed(2)}</td>
        </tr>
      `;

      table += '</table>';

      const oIframe = document.createElement('iframe');
      oIframe.id = 'iframePrint';
      oIframe.style.display = 'none';
      const teste = document.getElementById('impressao');
      if (teste != null) {
        teste.appendChild(oIframe);

        const oDoc = oIframe.contentWindow?.document;
        if (oDoc) {
          oDoc.write(decodeURI('%3C') + 'body onload="this.focus(); this.print();"' + '>');
          oDoc.write(table + '</body>');
          oDoc.close();
        }

        setTimeout(() => {
          oIframe.remove();
        }, 2000);
      }
    }
  }

}

