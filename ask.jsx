import React from 'react';
import fetch from 'isomorphic-fetch';

export default class Pagination extends React.Component {
        
    constructor(props){
        super(props);
        this.state = {
            contacts : [],
            per:5,
            page:1,
            totalPages:null,
            country:null
        }

    }

   
    componentDidMount(){
        document.getElementById('us').click()
    }

    loadContacts = (country) => {
        const {per, page, contacts} = this.state;
        if (country === null){
            country = 'United States'
        }
        console.log(country)
        const url = `http://127.0.0.1:8000/api/users/?limit=${per}&page=${page}&country=${country}`
        fetch(url)
        .then(response => response.json())
        .then(
            json => {
                this.setState({
                    contacts:json.data
                    // contacts:[...contacts, ...json.contacts]
                })
            }
        )
    }

    loadMore = (country) => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }), this.loadContacts(country))
    }

    handleCountry = (event) => {
        let { value } = event.target;
        this.setState({
          country: value,
          page:1
        }, () => {
          this.loadContacts(value);
        })
      }


    render(){
        return (
            <div>
                <div>

                    <label class="radio-inline">
                        <input type="radio" id="us" name="country" value="United States" onClick={this.handleCountry} />United States
                    </label>
                    <label class="radio-inline">
                        <input type="radio" id="india" name="country" value="India" onClick={this.handleCountry} />India
                    </label>
                    <label class="radio-inline">
                        <input type="radio" id="canada" name="country" value="Canada" onClick={this.handleCountry} />Canada
                    </label>
       
                </div>
                <ul className="contacts" style={{ width:'300px' }}>
                    {
                        this.state.contacts.map(contact => 
                            <li key={contact.id} style={{ padding:'5px 5px 5px 5px' }}>
                                <div className="contact" style={{ background:'#0099ff', padding:'10px', color:'white' }}>
                                    <div>{ contact.id }</div>
                                    <div>{ contact.country }</div>
                                    <div>{ contact.name }</div>
                                </div>
                            </li>
                        )
                    }
                </ul>
                <button onClick={() => this.loadMore(this.state.country)}>Load More</button>
            </div>
        )
    }
}