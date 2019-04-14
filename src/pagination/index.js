import React from 'react';
import fetch from 'isomorphic-fetch';

export default class Pagination extends React.Component {
    state = {
        contacts : [],
        per:5,
        page:1,
        totalPages:null
    }

    componentWillMount(){
        this.loadContacts()
    }

    loadContacts = () => {
        const {per, page, contacts} = this.state;
        const url = `https://student-example-api.herokuapp.com/v1/contacts.json?per=${per}&page=${page}`
        fetch(url)
        .then(response => response.json())
        .then(
            json => {
                this.setState({
                    contacts:json.contacts
                    // contacts:[...contacts, ...json.contacts]
                })
            }
        )
    }

    loadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }), this.loadContacts)
    }



    render(){
        return (
            <div>
                <ul className="contacts" style={{ width:'300px' }}>
                    {
                        this.state.contacts.map(contact => 
                            <li key={contact.id} style={{ padding:'5px 5px 5px 5px' }}>
                                <div className="contact" style={{ background:'#0099ff', padding:'10px', color:'white' }}>
                                    <div>{ contact.id }</div>
                                    <div>{ contact.name }</div>
                                    <div>{ contact.email }</div>
                                    <div>{ contact.phone }</div>
                                </div>
                            </li>
                        )
                    }
                </ul>
                <button onClick={this.loadMore}>Load More</button>
            </div>
        )
    }
}