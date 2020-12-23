import React from 'react';
import styled from 'styled-components';
import Select from 'react-select'
class Pick extends React.Component {
    render() {
        return (

            <PageBlock id="pick">
            <PageToolbar>
                <ToolbarLeftItems>
                    <LeftItemH1><h6>Pick</h6></LeftItemH1>
                </ToolbarLeftItems>
            </PageToolbar>

            
            <InputBody borderTop="0">
                <RoundedBlock>

                    <TableFieldContainer>
                        <HeaderBodyContainer>
                            <HeaderBody>
                                <BodyTable>
                                    <TableBody>
                                        {/* FIRST TABLE ROW CREATED WITH ALL HEADERS */}
                                        <TableRow>
                                            <TableHeaders width="5%" left="0px">
                                                <SelectIconContainer>
                                                    <SelectSpan>
                                                        <SelectSpanInner>
                                                        <i className="large material-icons">settings</i>                                                          </SelectSpanInner>
                                                    </SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>

                                            <TableHeaders width="10%" left="5%">
                                                <SelectIconContainer>
                                                    <SelectSpan>Product</SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>

                                            <TableHeaders width="10%" left="14%">
                                                <SelectIconContainer>
                                                    <SelectSpan textAlign="right"></SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>

                                            <TableHeaders width="11%" left="26%">
                                                <SelectIconContainer>
                                                    <SelectSpan>BATCH/SERIAL NO </SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>
                                            <TableHeaders width="12%" left="36%">
                                                <SelectIconContainer>
                                                    <SelectSpan>EXPIRY DATE </SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>
                                            <TableHeaders width="8%" left="46%">
                                                <SelectIconContainer>
                                                    <SelectSpan>UNIT </SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>
                                            <TableHeaders width="10%" left="54%">
                                                <SelectIconContainer>
                                                    <SelectSpan></SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>
                                            <TableHeaders width="10%" left="65%">
                                                <SelectIconContainer>
                                                    <SelectSpan>QUANTITY</SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>
                                            <TableHeaders width="11%" left="77%">
                                                <SelectIconContainer>
                                                    <SelectSpan>LOCATION </SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>
                                            <TableHeaders width="10%" left="88%">
                                                <SelectIconContainer>
                                                    <SelectSpan></SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>
                                        </TableRow>

                                        {/* SECOND TABLE ROW DATA CREATED */}
                                        <TableRow>
                                            <TableHeaders width="5%" left="0px">
                                                <SelectIconContainer>
                                                    <SelectSpan>
                                                        <SelectSpanInner>
                                                                                                                        </SelectSpanInner>
                                                    </SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>

                                            <TableHeaders width="10%" left="5%">
                                                <SelectIconContainer>
                                                    <SelectSpan> </SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>

                                            <TableHeaders width="10%" left="14%">
                                                <SelectIconContainer>
                                                    <SelectSpan textAlign="right"></SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>

                                            <TableHeaders width="11%" left="26%">
                                                <SelectIconContainer>
                                                    <SelectSpan> </SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>
                                            <TableHeaders width="12%" left="36%">
                                                <SelectIconContainer>
                                                    <SelectSpan> </SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>
                                            <TableHeaders width="8%" left="46%">
                                                <SelectIconContainer>
                                                    <SelectSpan>Total</SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>
                                            <TableHeaders width="10%" left="54%">
                                                <SelectIconContainer>
                                                    <SelectSpan> </SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>
                                            <TableHeaders width="10%" left="65%">
                                                <SelectIconContainer>
                                                    <SelectSpan> </SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>
                                            <TableHeaders width="11%" left="77%">
                                                <SelectIconContainer>
                                                    <SelectSpan>0 </SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>
                                            <TableHeaders width="10%" left="88%">
                                                <SelectIconContainer>
                                                    <SelectSpan> </SelectSpan>
                                                </SelectIconContainer>
                                            </TableHeaders>
                                        </TableRow>
                                        
                                     
                                    </TableBody>
                                           </BodyTable>
                            </HeaderBody>
                             <EmptyRow>	
                             You do not have any pickings.</EmptyRow>
                        </HeaderBodyContainer>
                                                
                    </TableFieldContainer>
                </RoundedBlock>

    
    
     

            </InputBody>

            {/* 3rd division starts for input lable  */}


           
           
        </PageBlock>
        ) ;
    }
}

export default Pick

const AddMoreBlock = styled.div`
	flex-flow: row wrap;
	display: flex;
	width: 100%;
	padding: 16px 20px;
	align-items: center;
	justify-content: inherit !important;
`;
const AddMoreButton = styled.button`
	background-color: transparent;
	color: #05cbbf;
	border-color: transparent;
	min-width: 70px;
	padding: 0 10px;
	height: 32px !important;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-align: center;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	background: transparent;
	height: 40px;
	white-space: nowrap;
	border-radius: 4px;
	padding: 0 16px;
	cursor: pointer;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	&:hover {
		outline: none;
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
	border-bottom: 1px solid #e0e1e7;
`;

const ToolbarLeftItems = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;

const LeftItemH1 = styled.h1`
	font-size: 16px;
	//text-transform: uppercase;
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

const InputBody = styled.div.attrs((props) => ({
	alignitem: props.alignItem || 'start',
	borderTop: props.borderTop || '1px solid #e0e1e7'
}))`
align-items: ${(props) => props.alignItem};
	max-height: 4000px;
	overflow: hidden;
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

const Input = styled.input`
	width: inherit;
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
const PageBar = styled.div`
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px 20px 0 20px;
	border-top: 1px solid #e0e1e7;
`;
const PageBarAlignLeft = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;

const RoundedBlock = styled.div.attrs((props) => ({
	marginTop: props.marginTop || '0'
}))`
	border: 1px solid #b9bdce;
	border-radius: 4px;
	width: 100%;
	float: left;
	overflow: hidden;
	margin-top:${(props) => props.marginTop};
`;

// float: left;
const TableFieldContainer = styled.div`
	position: relative;
	width: 100% !important;
	overflow: hidden;

	min-height: auto !important;
	text-align: center;
	top: 0 !important;
	height: inherit !important;
`;

const SelectIconContainer = styled.div`
	justify-content: center;
	padding: 0 10px !important;

	font-weight: bold;
	font-size: 11px;
	text-transform: uppercase;
	height: 100% !important;
	display: flex;
	align-self: stretch;
	width: 100%;
`;
const SelectSpan = styled.span.attrs((props) => ({
	textAlign: props.textAlign || 'left'
}))`
	display: flex;
	align-items: center;
	overflow: hidden;
	text-align: ${(props) => props.textAlign};
	cursor: pointer;
`;
const SelectSpanInner = styled.span`white-space: nowrap;`;

const HeaderBodyContainer = styled.div`
	width: 100%;
	height: inherit !important;
	float: left;
	position: relative;
	top: 0 !important;
	left: 0 !important;
	overflow: hidden;
`;
const HeaderBody = styled.div`
	border-width: 0px;
	overflow: auto;
	margin: 0px;
	width: 100%;
`;
const BodyTable = styled.table`
	width: 100%;
	height: 1px;
	table-layout: fixed;
	border-collapse: separate;
	border-spacing: 0;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr`
	cursor: pointer;
	&:hover {
		background-color: #f0f3fa;
	}
`;

const TableHeaders = styled.th.attrs((props) => ({
	width: props.width,
	left: props.left || '0'
}))`
width: ${(props) => props.width};
left:${(props) => props.left};
	font-family: inherit;
	vertical-align: middle;
	border-bottom: 1px solid #e7e8ec;
	overflow: hidden;
	padding: 5px 0;
	height: 60px;
	float: none !important;
`;

const TableData = styled.td`
	font-family: inherit;
	vertical-align: middle;
	border-bottom: 1px solid #e7e8ec;
	overflow: hidden;
	padding: 5px 0;
	height: 60px;
    float: none !important;
   
    
`;

const TableHeaderInner = styled.div`
    width:100%;
    padding: 0 3px;
    color: #41454e;
    vertical-align: middle;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
`;
const EmptyRow = styled.div`
	text-align: center;
	border-bottom: 1px solid #e7e8ec;
	min-height: 59px !important;
	line-height: 55px;
`;

const PlusButton = styled.button`
	margin-left: 5px;
	color: #04beb3;
	background-color: #05cbbf;
	border-color: #05cbbf;
	width: 32px !important;
	min-width: 32px !important;
	max-width: 32px !important;
	justify-content: center;
	padding: 0 !important;
	height: 32px !important;
	text-align: center;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	flex-direction: row;
	align-items: center;
	background: transparent;
	white-space: nowrap;
	border-radius: 4px;
`;

const EqualBlockContainer = styled.div`
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px;
`;
const LeftBlock = styled.div`
	margin-right: 10px;
	flex: 1;
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;
const TextAreaContainer = styled.div`
	width: 100%;
	height: 100% !important;
	position: relative;
	display: flex;
	align-items: start;
	color: #3b3b3b;
	text-align: left;
	letter-spacing: -0.2px;
`;
const TextArea = styled.textarea`
    padding: 10px;
    width: 100%;
    height: 100% !important;
    border: 1px solid #b9bdce;
	border-radius: 4px;
	font-size: 13px;
	outline: none !important
	padding: 11px 10px 10px 10px;
	color: #3b3b3b;
	font-weight: 400;
	min-width: 100px;
    flex: 1;
    min-height: 40px;
    background-color: #fff;

`;
const RightBlock = styled.div`
	margin-left: 10px;
	flex: 1;
	display: flex;
	justify-content: flex-end !important;
	float: right;
`;
const RightBlockTable = styled.table`
	display: table;
	border: 1px solid #b9bdce;
	border-radius: 4px;
	border-collapse: inherit !important;
	font-size: 12px;
	text-align: right;
	text-transform: uppercase;
	float: right;
	width: 100%;
	border-spacing: 0;
	color: #3b3b3b;
`;

const BlockTableHead = styled.thead`
	box-sizing: border-box;
	display: table-header-group;
	text-align: right;
	text-transform: uppercase;
	border-collapse: inherit !important;
	color: #3b3b3b;
	letter-spacing: -0.2px;
`;

const BlockTableBody = styled.tbody`
	border-collapse: inherit !important;
	text-align: right;
	text-transform: uppercase;
	border-spacing: 0;
	color: #3b3b3b;
`;

const BlockTableHeader = styled.th.attrs((props) => ({
	width: props.width,
	height: props.height || '0'
}))`
width: ${(props) => props.width};
padding: 10px;
    font-weight: bold;
    color: #707887;
    border-bottom: 1px solid #b9bdce;
`;
const BlockTableTd = styled.td`
	padding: 3px 10px 3px 0;
	color: #41454e;
	font-weight: normal;
	border-collapse: inherit !important;
	text-align: right;
	text-transform: uppercase;
`;

const BlockInnerTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
`;

const RoundBlockOuterDiv = styled.div`
	font-size: 12px;
	font-weight: bold;
	padding: 12px;
	float: right;
	box-sizing: border-box;
	display: block;
`;
const RoundBlockInnerDiv = styled.div`
	display: inline-block;
	padding-left: 20px;
	box-sizing: border-box;
`;
const Span = styled.span.attrs((props) => ({
	color: props.color,
	marginLeft: props.marginLeft || '0'
}))`
color: ${(props) => props.color};
margin-left: ${(props) => props.marginLeft};
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
const BigButton = styled.button`
	margin-left: 5px;
	color: #04beb3;
	background-color: #05cbbf;
	border-color: #05cbbf;
	width: 32px !important;
	min-width: 32px !important;
	max-width: 32px !important;
	justify-content: center;
	padding: 0px 60px;
	height: 32px !important;
	text-align: center;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 600;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	flex-direction: row;
	align-items: center;
	background: transparent;
	white-space: nowrap;
	border-radius: 4px;
`;
const H3 = styled.h3`
	padding-bottom: 15px;
	color: #3b3b3b;
	font-weight: bold;
	font-size: 15px;
	display: block;
	width: 100%;
`;