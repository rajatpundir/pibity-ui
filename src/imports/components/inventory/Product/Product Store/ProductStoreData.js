import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ProductStoreUpdateRecord from './ProductStoreUpdateRecord';
import {
	TableData,
	TableHeaderInner,
	TableRow,
	StatusSpan,
	StatusBackgroundColor
} from '../../../../styles/inventory/Style';

const styles = (theme) => ({
	hide: {
		border: 'none'
	}
});

class ProductStoreData extends React.Component {
	constructor(props) {
		super();
		this.state = {
			open: false
		};
	}
	
	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<TableRow>
					<TableData width="5%">
						<IconButton
							aria-label="expand row"
							size="small"
							onClick={() => this.setState({ open: !this.state.open })}
						>
							{this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								textAlign: 'initial',
								marginLeft: '5px'
							}}
						>
							{this.props.product ? this.props.product.values.general.values.productName : ''}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								marginLeft: '5px'
							}}
						>
							{this.props.productStore.values.location}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								marginLeft: '5px'
							}}
						>
							{this.props.productStore.values.onHand}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								marginLeft: '5px'
							}}
						>
							{this.props.productStore.values.available}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								marginLeft: '5px'
							}}
						>
							{this.props.productStore.values.onOrder}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								marginLeft: '5px'
							}}
						>
							{this.props.productStore.values.allocated}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<StatusSpan
							style={{
								textAlign: 'initial',
								marginLeft: '5px'
							}}
							backgroundColor={
								this.props.productStore.values.status === 'Active' ? (
									StatusBackgroundColor.active
								) : (
									StatusBackgroundColor.depricated
								)
							}
						>
							{this.props.productStore.values.status}
						</StatusSpan>
					</TableData>
					<TableData left="0px">
						<i
							name={this.props.productStore.variableName}
							className="large material-icons"
							// onClick={(e) => this.onRemoveKey(e,)}
						>
							remove_circle_outline
						</i>
					</TableData>
				</TableRow>
				<TableRow
					style={{
						display: this.state.open ? 'table-row' : 'none',
						transition: 'opacity 1s ease-out',
						opacity: this.state.open ? '1' : '0'
					}}
				>
					<TableCell
						style={{
							padding: '10px',
							backgroundColor: '#f6f9f9'
						}}
						colSpan={9}
						className={clsx({
							[classes.hide]: !this.state.open
						})}
					>
						<Collapse in={this.state.open} timeout="auto" unmountOnExit>
							<ProductStoreUpdateRecord
								transactions={this.props.updateRecords}
							/>
						</Collapse>
					</TableCell>
				</TableRow>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(ProductStoreData);
