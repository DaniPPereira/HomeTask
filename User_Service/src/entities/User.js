class User {
  constructor({ name, email, password, roles, token = null, profilepicture = null, verificationcode = null, codeexpiry = null }) {
      if (!name || !email || !password || !roles) {
          throw new Error('Missing required fields for user');
      }
      this.name = name;
      this.email = email;
      this.password = password;
      this.roles = roles;
      this.token = token;
      this.profilepicture = profilepicture;
      this.verificationcode = verificationcode;
      this.codeexpiry = codeexpiry;
  }
}

module.exports = User;