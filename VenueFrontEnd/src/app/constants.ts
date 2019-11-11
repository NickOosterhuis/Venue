export class Constants {

  // API URLS
  public static get API_BASE_URL(): string { return 'http://localhost:8080'; }


  // AUTH PATHS
  public static get API_LOGIN(): string { return  '/auth/login'; }

  public static get API_REGISTER(): string { return  '/auth/signup'; }

  public static get API_CHECK_EMAIL(): string { return '/auth/checkemail'; }

  public static get API_CHECK_USERNAME(): string { return '/auth/checkusername'; }

  // USER PATHS

  public static get API_USER_ME(): string { return '/user/me'; }

  public static get API_USER_CHANGE_PASSWORD(): string { return '/changePassword'; }

  // VENUE PATHS

  public static get API_VENUE(): string { return '/venue'; }

  public static get API_VENUE_CHECK(): string {return '/checkname'; }

  // EVENT PATHS

  public static get API_EVENT(): string { return '/event'; }

  public static get API_BY_VENUE(): string {return '/byVenue'; }

  // OAUTH URLS
  public static get OAUTH2_REDIRECT_URL(): string { return 'http://localhost:4200/oauth2/redirect'; }

  public static get GOOGLE_AUTH_URL(): string { return this.API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + this.OAUTH2_REDIRECT_URL; }

  public static get FACEBOOK_AUTH_URL(): string { return this.API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + this.OAUTH2_REDIRECT_URL; }

  // ALERT MESSAGES
  public static get WRONG_EMAIL_OR_PASSWORD(): string { return  'Wrong email or password'; }

  public static  get USER_ALREADY_EXISTS(): string { return 'This username and/or email already exists'; }

  // PLACEHOLDER IMG
  public static get PLACEHOLDER_IMAGE(): string { return 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'; }
}
