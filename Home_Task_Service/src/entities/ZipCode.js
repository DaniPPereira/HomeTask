class ZipCode {
    constructor({ postalCode, city }) {
      if (!postalCode || !city) {
        throw new Error('Missing required fields for ZipCode');
      }
      this.postalCode = postalCode;
      this.city = city;
    }
  }
  
  module.exports = ZipCode;
  