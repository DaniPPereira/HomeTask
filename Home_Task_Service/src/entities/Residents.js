class Residents {
    constructor({ homeId, userId }) {
      if (!homeId || !userId) {
        throw new Error('Missing required fields for Residents');
      }
      this.homeId = homeId;
      this.userId = userId;
    }
  }
  
  module.exports = Residents;
  