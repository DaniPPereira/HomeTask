class TaskParticipants {
    constructor({ taskId, userId }) {
      if (!taskId || !userId) {
        throw new Error('Missing required fields for TaskParticipants');
      }
      this.taskId = taskId;
      this.userId = userId;
    }
  }
  
  module.exports = TaskParticipants;
  