import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBBtn,
  MDBInputGroup
} from 'mdb-react-ui-kit';

import MyAutocomplete from './autocomplete';

export default function Navbar(props) {
  function NavbarCallback(item){
    return props.AppCallback(item)
  }
  return (
    <MDBNavbar dark bgColor='dark'>
      <MDBContainer fluid style={{'flex-direction': 'column'}}>
        <MyAutocomplete NavbarCallback={NavbarCallback} />
      </MDBContainer>
    </MDBNavbar>
  );
}

