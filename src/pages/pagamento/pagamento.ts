import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the PagamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

  pedido: PedidoDTO;
  parcelas: number[] = [1,2,3,4,5,6,7,8,9,10];

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.pedido = this.navParams.get('pedido');
      
      this.formGroup = this.formBuilder.group({
        numeroDeParcelas: [1, Validators.required],
        "@type": ["pagamentoComCartao", Validators.required]
      });
  }

  nextPage() {
    console.log(this.pedido);
    this.pedido.pagamento = this.formGroup.value;
    this.navCtrl.setRoot('PedidoConfirmacaoPage', {pedido: this.pedido});
  }

}
