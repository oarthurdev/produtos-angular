import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.scss']
})
export class ProdutoEditarComponent implements OnInit {
  _id: String = '';
  productForm: FormGroup;
  nome_produto: String = '';
  category: any = [];
  desc_produto: String = '';
  preco_produto: number = null;
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategory();
    this.getProduto(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'quantity' : [null, Validators.required],
      'category_id' : [null, Validators.required]
 });
 }

 getProduto(id) {
  this.api.getProduto(id).subscribe(data => {
    this._id = data.id;
    this.productForm.setValue({
      name: data.name,
      quantity: data.quantity,
      category_id: data.category_id
    });
  });
}

updateProduto(form: NgForm) {
  this.isLoadingResults = true;
  this.api.updateProduto(this._id, form)
    .subscribe(res => {
        this.isLoadingResults = false;
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
}

getCategory() {
  this.api.getCategory()
    .subscribe(data => {
      this.category = data;
    });
}
}
