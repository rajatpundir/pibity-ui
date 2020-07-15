import React from 'react';
import { Button, H6 } from '../../../styles/inventory/categories/CategoryNode';

export default class CategoryNode extends React.PureComponent {
	handleClick = () => {
		this.props.editCategory(this.props.nodeData);
	};

	render() {
		return (
			<Button onClick={this.handleClick.bind(this)}>
				{this.props.nodeData.name}
				{this.props.nodeData.code !== '' ? <H6>Code: {this.props.nodeData.code}</H6> : undefined}
			</Button>
		);
	}
}
