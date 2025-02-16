class ShoppingItem {
    constructor({ id, description, state, quantity, price, shoppingListId, itemCategoryId }) {
      this.id = id;
      this.description = description;
      this.state = state;
      this.quantity = quantity;
      this.price = price;
      this.shoppingListId = shoppingListId;
      this.itemCategoryId = itemCategoryId;
    }
  }
  
  module.exports = ShoppingItem;
  