export default class PsConfig {

    static versionNo : String = '1.1';

    ///
    /// API Key to connection with Main Backend
    /// This key must equal with key from backend
    ///
    static apiKey: String = "teampsisthebest";

    ///
    /// Live Mode
    /// ------------
    /// If you want to upload to server, please enable below and comment Development below
    ///
    static fixedDomain: String = "https://casacar.xyz/admotors"; 
    static domain: String = "http://localhost:3000"; 

    ///
    /// Development Mode
    /// -----------------
    /// Before upload to server, please comment this 2 lines.
    ///
    // static fixedDomain: String = "https://www.products.panacea-soft.co/flutter-admotors";    
    // static domain: String = "http://localhost:3000";

    ///
    /// Firebase Config
    ///
    static firebaseConfig = {
       apiKey: "AIzaSyCLlE8roqpqVlEg-qlKxHwquNP88BNMa6I",
  authDomain: "admotors-frontend.firebaseapp.com",
  projectId: "admotors-frontend",
  storageBucket: "admotors-frontend.appspot.com",
  messagingSenderId: "685941535191",
  appId: "1:685941535191:web:42b13c641956da018edb92",
  measurementId: "G-GFD6G0E01S"
};
    
    // static firebaseConfig = {
    //     apiKey: "AIzaSyCCbP35UgAsfdnJaQM4TxWDLICYR4gDi28",
    //     authDomain: "flutter-admotors.firebaseapp.com",
    //     databaseURL: "https://flutter-admotors.firebaseio.com",
    //     projectId: "flutter-admotors",
    //     storageBucket: "flutter-admotors.appspot.com",
    //     messagingSenderId: "959099436187",
    //     appId: "1:959099436187:web:915d817bd3b509b1b81a3e"
    // };
    
    ///
    /// Base URL * Don't update it *
    ///
    static base: String = PsConfig.domain; 
    static baseUrl: String = PsConfig.domain + '/index.php';
    static fixedPath : String = PsConfig.fixedDomain;
    
    /// 
    /// Debug Mode
    ///
    static isDebugMode : Boolean = true;

    /// Is Demo
    ///
    static is_demo : Boolean = true;

}
