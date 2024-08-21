export const cartLocators = {
  cartWrapper: '[class="col-lg-8"]',
  cartTitle: '[class="col-lg-8"] h2',
  totalPrice: "div h3",
  productName: '[class="success"] td >> nth=1',
  productPrice: '[class="success"] td >> nth=2',
  placeOrderButton: 'button:has-text("Place Order")',
  orderModal: '[id="orderModal"]',

  //product table
  table: '[class="table-responsive"]',
  tableTitleProduct: 'th:has-text("Title")',
  tablePriceProduct: 'th:has-text("Price")',
  tableRows: '[class="success"]',

  //place order modal
  price: '[id="totalm"]',
  nameInput: '[id="name"]',
  countryInput: '[id="country"]',
  cityInput: '[id="city"]',
  creditCardInput: '[id="card"]',
  monthInput: '[id="month"]',
  yearInput: '[id="year"]',
  modalFooter: '[class="modal-content"] >> nth=2',
  purchaseButton:
    '[class="modal-content"] >> nth=2 >> button:has-text("Purchase")',
  closeButton: '[class="modal-content"] >> nth=2 >> button:has-text("Close")',
  thankYouModal: '[class$="showSweetAlert visible"]',
  thankYouMessage: '[class$="showSweetAlert visible"] h2',
  okButton:
    '[class$="showSweetAlert visible"] button:not(.cancel.btn.btn-lg.btn-default)',
};
