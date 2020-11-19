import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../../redux/actions/errors';
import { getVariables } from '../../../../redux/actions/variables';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {
	InputColumnWrapper,
	InputFieldContainer,
	Input,
	Required,
	InputBody,
	InputLabel,
	LeftItemH1,
	PageBlock,
	PageToolbar,
	SelectWrapper,
	ToolbarLeftItems,
	FormControl,
} from '../../../../styles/inventory/Style';

class BillGeneralDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			variable: props.variable,
			open: true
		};
		this.onChange = this.onChange.bind(this);
		this.onVariableNameChange = this.onVariableNameChange.bind(this);
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

	onVariableNameChange(e) {
		const variable = cloneDeep(this.state.variable);
		variable.set('variableName', e.target.value);
		this.setState({ variable: variable });
		this.props.updateDetails(variable);
	}

	onChange(e) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set(e.target.name, e.target.value);
		variable.set('values', values);
		this.setState({ variable: variable });
		this.props.updateDetails(variable);
	}

	render() {
		console.log(this.state.variable);

		return (
			<PageBlock paddingBottom="0">
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemH1>New Bill</LeftItemH1>
					</ToolbarLeftItems>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => this.setState({ open: !this.state.open })}
					>
						{this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</PageToolbar>
				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<InputBody overflow="visible">
						<InputFieldContainer>
							<InputColumnWrapper>

								<FormControl>
									<SelectWrapper>
										<Select
											value={{
												value: this.state.variable.get('values').get('from'),
												label: this.state.variable.get('values').get('from')
											}}
											onChange={(option) => {
												this.onChange({ target: { name: 'status', value: option.value } });
											}}
											options={
												this.props.variables.Status !== undefined ? (
													this.props.variables.Status.map((variable) => {
														return {
															value: variable.variableName,
															label: variable.variableName
														};
													})
												) : (
														[]
													)
											}
										/>
									</SelectWrapper>
									<InputLabel>
										From<Required>*</Required>
									</InputLabel>
								</FormControl>
								<FormControl>
									<Input
										name="issuedate"
										type="date"
										placeholder="date"
										value={this.state.variable.get('issuedate')}
										onChange={this.onChange}
									/>
									<InputLabel>
										Issue Date <Required>*</Required>
									</InputLabel>
								</FormControl>
							</InputColumnWrapper>
							<InputColumnWrapper>
								<FormControl>
									<Input
										name="reference"
										type="text"
										placeholder="reference"
										value={this.state.variable.get('reference')}
										onChange={this.onChange}
									/>
									<InputLabel>
										Reference
										<Required>*</Required>
									</InputLabel>
								</FormControl>
							</InputColumnWrapper>
							<InputColumnWrapper>
								<FormControl>
									<Input
										name="duedate"
										type="date"
										placeholder="date"
										value={this.state.variable.get('duedate')}
										onChange={this.onChange}
									/>
									<InputLabel>
										Issue Date <Required>*</Required>
									</InputLabel>
								</FormControl>
							</InputColumnWrapper>
						</InputFieldContainer>
					</InputBody>
				</Collapse>
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
})(BillGeneralDetails);
