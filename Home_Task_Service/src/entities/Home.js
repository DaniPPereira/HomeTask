class Home {
    constructor({ name, address, userId, zipCodeId }) {
      if (!name || !address || !userId || !zipCodeId) {
        throw new Error('Missing required fields for Home');
      }
      this.name = name;
      this.address = address;
      this.userId = userId;
      this.zipCodeId = zipCodeId;
    }
  }
  
  module.exports = Home;
  