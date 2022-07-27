import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
@Component({
  selector: 'app-produto-novo',
  templateUrl: './produto-novo.component.html',
  styleUrls: ['./produto-novo.component.scss']
})

export class ProdutoNovoComponent implements OnInit {
  productForm: FormGroup;
  prod_name: String = '';
  prod_desc: String = '';
  category: any = [];
  updated_at: Date = null;
  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategory();

     this.productForm = this.formBuilder.group({
    'name' : [null, Validators.required],
    'quantity' : [null, Validators.required],
    'category_id' : [null, Validators.required]
  });
  }

  addProduto(form: NgForm) {
    this.isLoadingResults = true;
    console.log(form);
    this.api.addProduto(form)
      .subscribe(res => {
        console.log(res)
          this.isLoadingResults = false;
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  getCategory() {
    this.api.getCategory()
      .subscribe(data => {
        this.category = data;
        console.log(this.category);
      });
  }
}
