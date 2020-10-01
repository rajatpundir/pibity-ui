import React from 'react';
import styled from 'styled-components';

class NotFound extends React.PureComponent {
	render() {
		return (
			<Container>
				<OuterBox>
					<InnerBox class="notfound">
						<ErrorCodeContainer>
							<H1Container />
							<H1>404</H1>
						</ErrorCodeContainer>

						<H2>Page not found</H2>
						<P>
							The page you are looking for might have been removed had its name changed or is temporarily
							unavailable.
						</P>
						<Link href="/">home page</Link>
					</InnerBox>
				</OuterBox>
			</Container>
		);
	}
}

export default NotFound;

// Styled Components

const Container = styled.div`
	width: 100%;
	position: center;
	margin-top: 150px;
	margin-bottom: 50px;
	text-align: center;
	color: #343434;
`;

const OuterBox = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	max-width: 460px;
	width: 100%;
	text-align: center;
	line-height: 1.4;
`;
const InnerBox = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	max-width: 460px;
	width: 100%;
	text-align: center;
	line-height: 1.4;
`;
const ErrorCodeContainer = styled.div`
	position: relative;
	width: 180px;
	height: 180px;
	margin: 0px auto 50px;
`;

const H1Container = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: #ffa200;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
	border: 5px dashed #000;
	border-radius: 5px;
`;

const H1 = styled.h1`
	font-family: 'Cabin', sans-serif;
	color: #000;
	font-weight: 700;
	margin: 0;
	font-size: 90px;
	position: absolute;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	left: 50%;
	text-align: center;
	height: 40px;
	line-height: 40px;
`;
const H2 = styled.div`
	font-family: 'Cabin', sans-serif;
	font-size: 33px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 7px;
`;
const P = styled.p`
	font-family: 'Cabin', sans-serif;
	font-size: 16px;
	color: #000;
	font-weight: 400;
`;
const Link = styled.a`
	margin-top: 20px;
	outline: none;
	text-decoration: none;
	font-family: 'Cabin', sans-serif;
	display: inline-block;
	padding: 10px 25px;
	background-color: #8f8f8f;
	border: none;
	border-radius: 40px;
	color: #fff;
	font-size: 14px;
	font-weight: 700;
	text-transform: uppercase;
	-webkit-transition: 0.2s all;
	transition: 0.2s all;
	&:hover,
	focus {
		color:white;
		background-color: #2c2c2c;
		text-decoration: none;
	}
`;
