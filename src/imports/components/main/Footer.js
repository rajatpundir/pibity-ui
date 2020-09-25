import React from 'react'
import styled from 'styled-components'

class Footer extends React.Component{

    render(){
        return(
            <FooterContainer>
                <FooterInner>
                <p > Copyright © 2020 Pibity<sup>®</sup> All Rights Reserved</p>
                </FooterInner>
            </FooterContainer>
        )
    }

}
export default Footer;

const FooterContainer=styled.div`
float: left;
    width: 100%;
`
const FooterInner=styled.div`
   text-align: center;
   border-top: 1px solid #e0e1e7;
    height: 64px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    background: #fff;
`
