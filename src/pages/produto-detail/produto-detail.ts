import { CartService } from './../../services/domain/cart.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item : ProdutoDTO;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public produtoService: ProdutoService,
              public cartService: CartService,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
     let produtoId = this.navParams.get('produtoId');
     this.produtoService.findById(produtoId)
                        .subscribe(response =>{
                          this.item = response;
                          this.getImageUrlIfExists();
                        },
                      error =>{});
  }


  getImageUrlIfExists(){
    let loader = this.presentLoading();
    this.produtoService.getImageFromBucket(this.item.id)
                       .subscribe(response => {
                        loader.dismiss();
                        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
                       },
                       error =>{});
   
}

addToCart(produto: ProdutoDTO){
  this.cartService.addProduto(produto);
  this.navCtrl.setRoot('CartPage');
}

presentLoading() {
  const loader = this.loadingCtrl.create({
    content: "Aguarde...",
  });
  loader.present();
  return loader;
}

}
