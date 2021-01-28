import React from 'react';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import ReactLoading from 'react-loading';
import * as legoData from './legoLoading.json';
import * as doneData from './doneLoading.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: legoData.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};
const defaultOptions2 = {
	loop: false,
	autoplay: true,
	animationData: doneData.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

export default class Loading extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			done: false,
			loading: true
		};
	}

	// componentDidMount() {
	// 	setTimeout(() => {
	// 		fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.json()).then((json) => {
	// 			this.setState({ loading: true });
	// 			setTimeout(() => {
	// 				this.setState({ done: true });
	// 			}, 1000);
	// 		});
	// 	}, 1200);
	// }

	render() {
		return (
			<div>
				<FadeIn>
					<div>
						<Lottie options={defaultOptions} height={240} width={240} />
					</div>
				</FadeIn>
			</div>
		);
	}
}
