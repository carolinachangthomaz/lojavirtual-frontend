import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoConfirmacaoPage } from './pedido-confirmacao';
import { PedidoService } from '../../services/domain/pedido.service';

@NgModule({
  declarations: [
    PedidoConfirmacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoConfirmacaoPage),
  ],
  providers: [
    PedidoService
  ]
})
export class PedidoConfirmacaoPageModule {}
