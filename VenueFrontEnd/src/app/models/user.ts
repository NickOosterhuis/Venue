export class User {
  name: string;
  email: string;
  password: string;

  constructor(name, email, password) {
    this.name = name;
    this.password = password;
    this.email = email;
  }
}
