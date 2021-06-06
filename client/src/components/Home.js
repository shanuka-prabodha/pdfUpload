const {Component} = require("react");

class Home extends Component{

    constructor(props) {
        super(props);

        this.State={
            isLoading:true,
            signUpError:'',
            signInError:''
        }
    }

    component

    render() {

        const {
            isLoading,
        } = this.state

        if(isLoading){
            return (<div><p>Loading...</p></div>)
        }

    }

}