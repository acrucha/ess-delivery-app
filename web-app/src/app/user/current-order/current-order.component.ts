import { Component, OnInit } from '@angular/core';
import { Order, order } from '../orders/order';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Restaurant, Product } from 'src/app/admin/restaurant';
import { CurrentOrderService } from './current-order.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {

  localStorage = new LocalStorageService();

  data: any;
  type: string;
  rest: Restaurant;
  curOrder: Order;
  couponName: string;
  discount: number;
  free: string;
  
  constructor(private service: CurrentOrderService, private route: Router) {
    this.curOrder = order;
  }
  
  ngOnInit() {
    this.type = this.localStorage.get('type');
    this.data = this.localStorage.get(this.type);
    this.curOrder.address = this.data.address;

    this.service.getRestaurant("BK").then(res => {
      this.rest = res;
      this.curOrder.products = this.rest.products;
      this.setZeroQuantity();
      this.curOrder.amount = 0;
      this.couponName = '';
    });
    
    this.discount = 0;
  }
  
  setZeroQuantity(){
    this.curOrder.products.forEach(product => product.quantity = 0);
  }
  
  updateFree(){
    var f = this.curOrder.amount * (this.discount/100);
    this.free = f.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  insertCoupon() {
    // this.curOrder.coupon.name = this.couponName;
    this.service.insertCoupon(this.couponName, this.curOrder)
      .then(res => {
        this.curOrder = res;
        if(this.curOrder.coupon.id != '') {
          this.discount = this.curOrder.coupon.discount*100;
          this.updateFree();
          alert("Cupom aplicado com sucesso!");
        } else {
          alert("Cupom não pode ser aplicado!");
        }
      })
  }

  back() {
    this.route.navigate(["user", this.data.id, "profile"]);
  }

  formatedAmount(){
    return this.curOrder.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  updateAmount(){
    this.curOrder.amount = 0;
    this.curOrder.products.forEach(product => {
      this.curOrder.amount += (product.price * product.quantity);
    })
    this.updateFree();
    this.curOrder.amount *= (1-(this.discount/100));
  }
  removeCoupon(){

  }
  confirmOrder(){}

  // e as de metodos de pagamento
  

}

// - [ ]  fazer a tela de finalizar pedido: produtos e quantidades (caixa de seleção), restaurante e endereço de entrega, linkar com método de pagamento (essa rota já tem em tese)
// - [ ]  produtos e quantidades: é uma tabelinha normal no front
//     1. cria pedido no back (é o arquivo)
//     2. enquanto o carinha estiver logado eu to mandando esse pedido entre as páginas
//     3. Fazer botão de salvar alterações ⇒ put pra curr-order // menor prioridade da vida
