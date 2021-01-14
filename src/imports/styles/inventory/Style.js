import { red } from '@material-ui/core/colors';
import styled from 'styled-components';

//------------------------------Containers--------------------------//

export const Container = styled.div.attrs((props) => ({
	mediaPadding: props.mediaPadding,
	backgroundColor: props.backgroundColor || '#e3e4e8'
}))`
	padding: 0;
	width: 100%;
	min-width: 860px;
	position: relative;
	// margin-top: 65px;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	font-size: 100%;
	font: inherit;
	font-family: "IBM Plex Sans", sans-serif;
	vertical-align: baseline;
	background-color:${(props) => props.backgroundColor};
	@media (max-width: 1200px) {
		padding: ${(props) => props.mediaPadding};
	}
`;

export const PageWrapper = styled.div.attrs((props) => ({
	mediaMargin: props.mediaMargin || '20px auto',
	mediaWidth: props.mediaWidth || '80%'
}))`
	 flex: 1;
    overflow: hidden;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	@media (min-width: 1201px) {
		margin: ${(props) => props.mediaMargin};
		width: ${(props) => props.mediaWidth};

	}
`;

export const PageBody = styled.div.attrs((props) => ({
	mediaWidth: props.mediaWidth || '90%'
}))`
	margin: 0 auto !important;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: "IBM Plex Sans", sans-serif;
	vertical-align: baseline;
	@media (min-width: 1440px) {
		max-width: ${(props) => props.mediaWidth};
		border: 1px solid #e0e1e7;
	}
`;

export const SaveButtonContaier = styled.div`
	position: fixed;
	bottom: 50px;
	right: 50px;
	bottom: 37px;
	right: 37px;
	z-index: 300;
`;

export const ButtonWithOutline = styled.button`
	background-color: transparent !important;
	color: #05cbbf;
	border-color: #05cbbf;
	margin-left: 5px;
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
	align-self: center;
	white-space: nowrap;
	border-radius: 4px;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
`;

export const PageBlock = styled.div.attrs((props) => ({
	paddingBottom: props.paddingBottom || '20px'
}))`
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
	padding-bottom:${(props) => props.paddingBottom} ;
`;

//    align-items: center;
export const PageToolbar = styled.div.attrs((props) => ({
	padding: props.padding || '16px 20px',
	borderBottom: props.borderBottom,
	borderTop: props.borderTop
}))`
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	height:'50px';
	justify-content: space-between;
	width: 100%;
    padding: ${(props) => props.padding};
    align-items: center;
	border-bottom:${(props) => props.borderBottom};
	border-top:${(props) => props.borderTop};


`;

export const ToolbarItems = styled.div.attrs((props) => ({
	float: props.float || 'left'
}))`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: ${(props) => props.float}
`;

export const InputFieldContainer = styled.div`
	display: flex;
	display: -ms-flexbox;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 100%;
`;

export const InputBody = styled.div.attrs((props) => ({
	alignitem: props.alignItem || 'start',
	borderTop: props.borderTop || '1px solid #e0e1e7',
	overflow: props.overflow || 'hidden',
	padding: props.padding || '20px 20px 0 20px'
}))`
    align-items: ${(props) => props.alignItem};
	overflow: ${(props) => props.overflow};
	border-top:  ${(props) => props.borderTop};
	padding: ${(props) => props.padding};
	max-height: 4000px;
	animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	-webkit-animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	-webkit-transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
`;
export const PageBar = styled.div`
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px 20px 0 20px;
	border-top: 1px solid #e0e1e7;
`;

//pageBar align left replaced
export const PageBarAlign = styled.div.attrs((props) => ({
	padding: props.padding || '0',
	float: props.float || 'left'
}))`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: ${(props) => props.float};
    padding: ${(props) => props.padding};
`;

export const RoundedBlock = styled.div.attrs((props) => ({
	marginTop: props.marginTop || '0',
	overflow: props.overflow || 'hidden',
	border: props.border || '1px solid #b9bdce'
}))`
    border: ${(props) => props.border};
    border-radius: 4px;
	width: 100%;
	float: left;
    overflow: ${(props) => props.overflow};;
	margin-top:${(props) => props.marginTop};
`;

//------------------Table-----------------------//
export const ListTableFieldContainer = styled.div`
	position: relative;
	width: 100% !important;
	overflow: hidden;

	min-height: auto !important;
	text-align: center;
	top: 0 !important;
	height: inherit !important;
`;
export const TableFieldContainer = styled.div.attrs((props) => ({
	overflow: props.overflow || 'hidden',
	float: props.float || 'left'
}))`
	width: 100% !important;
	min-height: auto !important;
	text-align: center;
	position: relative !important;
	top: 0 !important;
	height: inherit !important;
	float: ${(props) => props.float};
    overflow: ${(props) => props.overflow};
`;

export const Headers = styled.div`
	border-width: 0px;
	width: 100%;
	left: 0px;
	top: 0px;
	border-top: 0 !important;
	zoom: 1;
	cursor: default;
	background-color: #fff;
	border-bottom: 1px solid #e7e8ec !important;
	border-top: 1px solid #e7e8ec !important;
	height: 60px;
	overflow: hidden;
`;
export const HeaderContainer = styled.div`
	width: 100%;
	height: 100% !important;
	overflow: hidden;
	zoom: 1;
	position: relative;
	left: 0;
	top: 0;
`;
export const HeaderContainerInner = styled.div`
	position: absolute;
	left: 0px;
	top: 0px;
	height: 100% !important;
	width: 100% !important;
`;
export const HeaderBodyContainer = styled.div`
	width: 100%;
	height: inherit !important;
	float: left;
	position: relative;
	top: 0 !important;
	left: 0 !important;
	overflow: visible;
`;
export const HeaderBody = styled.div`
	border-width: 0px;
	overflow: visible;
	margin: 0px;
	width: 100%;
`;
export const BodyTable = styled.table.attrs((props) => ({
	width: props.width || '100%'
}))`
width:${(props) => props.width};
	height: 1px;
	table-layout: fixed;
	border-collapse: separate;
	border-spacing: 0;
`;
export const TableBody = styled.tbody``;
export const TableRow = styled.tr`
	cursor: pointer;
	&:hover {
		background-color: #f0f3fa;
	}
`;

export const TableHeaders = styled.th.attrs((props) => ({
	width: props.width,
	left: props.left || '0'
}))`
width: ${(props) => props.width};
left:${(props) => props.left};
	font-family: inherit;
	vertical-align: middle;
	border-bottom: 1px solid #e7e8ec;
	padding: 5px 0;
	height: 60px;
	float: none !important;
	&:hover{
		border-right: 1px solid #e0e1e7;
		border-left: 1px solid #e0e1e7;
		background-color:none;

	}
`;

export const TableData = styled.td`
	font-family: inherit;
	vertical-align: middle;
	border-bottom: 1px solid #e7e8ec;
	overflow: visible;
	padding: 5px 0;
	height: 60px;
	float: none !important;
`;

export const TableHeaderInner = styled.div.attrs((props) => ({
	whiteSpace: props.whiteSpace || 'nowrap',
	overflow: props.overflow || 'visible'
}))`
    width:100%;
    padding: 0 3px;
    color: #41454e;
    vertical-align: middle;
    font-size: 13px;
    white-space: ${(props) => props.whiteSpace};
	text-overflow: ellipsis;
	overflow: ${(props) => props.overflow};
`;

export const EmptyRow = styled.div`
	text-align: center;
	border-bottom: 1px solid #e7e8ec;
	min-height: 59px !important;
	line-height: 55px;
`;
// -----------------//
export const RightBlock = styled.div`
	margin-left: 10px;
	flex: 1;
	display: flex;
	justify-content: flex-end !important;
	float: right;
`;

export const RightBlockTable = styled.table`
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

export const BlockTableHead = styled.thead`
	box-sizing: border-box;
	display: table-header-group;
	text-align: right;
	text-transform: uppercase;
	border-collapse: inherit !important;
	color: #3b3b3b;
	letter-spacing: -0.2px;
`;

export const BlockTableBody = styled.tbody`
	border-collapse: inherit !important;
	text-align: right;
	text-transform: uppercase;
	border-spacing: 0;
	color: #3b3b3b;
`;

export const BlockTableHeader = styled.th.attrs((props) => ({
	width: props.width,
	height: props.height || '0'
}))`
width: ${(props) => props.width};
padding: 10px;
    font-weight: bold;
    color: #707887;
    border-bottom: 1px solid #b9bdce;
`;
export const BlockTableTd = styled.td`
	padding: 3px 10px 3px 0;
	color: #41454e;
	font-weight: normal;
	border-collapse: inherit !important;
	text-align: right;
	text-transform: uppercase;
`;

export const BlockInnerTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
`;

export const RoundBlockOuterDiv = styled.div`
	font-size: 12px;
	font-weight: bold;
	padding: 12px;
	float: right;
	box-sizing: border-box;
	display: block;
`;
export const RoundBlockInnerDiv = styled.div`
	display: inline-block;
	padding-left: 20px;
	box-sizing: border-box;
`;
// background color based on status
export const StatusBackgroundColor = {
	approved: '#70dca1',
	rejected: '#e86a6a',
	active: '#54c675',
	depricated: '#e76767',
	pending: '#f5f5b0'
};

export const StatusSpan = styled.span.attrs((props) => ({
	backgroundColor: props.backgroundColor || '#d6f3e3',
	marginRight: props.marginRight || 0,
	color: props.color || '#f1f6fb'
}))`
	background-color:${(props) => props.backgroundColor}; 
	margin-right:${(props) => props.marginRight} ;
	border: 1px solid ${(props) => props.backgroundColor};
	color: ${(props) => props.color};
	padding: 4px 10px 4px 10px;
	border-radius: 3px;
	display: inline-block;
	font-weight: 500;
`;

export const Anchor = styled.a`
	text-decoration: none;
	color: #05cbbf;
`;

export const Span = styled.span.attrs((props) => ({
	color: props.color,
	marginLeft: props.marginLeft || '0'
}))`
color: ${(props) => props.color};
margin-left: ${(props) => props.marginLeft};
`;

// --------------------------Input-------------------------------//

export const InputColumnWrapper = styled.div.attrs((props) => ({
	flexBasis: props.flexBasis || 'calc(100% / 3 - 12px) !important',
	width: props.width || '30%',
	flexFlow: props.flexFlow || 'wrap'
}))`
	flex-basis: ${(props) => props.flexBasis};
    width: ${(props) => props.width};
    @media (max-width: 991px) {
       flex-basis: 100% !important;
       justify-content: space-between;
       display: flex;
       flex-flow: ${(props) => props.flexFlow};
    }
`;

export const InputRowWrapper = styled.div.attrs((props) => ({
	flexBasis: props.flexBasis || '100%',
	paddingTop: props.paddingTop
}))`
justify-content: space-between;
display: flex;
flex-wrap: inherit;
flex-basis: ${(props) => props.flexBasis};
padding-top: ${(props) => props.paddingTop};`;

export const FormControl = styled.div.attrs((props) => ({
	minHeight: props.minHeight || '60px',
	paddingBottom: props.paddingBottom || '20px',
	paddingRight: props.paddingRight,
	flexBasis: props.flexBasis
}))`
	padding-bottom: ${(props) => props.paddingBottom};
	padding-right: ${(props) => props.paddingRight};
	min-height:${(props) => props.minHeight};
	position: relative;
	display: flex;
	align-items: start;
	flex-basis:${(props) => props.flexBasis};
	 width: 100%;

	@media (max-width: 991px) {
		flex-basis: calc(100% / 2 - 9px) !important;
	}
`;

export const Required = styled.span`
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

export const LeftItemFormControl = styled.div`
	position: relative;
	display: flex;
	align-items: start;
`;

export const LeftItemWrapper = styled.div.attrs((props) => ({
	backgroundColor: props.backgroundColor,
	color: props.color || '#f1f6fb',
	margin: props.margin || '0 10px 0 0'
}))`
	background-color: ${(props) => props.backgroundColor};
	border: 1px solid ${(props) => props.backgroundColor};
	color:  ${(props) => props.color};
	padding: 4px 10px 4px 10px;
	border-radius: 3px;
	display: inline-block;
	font-weight: 500;
	margin: ${(props) => props.margin};;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
`;

export const LeftItemH1 = styled.h1`
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

export const RactSelectCustomStyles = {
	control: (styles) => ({
		...styles
	}),
	option: (styles) => ({
		...styles,
		whiteSpace: 'normal',
		overflow: 'hidden'
	}),
	menu: (styles) => ({
		...styles,
		width: 'auto'
	})
};

export const SelectWrapper = styled.div.attrs((props) => ({
	minWidth: props.minWidth || 'inherit'
}))`
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-radius: 4px;
	border-color: #b9bdce;
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
	min-width: ${(props) => props.minWidth};
	flex: 1;
	min-height: 40px;
	background-color: #fff;
	-webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	line-height: normal;
	margin: 0;
	vertical-align: baseline;
	&:focus{
      outline:none;
	}
`;

/*
Button to add new select option,
To create a variable fot a type
*/
export const SelectAddButton = styled.button`
	color: #b9bdce;
	height: 38px;
	margin-left: 5px;
	border-color: #b9bdce;
	width: 40px !important;
	min-width: 40px !important;
	max-width: 40px !important;
	padding: 0 !important;
	text-align: center;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	background: transparent;
	white-space: nowrap;
	border-radius: 4px;
	cursor: pointer;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	&:focus {
		outline: none;
	}
	&:hover {
		color: #04beb3;
		border-color: #00afa5 !important;
	}
`;

export const Input = styled.input.attrs((props) => ({
	width: props.width || 'inherit',
	height: props.height || '38px',
	padding: props.padding || '11px 10px 10px 10px',
	backgroundColor: props.backgroundColor || ' #fff',
	borderColor: props.borderColor || '#b9bdce'
}))`
	width: ${(props) => props.width};
	min-height: ${(props) => props.height};
	padding: ${(props) => props.padding};
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
	flex: 1;
	outline: none !important;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	border-color:${(props) => props.borderColor};
	background-color: ${(props) => props.backgroundColor};
	-webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	line-height: normal;
	font-size: 100%;
	margin: 0;
	vertical-align: baseline;
	/* to remove Arrow from input type field number */
	&::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
       -webkit-appearance: none;
       margin: 0;
    }

     /* Firefox */
    &[type=number] {
    -moz-appearance: textfield;
    }
`;

export const TextAreaInput = styled.textarea.attrs((props) => ({
	height: props.height || '100px',
	width: props.width || 'inherit',
	padding: props.padding || '11px 10px 10px 10px'
}))`
    flex:1;
    overflow: hidden;
    overflow-wrap: break-word;
	resize: vertical;
    outline: none !important;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	border-color: #b9bdce;
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	margin: 0;
	width: ${(props) => props.width};
	min-height: ${(props) => props.height};
	padding: ${(props) => props.padding};
	-webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;

`;

export const InputLabel = styled.label`
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

export const SelectIconContainer = styled.div`
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

//----checkBox Input------//
export const CheckBoxWapper = styled.div`
	float: left;
	width: 16px;
`;
export const CheckBoxTable = styled.table`
	width: 35% !important;
	table-layout: auto !important;
	border-collapse: inherit !important;
	border-spacing: 0;
`;

export const TBody = styled.tbody``;
export const TR = styled.tr``;
export const TD = styled.td`
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

export const CheckBoxInput = styled.input`
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

//  export const CheckBoxLabel = styled.label`padding-left: 5px;`;
export const CheckBoxContainer = styled.div.attrs((props) => ({
	margin: props.margin || '5px 10px'
}))`
	margin: ${(props) => props.margin};
	align-items: center;
	margin-right: 10px !important;
	position: relative;
	display: flex;
`;

export const CheckBoxLabel = styled.label`
	height: 16px;
	width: 100%;
	text-align: initial;
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
	/* z-index: 20; */
	-webkit-touch-callout: none;
	-webkit-user-select: none;
`;

export const SelectSpan = styled.span.attrs((props) => ({
	textAlign: props.textAlign || 'left'
}))`
	display: flex;
	align-items: center;
	overflow: hidden;
	text-align: ${(props) => props.textAlign};
	cursor: pointer;
`;
export const SelectSpanInner = styled.span`white-space: nowrap;`;

export const H3 = styled.h3`
	padding-bottom: 15px;
	color: #3b3b3b;
	font-weight: bold;
	font-size: 15px;
	display: block;
	width: 100%;
`;

export const EqualBlockContainer = styled.div`
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px;
`;

export const LeftBlock = styled.div`
	margin-right: 10px;
	flex: 1;
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;

export const TextAreaContainer = styled.div`
	width: 100%;
	height: 100% !important;
	position: relative;
	display: flex;
	align-items: start;
	color: #3b3b3b;
	text-align: left;
	letter-spacing: -0.2px;
	padding-bottom: 10px;

`;

export const TextArea = styled.textarea.attrs((props)=>({
	resize: props.resize||'none',
	height: props.height||'40px'
}))`
    overflow:scroll;
	padding: 10px;
	width: 100%;
	height: 100% !important;
	border: 1px solid #b9bdce;
	border-radius: 4px;
	font-size: 13px;
	outline: none !important;
	padding: 11px 10px 10px 10px;
	color: #3b3b3b;
	font-weight: 400;
	min-width: 100px;
	flex: 1;
	min-height: ${(props)=>props.height};
	background-color: #fff;
	resize: ${(props)=>props.resize};
`;
export const AddMoreBlock = styled.div`
	flex-flow: row wrap;
	display: flex;
	width: 100%;
	padding: 16px 20px;
	align-items: center;
	justify-content: inherit !important;
`;

//----------------------------------Button-------------------------------//

export const AddMoreButton = styled.button`
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

export const PlusButton = styled.button`
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
export const FontAwsomeIcon = styled.i.attrs((props) => ({
	marginRight: props.marginRight || '5px'
}))`margin-right:${(props) => props.marginRight};`;

export const Custombutton = styled.button.attrs((props) => ({
	height: props.height || '40px',
	minwidth: props.minWidth || '80px',
	fontSize: props.fontSize || '13px',
	fontWeight: props.fontWeight || '500',
	padding: props.padding || '0 16px;',
	color: props.color || '#fff',
	backgroundColor: props.backgroundColor || '#05cbbf',
	borderColor: props.borderColor || '#05cbbf',
	backgroundOnHover: props.backgroundOnHover || '#05cbbf',
	borderOnHover: props.borderOnHover || '#05cbbf',
	margin: props.margin
}))`
	text-align: center;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	white-space: nowrap;
	cursor: pointer;
	font-size: ${(props) => props.fontSize};
	font-weight:${(props) => props.fontWeight};
	min-width:${(props) => props.minWidth};
	height: ${(props) => props.height};
	padding: ${(props) => props.padding};
	margin: ${(props) => props.margin};
	color: ${(props) => props.color};
	margin: ${(props) => props.margin};
	background-color: ${(props) => props.backgroundColor};
	border-color: ${(props) => props.borderColor};
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	&:focus {
		outline: none;
	}
	&:hover{
		background-color:${(props) => props.backgroundOnHover};
	    border-color:${(props) => props.borderOnHover};
	}
`;

export const SaveButton = styled.button`
	border-radius: 50%;
	width: 40px;
	height: 40px;
	background-color: #05cbbf;
	border: 0;
	color: #fff;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.15s ease-in-out;
	outline: none;
`;

//------------------------Horizontal Navigation-------------------------//
export const HorizontalListPageBlock = styled.div`
	width: 100%;
	height: 60px;
	padding: 10px 10px;
	background: #fff;
	float: left;
	border-radius: 6px;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	position: relative;
	margin-bottom: 20px !important;
`;

export const HorizontalBlockListOuter = styled.div`
	width: 100%;
	position: relative;
	display: block;
`;

export const HorizontalBlockListInnerWrapper = styled.div.attrs((props) => ({
	padding: props.padding
}))`
	width: 100%;
	height:100%;
	overflow: hidden;
	position: relative;
	padding: ${(props) => props.padding};

`;

export const HoizontalBlockList = styled.ul.attrs((props) => ({
	height: props.height || '40px'
}))`
	width: 212px;
	height: ${(props) => props.height};
	transform: translate3d(0px, 0px, 0px);
	display: flex;
	flex-direction: row;
	flex: 1;
	position: relative;
	min-width: 100%;
	padding-left: 0;
	list-style: none outside none;
	transition: all 1s;
	transition-property: transform, height;
	justify-content: start;
	float: left;
	overflow-x:auto;	
	scroll-behavior: smooth;
`;

export const HoizontalBlockListItems = styled.li`
	margin-right: 0px;
	display: flex;
	white-space: nowrap;
	height: 40px;
	float: left;
	margin-right: 10px;
	text-align: -webkit-match-parent;
	list-style: none outside none;
	color: #3b3b3b;
	letter-spacing: -0.2px;
`;

export const BlockListItemButton = styled.button`
	height: 40px;
	width: 100%;
	border: 1px solid #e0e1e7;
	min-width: 90px;
	justify-content: center;
	border-radius: 4px;
	font-size: 13px;
	font-weight: 300;
	color: #191313;
	padding: 0 10px;
	display: flex;
	align-items: center;
	cursor: pointer;
	background: transparent;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	-webkit-appearance: button;
	cursor: pointer;
	text-transform: none;
	line-height: normal;
	margin: 0;
	outline: none;
	vertical-align: baseline;
	vertical-align: middle;

	&:hover {
		background-color: #25c99f;
		color: black;
	}

	&:before,
	&:after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
`;
