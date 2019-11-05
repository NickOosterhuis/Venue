export class Constants {

  // API URLS
  public static get API_BASE_URL(): string { return 'http://localhost:8080'; }

  public static get API_LOGIN(): string { return  '/auth/login'; }

  public static get API_REGISTER(): string { return  '/auth/signup'; }

  public static get API_USER_ME(): string { return '/user/me';}

  // OAUTH URLS
  public static get OAUTH2_REDIRECT_URL(): string { return 'http://localhost:4200/oauth2/redirect'}

  public static get GOOGLE_AUTH_URL(): string { return this.API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + this.OAUTH2_REDIRECT_URL}

  public static get FACEBOOK_AUTH_URL(): string { return this.API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + this.OAUTH2_REDIRECT_URL}

  // ALERT MESSAGES
  public static get WRONG_EMAIL_OR_PASSWORD(): string { return  'Wrong email or password'; }

  public static  get USER_ALREADY_EXISTS(): string {return 'This username and/or email already exists'; }


}
