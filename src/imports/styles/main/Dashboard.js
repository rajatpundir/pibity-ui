import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageLabelContainer = styled.div`
	width: 100%;
	left: 0;
	background: white;
`;

export const PageTitle = styled.div`
	font-weight: bold;
	font-size: 26px;
	line-height: 40px;
	letter-spacing: -0.4px;
	color: #3b3b3b;
	background-color: #ffffff;
	padding-left: 20px;
	padding-top: 20px;
	padding-right: 20px;
`;

export const PageSubTitleContainer = styled.div`
	height: 48px;
	width: 100%;
	float: left;
	background: #fff;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-webkit-justify-content: space-between;
	-ms-flex-pack: justify;
	justify-content: space-between;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
	padding: 0 20px;
	border-bottom: 1px solid #e0e1e7;
	-webkit-box-ordinal-group: 1;
	-webkit-order: 0;
	-ms-flex-order: 0;
	order: 0;
	-webkit-box-flex: 0;
	-webkit-flex-grow: 0;
	-ms-flex-positive: 0;
	flex-grow: 0;
	-webkit-flex-shrink: 0;
	-ms-flex-negative: 0;
	flex-shrink: 0;
	-webkit-align-self: flex-start;
	-ms-flex-item-align: start;
	align-self: flex-start;
`;
export const PageSubTitleAnchor = styled.a`
	text-decoration: none;
	font-size: 14px;
	padding: 5px;
	display: inline;
	border-bottom: 3px solid #05cbbf;
	color: #3b3b3b;
	padding-bottom: 8px;
	font-weight: 400;
`;

export const Block = styled.div`
	display: block;
	width: 100%;
	margin-left: 10px;
	margin-right: 10px;
	margin-bottom: 20px;
	padding: 11px 20px;
	border-radius: 6px;
	background-color: #fff;
`;

export const HeadingBlock = styled.div`
	border-bottom: 0;
	padding: 0;
	margin-bottom: 0;
	color: #666;
	cursor: move;
	min-height: 41px;
	display: flex;
`;

export const Tool = styled.div`
	margin-right: 0px;
	margin-top: auto;
	margin-bottom: auto;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
`;

export const Heading = styled.div`
	margin-left: 0px;
	margin-right: 0px;
	width: 100%;
	margin-top: auto;
	margin-bottom: auto;
	font-weight: 600;
	font-size: 18px;
	line-height: 23px;
	color: #3b3b3b;
`;

export const ItemContainer = styled.div`
	padding: 10px 0 10px 0;
	letter-spacing: -0.2px;
`;

export const ItemBlock = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: space-between;
`;

export const Item = styled(Link)`
    text-decoration:none;
	font-weight: normal;
	font-size: 12px;
	line-height: 16px;
	width: 18.7%;
	flex-direction: column;
	background: #f1f6fb;
	height: auto;
	border-radius: 6px;
	margin-left: 4px;
	margin-right: 4px;
	border-width: 1px;
	border-style: solid;
	border-color: transparent;
	font-family: inherit;
	text-align: center;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	align-items: center;
	color: #3b3b3b;
	white-space: nowrap;
	padding: 0 16px;
	cursor: pointer;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
	opacity 0.15s ease-in-out;
`;

export const ItemHeading = styled.div`
	padding-top: 10px;
	text-decoration: none;
`;

export const ItemData = styled.div`
	font-weight: 600;
	font-size: 16px;
	line-height: 20px;
	color: #3e525d;
	padding-top: 3px;
	padding-bottom: 10px;
`;

export const EmptyRowImageContainer = styled.div.attrs((props)=>({
	height:props.height||'345px'
}))`
	text-align: center;
	vertical-align: middle;
	padding: 20px;
	height: ${(props)=>props.height};
`;

export const EmptyRowImage = styled.img`
	width: 450px;
	margin-top: 5px;
`;

export const EmptyRowTag = styled.div`
	color: #5f696f;
	font-size: 12pt;
`;
