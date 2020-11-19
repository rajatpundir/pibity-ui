import React from 'react';
import styled from 'styled-components';
import {

    InputRowWrapper,
    Input,
    InputLabel,
    PageBlock,
    FormControl,

} from '../../../../styles/inventory/Style';

class CreditNoteTotal extends React.Component {
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
                <InputRowWrapper>
                <br></br>
                    <FormControl>
                        <Input
                            name="term"
                            type="Text"
                            placeholder="To set and reuse terms, edit your Branding Theme in Invoice Settings."
                            // value={this.state.variable.get('values').get('comment')}
                            // onChange={this.onChange}
                        />
                        <InputLabel>Terms</InputLabel>
                    </FormControl>
                </InputRowWrapper>
               
            </PageBlock>
        )
    }


}
export default CreditNoteTotal;

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