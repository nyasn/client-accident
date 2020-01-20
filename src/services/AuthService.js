
import ApiService from './ApiService';


const ENDPOINTS = {
  LOGIN: '/auth/loginAdmin',
  SIGN_UP: '/auth/register',
  LOGOUT: '/auth/logout',
  ME:'/auth/me',
  ACCIDENTS:'/accidents/all',
  FORGOT_PASSWORD: '/users/forgot-password',
  USER: '/users',
  USER_ACTIVE: '/users/active',
  RESET_PASSWORD: '/users/reset-password',
  VEHICULE: '/accidents/vehicules',
  PERSONNEDIE: '/accidents/personnedie',
  PERSONNEHILL: '/accidents/personnehill',
  TEMOIN: '/accidents/temoins',
  BIENS: '/accidents/biens',
  ACCIDENT:'/accidents'
};

class AuthService extends ApiService {
  constructor() {
    super();
    this.init();
  }

  init = async () => {
    const token = this.getToken();
    const user = this.getUser();

    if (token && user) {
      await this.setAuthorizationHeader();
      this.api.setUnauthorizedCallback(this.destroySession.bind(this));
    }
  };

  setAuthorizationHeader = async () => {
    const token = await this.getToken();
    if (token) {
      this.api.attachHeaders({
        Authorization: `${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      });
    }

  };

  createSession = async user => {
    localStorage['appState'] = JSON.stringify(user);
    //await AsyncStorage.setItem("user", JSON.stringify(user));
    await this.setAuthorizationHeader();
    // const expoPushToken = await askForNotificationsPermission();
    // if (expoPushToken) {
    //   await AsyncStorage.setItem("expoPushToken", expoPushToken);
    //   // TODO this token need to be saved on BE
    //   // notificationService.sendExpoTokenToServer(expoPushToken);
    // }
  };

  destroySession = () => {
    localStorage.clear();
    this.api.removeHeaders(['Authorization']);
  };

  login = async loginData => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGIN, loginData);

    await this.createSession(data);
    return data;
  };


  logout = async () => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGOUT);
    await this.destroySession();
    return { ok: true, data };
  };
  getuser =  async () =>{
    const {data}= await this.apiClient.get(ENDPOINTS.ME);
    return data;
  }
  getAllAccident =  async () =>{
    const {data}= await this.apiClient.get(ENDPOINTS.ACCIDENTS);
    return data;
  }
  
  forgotPassword = data => {
    return this.apiClient.post(ENDPOINTS.FORGOT_PASSWORD, data);
  };

  resetPassword = data => {
    return this.apiClient.post(ENDPOINTS.RESET_PASSWORD, data);
  };

  signup = async signupData => {
    await this.apiClient.post(ENDPOINTS.SIGN_UP, signupData);
    const { email, password } = signupData;
    return this.login({ email, password });
  };

  getToken = async () => {
    const user = await localStorage['appState'];
    return user ? JSON.parse(user).token : undefined;
  };

  getUser = async () => {
    const user = await localStorage['appState'];
    return JSON.parse(user);
  };

  updateUserInStorage = async property => {
    const user = await localStorage['appState'];
    let jsonUser = JSON.parse(user);
    jsonUser = { ...jsonUser, ...property };
    localStorage['appState'] = JSON.stringify(jsonUser);
  };
  createNewUser = async userData =>{
    const { data } = await this.apiClient.post(ENDPOINTS.USER, userData);
    return data;
  }
  editUserById = async (id,dataUser) =>{
    const {data} = await this.apiClient.put(ENDPOINTS.USER+'/'+id,dataUser);
    return data;
  }
  getAllUser = async ()=>{
    const { data } = await this.apiClient.get(ENDPOINTS.USER);
    return data;
  }
  deleteUserById = async id =>{
    const { data } = await this.apiClient.delete(ENDPOINTS.USER+'/'+id);
    return data;
  }
  activeUser = async (id,etat) =>{
    const {data} = await this.apiClient.put(ENDPOINTS.USER_ACTIVE+"/"+id,etat);
    return data;
  }
  getUserById = async (id) =>{
    const {data} = await this.apiClient.get(ENDPOINTS.USER+"/"+id);
    return data;
  }
  getAccidentById = async (id) =>{
    const {data} = await this.apiClient.get(ENDPOINTS.ACCIDENT+"/"+id);
    return data;
  }
  getVehiculesByAccidentID = async (id)=>{
    const {data } = await this.apiClient.get(ENDPOINTS.VEHICULE+'/'+id);
    return data;
  }
  getTemoinsByAccidentID = async (id)=>{
    const {data } = await this.apiClient.get(ENDPOINTS.TEMOIN+'/'+id);
    return data;
  }
  getPersonedieByAccidentID = async (id)=>{
    const {data } = await this.apiClient.get(ENDPOINTS.PERSONNEDIE+'/'+id);
    return data;
  }
  getPersonnehillByAccidentID = async (id)=>{
    const {data } = await this.apiClient.get(ENDPOINTS.PERSONNEHILL+'/'+id);
    return data;
  }
  getBienByAccidentID = async (id)=>{
    const {data } = await this.apiClient.get(ENDPOINTS.BIENS+'/'+id);
    return data;
  }
}

const authService = new AuthService();
export default authService;
