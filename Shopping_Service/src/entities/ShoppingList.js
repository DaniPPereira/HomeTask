class ShoppingList {
    constructor({ id, title, startDate, endDate, homeId }) {
      this.id = id;
      this.title = title;
      this.startDate = startDate;
      this.endDate = endDate;
      this.homeId = homeId;
    }
  }
  
  module.exports = ShoppingList;