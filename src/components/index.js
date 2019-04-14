import React from 'react';
import fetch from 'isomorphic-fetch';
import Contact from './contacts'

export default class ContactList extends React.Component {
    state = {
        contacts : [],
        per:10,
        page:1,
        totalPages:null,
        scrolling:false,
        isLoading:0
    }

    componentWillMount(){
        this.loadContacts()
        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        })
    }

    handleScroll = (e) => {
        const { scrolling, totalPages, page } = this.state
        if (scrolling) return 
        if (totalPages <= page) return 
        const lastLi = document.querySelector('ul.contacts > li:last-child')
        const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
        const pageOffset = window.pageYOffset + window.innerHeight
        let bottomOffset = 20
        if( pageOffset > lastLiOffset - bottomOffset) {
            this.loadMore()
        }
    }

    loadContacts = () => {
        const {per, page, contacts} = this.state;
        this.setState({
            isLoading:1
        })
        const url = `https://student-example-api.herokuapp.com/v1/contacts.json?per=${per}&page=${page}`
        fetch(url)
        .then(response => response.json())
        .then(
            json => {
                this.setState({
                    contacts:[...contacts, ...json.contacts],
                    scrolling :false,
                    totalPages:json.total_pages,
                })
            },
            this.setState({
                isLoading:0
            })
        )
    }

    loadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
            scrolling:true
        }), this.loadContacts)
    }

    render(){
        return (
            <div>
                <ul className="contacts" style={{ width:'300px' }}>
                    {
                        this.state.contacts.map(contact => 
                            <li key={contact.id} style={{ padding:'5px 5px 5px 5px' }}>
                                <Contact { ...contact } />
                            </li>
                        )
                    }
                </ul>
                {
                    this.state.isLoading === 1 ? (
                        <div>Loading...</div>
                    ) : (
                        <div></div>
                    )
                    
                }
            </div>
        )
    }
}