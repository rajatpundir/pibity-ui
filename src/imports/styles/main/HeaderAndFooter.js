import styled from 'styled-components';

export const HeaderContainer = styled.div`
    margin-top:70px;
    width: 100%;
    height: 45px;
    padding: 10px 10px;
    background: #fff;
    float: left;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
	position: relative;
	border-bottom: 1px solid #e0e1e7;
}
`;

export const FooterContainer = styled.div`
	float: left;
	width: 100%;
`;

export const FooterInner = styled.div`
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
`;
