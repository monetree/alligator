import React from 'react';

const Contact = (props) => (
    <div className="contact" style={{ background:'#0099ff', padding:'10px', color:'white' }}>
        <div>{ props.id }</div>
        <div>{ props.name }</div>
        <div>{ props.email }</div>
        <div>{ props.phone }</div>
    </div>
)


export default Contact