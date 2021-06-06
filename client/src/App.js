import './App.css';
import Header from './components/header';
import AddStudent from "./components/AddStudent";
import {BrowserRouter as Router,Route} from "react-router-dom";
import AllStudents from "./components/AllStudents";
import Bill from "./components/Bill";
import payment from "./components/payment";
import paymentsuccess from "./components/Payment_success";
import UploadFile from "./components/UploadFile";
import FileList from "./components/FilesList";

function App() {
  return (
      <Router>
            <div>
                <Header/>
                <Route path="/" exact component={AllStudents}/>
                <Route path="/add" exact component={AddStudent}/>
                <Route path="/bill" exact component={Bill}/>
                <Route path="/payment" exact component={payment}/>
                <Route path="/success" exact component={paymentsuccess}/>
                <Route path="/UploadFile" exact component={UploadFile}/>
                <Route path="/FileList" exact component={FileList}/>
            </div>
      </Router>
  );
}

export default App;
