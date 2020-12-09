import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Footer = styled.footer`
	position: relative;
	bottom: 0;
	width: 100%;
	height: fit-content;
	/* z-index: 1; */
	background-color: #3b3b3b;
	display: block;
	margin: 0;
	padding: 0;
	border: 0;
`;

export const FooterNavContainer = styled.div`
	max-width: 1410px;
	width: 100%;
	padding: 0 40px;
	margin: 0 auto;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
`;

export const FooterNav = styled.nav`
	display: grid;
	grid-template-columns: repeat(5, auto);
	gap: 30px;
	padding: 60px 0;
`;

export const FooterNavColums = styled.div``;

export const FooterColumnHeadingContainer = styled.div``;

export const FooterColumnHeading = styled.h4`
	color: #fff;
	margin-bottom: 32px;
	font-size: 20px;
	font-weight: 700;
	font-family: "Inter", sans-serif;
	line-height: 1.18;
`;

export const FooterListContainer = styled.div``;

export const FooterCoulumnList = styled.ul`list-style: none;`;

export const FooterColumnListItem = styled.li`
	margin: 0;
	padding: 0;
	border: 0;
	margin-bottom: 24px;
`;

export const FooterColumnListItemLink = styled(Link)`
color: white;
    text-decoration: none;
`;

export const FooterBottomOuterContainer = styled.div`
	margin: 0;
	padding: 0;
	border: 0;
	border-top: 1px solid rgba(255, 255, 255, .1);
`;

export const FooterBottomInnerConatiner = styled.div`
	padding: 0 20px;
	max-width: 1410px;
	width: 100%;
	margin: 0 auto;
	box-sizing: border-box;
`;

export const FooterBottom = styled.div`
	padding: 17px 0;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
`;

export const FooterBottomHeadind = styled.h6`
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	color: #fff;
`;

export const FootoerBootomSocialLinksContainer = styled.div`
	display: grid;
	grid-auto-flow: column;
	gap: 32px;
	margin: 0;
	padding: 0;
	border: 0;
	margin-left: 25px;
	vertical-align: baseline;
`;

export const FooterSocialLinks = styled.a`
	width: 32px;
	height: 32px;
	background-color: rgba(196, 196, 196, .2);
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	overflow: hidden;
	border-radius: 50%;
	text-decoration: none;
`;
