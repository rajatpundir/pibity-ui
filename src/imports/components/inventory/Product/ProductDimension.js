import React from 'react';
import styled from 'styled-components';

class ProductDimension extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			productHeight: '0',
			productLength: '0',
			productWidth: '0',
			unitOfDimension: '',
			productWeight: '0',
			unitForWeight: ''
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	saveProductDimensions() {
		this.props.sendData(
			this.state.productHeight,
			this.state.productLength,
			this.state.productWidth,
			this.state.unitOfDimension,
			this.state.productWeight,
			this.state.unitForWeight
		);
	}
	render() {
		return (
			<PageBlock id="dimensions">
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemH1>Dimensions</LeftItemH1>
					</ToolbarLeftItems>
				</PageToolbar>
				<InputBody alignItem="flex-end">
					<InputColumnWrapper>
						<H3>Item Size</H3>
						<FormControl>
							<Input
								name="unitOfDimension"
								type="text"
								placeholder="Unit"
								value={this.state.unitOfDimension}
								onChange={this.onChange}
							/>{' '}
							<InputLabel>Unit of Measure</InputLabel>
						</FormControl>
						<FormControl>
							<Input
								name="productLength"
								type="number"
								placeholder="Length"
								value={this.state.productLength}
								onChange={this.onChange}
							/>{' '}
							<InputLabel>Length</InputLabel>
						</FormControl>
					</InputColumnWrapper>
					<InputColumnWrapper>
						<FormControl>
							<Input
								name="productWidth"
								type="number"
								placeholder="Width"
								value={this.state.productWidth}
								onChange={this.onChange}
							/>{' '}
							<InputLabel>Width</InputLabel>
						</FormControl>
					</InputColumnWrapper>
					<InputColumnWrapper>
						<FormControl>
							<Input
								name="productHeight"
								type="number"
								placeholder="Height"
								value={this.state.productHeight}
								onChange={this.onChange}
							/>{' '}
							<InputLabel>Height</InputLabel>
						</FormControl>
					</InputColumnWrapper>
				</InputBody>
				<InputBody alignItem="flex-end">
					<InputColumnWrapper>
						<H3>Item Weight</H3>
						<FormControl>
							<Input
								name="productWeight"
								type="number"
								placeholder="Weight"
								value={this.state.productWeight}
								onChange={this.onChange}
							/>{' '}
							<InputLabel>Weight</InputLabel>
						</FormControl>
					</InputColumnWrapper>
					<InputColumnWrapper>
						<FormControl>
							<Input
								name="unitForWeight"
								type="text"
								placeholder="Unit"
								value={this.state.unitForWeight}
								onChange={this.onChange}
							/>{' '}
							<InputLabel>Unit for Weight</InputLabel>
						</FormControl>
					</InputColumnWrapper>
					<InputColumnWrapper />
				</InputBody>
				<button onClick={(e) => this.saveProductDimensions()}>save</button>
			</PageBlock>
		);
	}
}

export default ProductDimension;

const LeftItemH1 = styled.h1`
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

const InputBody = styled.div.attrs((props) => ({
	alignitem: props.alignItem || 'start',
	borderTop: props.borderTop || '1px solid #e0e1e7'
}))`
align-items: ${(props) => props.alignItem};
	max-height: 4000px;
	overflow: hidden;
	animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	-webkit-animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	-webkit-transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	border-top:  ${(props) => props.borderTop};
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px 20px 0 20px;
	padding-bottom: 20px !important;
`;

const InputColumnWrapper = styled.div`
	flex-basis: calc(100% / 3 - 12px) !important;
	width: 30%;
	@media (max-width: 991px) {
		flex-basis: 100% !important;
		justify-content: space-between;
		display: flex;
		flex-flow: wrap;
	}
`;

const FormControl = styled.div`
	padding-bottom: 20px;
	min-height: 60px;
	position: relative;
	display: flex;
	align-items: start;
	@media (max-width: 991px) {
		flex-basis: calc(100% / 2 - 9px) !important;
	}
}
`;
const ToolbarLeftItems = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;
const Input = styled.input`
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	border-color: #b9bdce;
	padding: 11px 10px 10px 10px;
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
	min-width: 100px;
	flex: 1;
	min-height: 40px;
	background-color: #fff;
	-webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	font-family: "IBM Plex Sans", sans-serif !important;
	line-height: normal;
	font-size: 100%;
	margin: 0;
	outline: none;
	vertical-align: baseline;
`;
const InputLabel = styled.label`
	font-size: 13px;
	line-height: 13px;
	color: #3b3b3b;
	background: transparent;
	z-index: 20;
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

const H3 = styled.h3`
	padding-bottom: 15px;
	color: #3b3b3b;
	font-weight: bold;
	font-size: 15px;
	display: block;
	width: 100%;
`;

const PageBlock = styled.div`
	display: none;
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
`;

const PageToolbar = styled.div`
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 16px 20px;
`;
