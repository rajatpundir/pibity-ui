import React from 'react';
import styled from 'styled-components';

class NotFound extends React.PureComponent {
	render() {
		return (
			<Container>
				<h1>[404] Not Found</h1>
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
