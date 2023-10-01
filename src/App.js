import logo from './logo.svg';
import './App.css';
import NavBar from "./components/NavBar";
import Recorder from "./components/Recorder";
import PermissionsControl from "./components/PermissionsControl";



function App() {
  return (
    <div className="App">
    <NavBar />
    <PermissionsControl />
    <Recorder />
    </div>
  );
}

export default App;




// {
//   "manifest_version": 3,
//   "name": "HelpMeOut",
//   "version": "1.0",
//   "description": "Description of your extension",
//   "permissions": ["activeTab", "storage"],
//   "action": {
//     "default_popup": "index.html",
//     "default_icon": {
//       "16": "images/icon16.png",
//       "48": "images/icon48.png",
//       "128": "images/icon128.png"
//     }
//   },
//   "icons": {
//     "16": "images/icon16.png",
//     "48": "images/icon48.png",
//     "128": "images/icon128.png"
//   },
//   "content_scripts": [
//     {
//       "matches": ["<all_urls>"],
//       "js": ["content.js"]
//     }
//   ],
//   "browser_action": {
//     "default_icon": {
//       "16": "images/icon16.png",
//       "48": "images/icon48.png",
//       "128": "images/icon128.png"
//     },
//     "default_title": "Your Extension Name",
//     "default_popup": "popup.html"
//   },
//   "icons": {
//     "16": "images/icon16.png",
//     "48": "images/icon48.png",
//     "128": "images/icon128.png"
//   },
//   "permissions": ["activeTab", "storage"]
// }









// //{
//   "short_name": "React App",
//   "name": "Create React App Sample",
//   "icons": [
//     {
//       "src": "favicon.ico",
//       "sizes": "64x64 32x32 24x24 16x16",
//       "type": "image/x-icon"
//     },
//     {
//       "src": "logo192.png",
//       "type": "image/png",
//       "sizes": "192x192"
//     },
//     {
//       "src": "logo512.png",
//       "type": "image/png",
//       "sizes": "512x512"
//     }
//   ],
//   "start_url": ".",
//   "display": "standalone",
//   "theme_color": "#000000",
//   "background_color": "#ffffff"
// }