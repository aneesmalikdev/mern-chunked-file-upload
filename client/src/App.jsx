import "./App.css";
import ChunkedUpload from "./components/ChunckedUpload";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
function App() {
  return (
    <>
      <ChunkedUpload />
    </>
  );
}

export default App;
