import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua Hum",
        numero: "23",
        complemento: "Apto 4",
        bairro: "Centro",
        cep: "232432545",
        cidade: {
          id: "1",
          nome: "São Paulo",
          estado: {
            id: "1",
            nome: "SP"
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua dois",
        numero: "454",
        complemento: "casa",
        bairro: "Centro",
        cep: "77676777",
        cidade: {
          id: "2",
          nome: "Uberlândia",
          estado: {
            id: "2",
            nome: "Minas"
          }
        }
      }
     ]
  }

}
