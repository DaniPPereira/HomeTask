class Task {
    constructor({ title, description, date, state, photo, homeId, userId, taskCategoryId }) {
      if (!title || !description || !date || !state || !homeId || !userId || !taskCategoryId) {
        throw new Error('Missing required fields for Task');
      }
      this.title = title;
      this.description = description;
      this.date = date;
      this.state = state;
      this.photo = photo;
      this.homeId = homeId;
      this.userId = userId;
      this.taskCategoryId = taskCategoryId;
    }
  }
  
  module.exports = Task;
  