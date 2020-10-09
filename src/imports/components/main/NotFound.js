import React from 'react';
import {
	Container,
	OuterBox,
	InnerBox,
	ErrorCodeContainer,
	H1Container,
	H1,
	H2,
	P,
	Link
} from '../../styles/main/NotFound';

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
