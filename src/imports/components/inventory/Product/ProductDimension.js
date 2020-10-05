import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import {
	InputColumnWrapper,
	H3,
	Input,
	InputBody,
	InputLabel,
	LeftItemH1,
	PageBlock,
	PageToolbar,
	SelectWrapper,
	ToolbarLeftItems,
	FormControl
} from '../Purchase/Style';

class ProductDimension extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			variable: props.variable
		};
		this.onChange = this.onChange.bind(this);
	}

	// clear form errors
	componentDidMount() {
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			variable: nextProps.variable
		};
	}

	onChange(e) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set(e.target.name, e.target.value);
		variable.set('values', values);
		this.setState({ variable: variable });
		this.props.updateDimensions(variable);
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
							<SelectWrapper>
								<Select
									value={{
										value: this.state.variable.get('values').get('unitOfDimension'),
										label: this.state.variable.get('values').get('unitOfDimension')
									}}
									onChange={(option) => {
										this.onChange({ target: { name: 'unitOfDimension', value: option.value } });
									}}
									options={
										this.props.variables.UnitForDimensions !== undefined ? (
											this.props.variables.UnitForDimensions.map((variable) => {
												return { value: variable.variableName, label: variable.variableName };
											})
										) : (
											[]
										)
									}
								/>
							</SelectWrapper>

							<InputLabel>Unit of Measure</InputLabel>
						</FormControl>
						<FormControl>
							<Input
								name="productLength"
								type="number"
								placeholder="Length"
								value={this.state.variable.get('values').get('productLength')}
								onChange={this.onChange}
							/>
							<InputLabel>Length</InputLabel>
						</FormControl>
					</InputColumnWrapper>
					<InputColumnWrapper>
						<FormControl>
							<Input
								name="productWidth"
								type="number"
								placeholder="Width"
								value={this.state.variable.get('values').get('productWidth')}
								onChange={this.onChange}
							/>
							<InputLabel>Width</InputLabel>
						</FormControl>
					</InputColumnWrapper>
					<InputColumnWrapper>
						<FormControl>
							<Input
								name="productHeight"
								type="number"
								placeholder="Height"
								value={this.state.variable.get('values').get('productHeight')}
								onChange={this.onChange}
							/>
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
								value={this.state.variable.get('values').get('productWeight')}
								onChange={this.onChange}
							/>
							<InputLabel>Weight</InputLabel>
						</FormControl>
					</InputColumnWrapper>
					<InputColumnWrapper>
						<FormControl>
							<SelectWrapper>
								<Select
									value={{
										value: this.state.variable.get('values').get('unitForWeights'),
										label: this.state.variable.get('values').get('unitForWeights')
									}}
									onChange={(option) => {
										this.onChange({ target: { name: 'unitForWeights', value: option.value } });
									}}
									options={
										this.props.variables.UnitForWeights !== undefined ? (
											this.props.variables.UnitForWeights.map((variable) => {
												return { value: variable.variableName, label: variable.variableName };
											})
										) : (
											[]
										)
									}
								/>
							</SelectWrapper>
							<InputLabel>Unit for Weight</InputLabel>
						</FormControl>
					</InputColumnWrapper>
					<InputColumnWrapper />
				</InputBody>
			</PageBlock>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	types: state.types,
	variables: state.variables
});

export default connect(mapStateToProps, {
	clearErrors,
	getVariables
})(ProductDimension);
