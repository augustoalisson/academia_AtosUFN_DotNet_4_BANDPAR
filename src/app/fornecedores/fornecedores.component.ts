import { Component } from '@angular/core';
import { FornecedorService } from '../services/fornecedor.service';
import { Fornecedor } from '../models/fornecedor';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent {

  fornecedor = {} as Fornecedor;
  fornecedores: Fornecedor[] = [];

  constructor(private fornecedorService: FornecedorService) { }

  ngOnInit() {
    this.getFornecedores();
  }

  saveFornecedor(form: NgForm) {
    if (this.fornecedor.id !== undefined) {
      this.fornecedorService.updateFornecedor(this.fornecedor).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      //console.log(this.fornecedor);
      this.fornecedorService.saveFornecedor(this.fornecedor).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getFornecedores() {
    this.fornecedorService.getFornecedores().subscribe((fornecedores: Fornecedor[]) => {
      this.fornecedores = fornecedores;
    });
  }

  deleteFornecedor(fornecedor: Fornecedor) {
    this.fornecedorService.deleteFornecedor(fornecedor).subscribe(() => {
      this.getFornecedores();
    });
  }


  editFornecedor(fornecedor: Fornecedor) {
    this.fornecedor = { ...fornecedor };
  }

  cleanForm(form: NgForm) {
    this.getFornecedores();
    form.resetForm();
    this.fornecedor = {} as Fornecedor;
  }

}

