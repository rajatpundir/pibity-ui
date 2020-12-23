import React from 'react';
import styled from 'styled-components';
import Select from 'react-select'
class SalesDetails extends React.Component {
    render() {
        console.log(this.state)
        return (
        <PageBlock>
        <PageToolbar>
            <ToolbarLeftItems>
           
                <LeftItemH1>New Customer</LeftItemH1>
            </ToolbarLeftItems>
        </PageToolbar>
        
        <InputBody>
                    <InputFieldContainer>
                <InputColumnWrapper>
                
                <H3> Customer Details </H3>
              
                    <FormControl>
                    <SelectWrapper>
                        <Select placeholder="type to search"
						/>
                        </SelectWrapper>{' '}
                        <InputLabel>Customer<Required>*</Required></InputLabel>
                    </FormControl>
                    <FormControl>
                    <SelectWrapper>
                        <Select placeholder="contact"
						/>
                        </SelectWrapper>
                        {' '}
                        <InputLabel>Contact</InputLabel>
                                </FormControl>

                    <FormControl>
                    <Input name="phone"
                            type="text"
                            placeholder="write"
                              />
                      <InputLabel>
                            Phone
                        </InputLabel>
                    </FormControl>

                    <FormControl>
                    <Input name="email"
                            type="text"
                            placeholder="write"
                              />
                      <InputLabel>
                            Email
                        </InputLabel>
                    </FormControl>
                    <FormControl>
                    <Input name="refrence"
                            type="text"
                            placeholder="Refernece"
                              />
                      <InputLabel>
                      Refernece
                        </InputLabel>
                    </FormControl>

                    <FormControl>
                    <Input name="billing"
                            type="text"
                            placeholder="address"
                              />
                    <InputLabel >
                     Billing address line 1
                        <Required>*</Required>
                     </InputLabel>                             
                    </FormControl>

                    <FormControl>
                    <Input name="billing1"
                            type="text"
                            placeholder="City state country ZIP"
                              />
                    <InputLabel >
                     Billing address line 2
                         </InputLabel>                             
                    </FormControl>

                     <FormControl>
                    <Input name="price"
                            type="text"
                            placeholder="Teir 1"
                              />
                    <InputLabel >
                     Price Teir
                        <Required>*</Required>
                     </InputLabel>                             
                    </FormControl>
                </InputColumnWrapper>   {/* //first cplumn finish as we can say 1 div is finish */}

                <InputColumnWrapper>
                <H3> Accounting Details </H3>
                    <FormControl>
                        <SelectWrapper>
                            <Select  placeholder="15 days"/>
                        </SelectWrapper>
                        <InputLabel>
                        Terms
                    </InputLabel>
                    </FormControl>

                     <FormControl>
                        <SelectWrapper>
                            <Select  placeholder="AM Sid"/>
                        </SelectWrapper>
                        <InputLabel>
                        Sales Rep<Required>*</Required>
                    </InputLabel>
                    </FormControl>

                    <FormControl>
                        <SelectWrapper>
                            <Select  placeholder="4000:Sales"/>
                        </SelectWrapper>
                        <InputLabel>
                        Accounts<Required>*</Required>
                    </InputLabel>
                    </FormControl>

                    <FormControl>
                        <SelectWrapper>
                            <Select  placeholder="choose..."/>
                        </SelectWrapper>
                        <InputLabel>
                        Tax Rules<Required>*</Required>
                    </InputLabel>
                    </FormControl>

                    <FormControl style={{ alignItems: 'center' }}>
                                <CheckBoxWapper>
                                    <CheckBoxTable>
                                        <TBody>
                                            <TR>
                                                <TD>
                                                    <CheckBoxInput
                                                        type="checkbox"
                                                        tabindex="55"
                                                    />
                                                </TD>
                                            </TR>
                                        </TBody>
                                    </CheckBoxTable>
                                </CheckBoxWapper>
                                <CheckBoxLabel>Tax Inclusive</CheckBoxLabel>
                            </FormControl>

                             <FormControl style={{ alignItems: 'center' }}>
                                <CheckBoxWapper>
                                    <CheckBoxTable>
                                        <TBody>
                                            <TR>
                                                <TD>
                                                    <CheckBoxInput
                                                        type="checkbox"
                                                        tabindex="55"
                                                    />
                                                </TD>
                                            </TR>
                                        </TBody>
                                    </CheckBoxTable>
                                </CheckBoxWapper>
                                <CheckBoxLabel>Skip Quote</CheckBoxLabel>
                            </FormControl>

                             <FormControl style={{ alignItems: 'center' }}>
                                <CheckBoxWapper>
                                    <CheckBoxTable>
                                        <TBody>
                                            <TR>
                                                <TD>
                                                    <CheckBoxInput
                                                        type="checkbox"
                                                        tabindex="55"
                                                                                                        />
                                                </TD>
                                            </TR>
                                        </TBody>
                                    </CheckBoxTable>
                                </CheckBoxWapper>
                                <CheckBoxLabel>Recurring Task</CheckBoxLabel>
                            </FormControl>
                </InputColumnWrapper>
                {/* this is third division horizontaly */}


                <InputColumnWrapper>
                <H3> Shipping Details </H3>

                 <FormControl>
                    <SelectWrapper>
                        <Select placeholder="choose..."
						/>
                        </SelectWrapper>{' '}
                        <InputLabel>Location<Required>*</Required></InputLabel>
                    </FormControl>

                     <FormControl>
                    <SelectWrapper>
                        <Select placeholder="23/09/2020"
						/>
                        </SelectWrapper>{' '}
                        <InputLabel>Date<Required>*</Required></InputLabel>
                    </FormControl>

                    <FormControl>
                    <Input name="ship"
                            type="text"
                            placeholder=""
                              />
                         <InputLabel>Ship to company</InputLabel>
                    </FormControl>

                    <FormControl>
                    <Input name="ship"
                            type="text"
                            placeholder=""
                              />
                         <InputLabel>Ship to contact</InputLabel>
                    </FormControl>

                     <FormControl style={{ alignItems: 'center' }}>
                                <CheckBoxWapper>
                                    <CheckBoxTable>
                                        <TBody>
                                            <TR>
                                                <TD>
                                                    <CheckBoxInput
                                                        type="checkbox"
                                                        tabindex="55"
                                                                                                        />
                                                </TD>
                                            </TR>
                                        </TBody>
                                    </CheckBoxTable>
                                </CheckBoxWapper>
                                <CheckBoxLabel>Ship to different company</CheckBoxLabel>
                            </FormControl>

                    <FormControl>
                    <SelectWrapper>
                        <Select placeholder="choose..."
						/>
                        </SelectWrapper>{' '}
                        <InputLabel>Shipping address line 1<Required>*</Required></InputLabel>
                    </FormControl>

                     <FormControl>
                    <SelectWrapper>
                        <Select placeholder="choose..."
						/>
                        </SelectWrapper>{' '}
                        <InputLabel>Shipping address line 2</InputLabel>
                    </FormControl>

                    <FormControl>
                    <Input name="shipnotes"
                            type="text"
                            placeholder="Shipping notes..."
                              />
                         <InputLabel>Shipping Notes</InputLabel>
                    </FormControl>

                    <FormControl>
                    <Input name="ship"
                            type="text"
                            placeholder="Choose..."
                              />
                         <InputLabel>Required by</InputLabel>
                    </FormControl>

                    <FormControl>
                    <Input name="ship"
                            type="text"
                            placeholder=""
                              />
                         <InputLabel>Carrier/Service</InputLabel>
                    </FormControl>             
                </InputColumnWrapper>
                {/* finish 3rd diviision horizontally */}

                <InputRowWrapper>
                    <FormControl>
                        <Input
                            name="comments"
                            type="text"
                            placeholder="comments"
                            
                        />
                        <InputLabel>Comment</InputLabel>
                    </FormControl>
                </InputRowWrapper>
            </InputFieldContainer>
        </InputBody>
    </PageBlock>
     ) ;
    }
}

  export default SalesDetails       // need to export this page so it cud be used by others as cpmnonet 

  
//   this is our defined css 
  const InputFieldContainer = styled.div`  
  display: flex;
  display: -ms-flexbox;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;
const LeftItemH1 = styled.h1`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
  padding-right: 20px;
  display: flex;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  font-family: 'IBM Plex Sans', sans-serif;
  vertical-align: baseline;
`;
const InputRowWrapper = styled.div.attrs((props) => ({
  flexBasis: props.flexBasis || '100%'
}))`
flex-basis: ${(props) => props.flexBasis};`;

const InputBody = styled.div.attrs((props) => ({
  alignitem: props.alignItem || 'start',
  borderTop: props.borderTop || '1px solid #e0e1e7'
}))`
align-items: ${(props) => props.alignItem};
  max-height: 4000px;
  animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
  -webkit-animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
  transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
      padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
  -webkit-transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
      padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
  border-top:  ${(props) => props.borderTop};
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 20px 0 20px;
  padding-bottom: 20px !important;
`;
const Required = styled.span`
  display: inline-block;
  padding: 0 !important;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  font-family: 'IBM Plex Sans', sans-serif;
  vertical-align: baseline;
  white-space: nowrap;
  color: #3b3b3b;
  user-select: none;
  pointer-events: none;
`;
const InputColumnWrapper = styled.div`
  flex-basis: calc(100% / 3 - 12px) !important;
  width: 30%;
  @media (max-width: 991px) {
      flex-basis: 100% !important;
      justify-content: space-between;
      display: flex;
      flex-flow: wrap;
  }
`;

const FormControl = styled.div`
  padding-bottom: 20px;
  min-height: 60px;
  position: relative;
  display: flex;
  align-items: start;
  @media (max-width: 991px) {
      flex-basis: calc(100% / 2 - 9px) !important;
  }
}
`;
const ToolbarLeftItems = styled.div`
  display: flex;
  justify-content: flex-start !important;
  align-items: center;
  float: left;
`;

const SelectWrapper = styled.div`
font-size: 13px;
  outline: none !important;
  border-width: 1px;
  border-radius: 4px;
  border-color: #b9bdce;
  color: #3b3b3b;
  font-size: 13px;
  font-weight: 400;
  font-family: inherit;
  min-width: 100px;
  flex: 1;
  min-height: 40px;
  background-color: #fff;
  -webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-family: "IBM Plex Sans", sans-serif !important;
  line-height: normal;
  font-size: 100%;
  margin: 0;
  outline: none;
  vertical-align: baseline;

`
const Input = styled.input`
  font-size: 13px;
  outline: none !important;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  border-color: #b9bdce;
  padding: 11px 10px 10px 10px;
  color: #3b3b3b;
  font-size: 13px;
  font-weight: 400;
  font-family: inherit;
  min-width: 100px;
  flex: 1;
  min-height: 40px;
  background-color: #fff;
  -webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-family: "IBM Plex Sans", sans-serif !important;
  line-height: normal;
  font-size: 100%;
  margin: 0;
  outline: none;
  vertical-align: baseline;
`;
const InputLabel = styled.label`
  font-size: 13px;
  line-height: 13px;
  color: #3b3b3b;
  background: transparent;
  position: absolute;
  top: -6px;
  left: 7px;
  padding: 0 3px;
  background-color: #fff;
  white-space: nowrap;
  &:after {
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
  }

  &:before {
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
  }
`;

const PageBlock = styled.div`
  display: block;
  background: #fff;
  width: 100%;
  float: left;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 0;
  font-size: 100%;
  font: inherit;
  font-family: 'IBM Plex Sans', sans-serif;
  vertical-align: baseline;
  align-items: center;
`;

const PageToolbar = styled.div`
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
`;
const CheckBoxWapper = styled.div`
  float: left;
  width: 16px;
`;
const CheckBoxTable = styled.table`
  width: 35% !important;
  table-layout: auto !important;
  border-collapse: inherit !important;
  border-spacing: 0;
`;

const TBody = styled.tbody``;
const TR = styled.tr``;
const TD = styled.td`
  width: 100% !important;
  height: 16px;
  line-height: 1px;
  position: relative;
  font-weight: normal;
  overflow: hidden;
  cursor: pointer;
  vertical-align: top;
  // &:before {
  // 	border-width: 1px;
  // 	border-style: solid;
  // 	border-radius: 4px;
  // 	border-color: #b9bdce;
  // 	content: '';
  // 	width: 16px;
  // 	height: 16px;
  // 	position: absolute;
  // 	left: 0;
  // 	top: 0;
  // 	text-align: center;
  // 	font-size: 21px;
  // 	display: flex;
  // 	background-color: transparent;
  // 	justify-content: center;
  // 	-webkit-transition: all 0.15s ease-in-out;
  // 	pointer-events: none;
  // }
  // &:after {
  // 	content: '\e81a';
  // 	line-height: 18px;
  // 	font-style: normal;
  // 	color: transparent;
  // 	font-family: 'icons_2019';
  // 	width: 16px;
  // 	height: 16px;
  // 	position: absolute;
  // 	left: 0;
  // 	top: 0;
  // 	text-align: center;
  // 	font-size: 21px;
  // 	display: flex;
  // 	background-color: transparent;
  // 	justify-content: center;
  // 	transition: all 0.15s ease-in-out;
  // 	pointer-events: none;
  // }
`;
const CheckBoxInput = styled.input`
  width: 16px;
  height: 16px;
  padding: 0;
  -webkit-appearance: button;
  cursor: pointer;
  font-size: 100%;
  outline: none;
  vertical-align: baseline;
  line-height: normal;
  color: -internal-light-dark-color(buttontext, rgb(170, 170, 170));
  background-color: -internal-light-dark-color(rgb(239, 239, 239), rgb(74, 74, 74));
  border-width: 2px;
  border-style: outset;
  border-color: -internal-light-dark-color(rgb(118, 118, 118), rgb(195, 195, 195));
  border-image: initial;
  user-select: none;
  white-space: pre;
  align-items: flex-start;
  text-align: center;
`;

const CheckBoxLabel = styled.label`
  position: static;
  padding: 0 0 0 10px;
  pointer-events: all !important;
  cursor: pointer;
  top: -6px;
  left: 7px;
  background-color: #fff;
  white-space: nowrap;
  font-size: 13px;
  line-height: 13px;
  color: #3b3b3b;
  background: transparent;
  z-index: 20;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
`;

const SaveButton = styled.button`
border-radius: 0%;
width: 40px;
height: 40px;
background-color: grey;
border: 0;
color: #fff;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
transition: background-color 0.15s ease-in-out;
outline: none; 

`;
const H3 = styled.h3`
	padding-bottom: 15px;
	color: #3b3b3b;
	font-weight: bold;
	font-size: 15px;
	display: block;
	width: 100%;
`;



