import React from 'react';
import styled from 'styled-components';
import {
    PageBlock,
} from '../../../../styles/inventory/Style';

class BillTotalAmount extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <PageBlock>
                <div>
                    <div>
                        <MainDiv for="taxs"  >Type of Taxes
                   <select name="taxs" id="taxs">
                                <option></option>

                            </select>
                            <Span>0.00</Span>
                        </MainDiv>
                    </div>
                    <div>
                        <MainDiv>Tax
                    <Span1>0.00</Span1>
                        </MainDiv>
                    </div>
                    <Hr></Hr>
                    <div>
                        <MainDiv> Total
                     <Span1>0.00</Span1>
                        </MainDiv>
                    </div>
                    <Hr></Hr>
                </div>


            </PageBlock>
        )
    }


}
export default BillTotalAmount;

const MainDiv = styled.div`
margin-top:20px;
margin-left:580px;
color:#0d0909;
`
const Span = styled.span`
margin-left:53px;
`
const Span1 = styled.span`
margin-left:140px;
`
const Hr = styled.hr`
margin-top:20px;
width:259px;
margin-left: 540px;

`