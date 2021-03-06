import { CartService } from './../../services/domain/cart.service';
import { PedidoDTO } from './../../models/pedido.dto';
import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';

/**
 * Generated class for the EnderecoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-endereco',
  templateUrl: 'endereco.html',
})
export class EnderecoPage {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public storage: StorageService,
               public clienteService: ClienteService,
               public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.items = response['enderecos'];

        let carrinho = this.cartService.getCart();

        this.pedido = {
           cliente : {id: response['id']},
           enderecoDeEntrega : null,
           pagamento : null,
           itens : carrinho.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
        }

      }, error => {
           if(error.status == 403){
             this.navCtrl.setRoot('HomePage');
           }
      })
    }else{
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(item: EnderecoDTO){
     this.pedido.enderecoDeEntrega = {id: item.id};
     this.navCtrl.push('PagamentoPage', {pedido: this.pedido});
  }
}
