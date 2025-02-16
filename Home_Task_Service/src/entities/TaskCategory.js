class TaskCategory {
    constructor({ description }) {
      if (!description) {
        throw new Error('Missing required fields for TaskCategory');
      }
      this.description = description;
    }
  }
  
  module.exports = TaskCategory;
  