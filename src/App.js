import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';

const WebRegex = RegExp(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/);

const PhoneRegex = RegExp(/^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/);

const formValid = formError => {
  let valid = true;

  Object.values(formError).forEach(val => {
    val.length > 0 && (valid = false);
  });

  return valid;
}

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name:null,
      phonenumber:null,
      city:null,
      website:null,
      about:null,
      formError:{
        name:"",
        phonenumber:"",
        website:""
      }
    }
      }

  handleChange = (event) =>{
      
    //this.setState({[event.target.name]:event.target.value});
    const { name, value} = event.target;
      let formError = this.state.formError;

      switch(name){
        case 'name':
          formError.name = value.length <3 ? "minimum 3 character required" : "";
          break;

          case 'phonenumber': 
          formError.phonenumber = PhoneRegex.test(value) ? "" : "Invalid Format";
          break;

          case 'website':
          formError.website = WebRegex.test(value) ? "" : "Invalid Website address";
          break;

        default:
        break;
      }
      this.setState({formError,[name]:value}, () => console.log(this.state))
    }

     handleSubmit = (event) => {
      
      if (formValid(this.state.formError)) {
        const obj1 ={
        name:this.state.name,
        city:this.state.city,
        phonenumber:this.state.phonenumber,
        website:this.state.website,
        about:this.state.about
        }
       
        // fetch('http://localhost:4000/create',  { 'mode': 'no-cors' },{
        //   method:'POST',
        //   headers:{ 'Content-Type':'application/json' },
        //   body: JSON.stringify({obj1})
        // });
      //   axios.post('http://localhost:5000/', obj1)
      // .then(function(res) {
      //   console.log(res.obj1);
      // })
      // .catch(function(error){
      //   console.log(error);
      // });
      }
      else {
        console.error('form Invalid');
      }          
    }
  render() {
  const {formError} = this.state;
    return (
      <div className="container">
      <form  method = "post" action = "http://localhost:5000/create">
      <h3>Profile Info</h3>
      <div>
       <div className="form-group">
         <label>Name:</label>
         <input
         type="text"
         className = "form-control"
         placeholder="Name" 
         name="name"
         //value={this.state.name}
         onChange={this.handleChange}
        />
        {formError.name.length > 0 && (
          <span>{formError.name}</span>  
        )}
       </div> 
       <br></br>
      <div className="form-group">
         City :<input 
         type="text" 
         className = "form-control"
         placeholder="City" 
         name="city"
         //value={city}
         onChange={this.handleChange}
        />
      </div>
      <br></br>
      <div className="form-group">
          PhoneNumber:<input
          type="tel" 
          className = "form-control"
          placeholder="PhoneNumber" 
          name="phonenumber"
          //value={phonenumber}
          onChange={this.handleChange}
        />
         {formError.phonenumber.length > 0 && (
          <span>{formError.phonenumber}</span>  
        )}
      </div>
      <br></br>
      <div className="form-group">
      Website:<input
          type="text"
          className = "form-control"
          placeholder="Website"
           name="website"
           //value={website}
           onChange={this.handleChange}
          />
           {formError.website.length > 0 && (
          <span>{formError.website}</span>  
        )}
      </div>
      <br></br>
      </div>
      <h3>Profile Description</h3>
      <div className = "form-group">
      About : <textarea cols="40"  className = "form-control" rows="5" name="about" onChange={this.handleChange}/>
      </div>
      <div className = "form-group">
      <button className="form-control" type="submit">Save Changes</button>
      </div>

       </form>
      </div>
    );
  }
}

export default App;
