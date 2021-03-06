import { PedidoService } from './../../services/domain/pedido.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { ClienteDTO } from './../../models/cliente.dto';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart-item';
import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PedidoConfirmacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedido-confirmacao',
  templateUrl: 'pedido-confirmacao.html',
})
export class PedidoConfirmacaoPage {

  pedido: PedidoDTO;
  carrinhoItens: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codPedido: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public carrinhoService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService) {

   this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.carrinhoItens = this.carrinhoService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
        },
         error => {
          this.navCtrl.setRoot('HomePage');
      })
  }

  private findEndereco(id: string ,list: EnderecoDTO[]) : EnderecoDTO{
    let position = list.findIndex(x => x.id == id);
    return list[position];

  }

  total(){
    return this.carrinhoService.getTotal();
  }

  back(){
    this.navCtrl.setRoot('CartPage');
  }

  home(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  confirmarPedido(){
     this.pedidoService.insert(this.pedido)
     .subscribe(response => {
       this.carrinhoService.createOrClearCart();
       this.codPedido =  this.extractId(response.headers.get('location'));
     },
    error => {
      if(error.status == 403){
        this.navCtrl.setRoot('HomePage');
      }
    })
  }

  private extractId(location: string){
    let position = location.lastIndexOf('/');
    return location.substring(position +1, location.length);

  }
}
