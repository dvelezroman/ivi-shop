import React from 'react';
import { Container } from 'semantic-ui-react'
//import { Link } from "react-router-dom";
const Footer = () =>{
  return(

    <Container className='footer' textAlign='center'>
      <p className="text-center text-muted pt-2">
		<strong>Teche</strong> made with <i className="fa fa-heart" aria-hidden="true"></i> by <i className="fa fa-github-alt" aria-hidden="true"></i> <a href="https://github.com/sushingg">SuShinGG</a>. 
          The source code is licensed <a href="https://github.com/sushingg/TechE-React/blob/master/LICENSE">GPL-3.0</a>.
      </p>
    </Container>

  )
}
export default Footer;
