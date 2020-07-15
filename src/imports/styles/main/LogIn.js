import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 350px;
	max-width: 400 px;
	padding: 40px 40px;
	margin: 40px auto;
	margin-bottom: 15px;
	background-color: #f7f7f7;
	-moz-border-radius: 2px;
	-webkit-border-radius: 2px;
	border-radius: 2px;
	-moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
	-webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
`;

export const Image = styled.img`
	width: 150px;
	margin: 0 auto 10px;
	display: block;
	-moz-border-radius: 50%;
	-webkit-border-radius: 50%;
	border-radius: 50%;
`;

export const Title = styled.h1`
	font-weight: 300;
	margin-bottom: 1.4rem;
	text-align: center !important;
`;

export const Form = styled.form`
	width: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Input = styled.input`
	width: 75%;
	border: 1px solid #dddddd;
	font-size: 1.4rem;
	font-family: Helvetica, Arial, sans-serif;
	margin-bottom: 1.4rem;
	padding: 1rem;
	&:focus {
		outline: 2px solid #66afe9;
	}
`;

export const Button = styled.button`
	background-color: #397ab1;
	border: none;
	color: white;
	cursor: pointer;
	font-size: 1.4rem;
	line-height: 1.2;
	margin-bottom: 1.4rem;
	padding: 1rem;
	text-transform: uppercase;
	&:focus {
		outline: none;
	}
`;

export const Error = styled.p`
	margin-top: 0.25rem;
	font-size: 90%;
	color: #dc3545;
`;
