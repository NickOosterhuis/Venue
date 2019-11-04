export class Constants {

  // API URLS
  public static get API_BASE_URL(): string { return 'http://localhost:8080'; }

  public static get API_LOGIN(): string { return  '/auth/login'; }

  public static get API_REGISTER(): string { return  '/auth/signup'; }

  // ALERT MESSAGES
  public static get WRONG_EMAIL_OR_PASSWORD(): string { return  'Wrong email or password'; }

  public static  get USER_ALREADY_EXISTS(): string {return 'This username and/or email already exists'; }


}
