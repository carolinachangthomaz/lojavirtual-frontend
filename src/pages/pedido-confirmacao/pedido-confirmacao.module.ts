import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoConfirmacaoPage } from './pedido-confirmacao';

@NgModule({
  declarations: [
    PedidoConfirmacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoConfirmacaoPage),
  ],
})
export class PedidoConfirmacaoPageModule {}
