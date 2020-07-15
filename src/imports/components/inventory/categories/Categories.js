// import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import Modal from 'react-modal';
// import Tree from 'react-d3-tree';
// import CategoryNode from './CategoryNode';
// import { Link } from 'react-router-dom';
// import { clearErrors } from '../../../redux/actions/errors';
// import { getCategories, createCategory, removeCategory, updateCategoryInfo } from '../../../redux/actions/categories';
// import { getCategoryTypes } from '../../../redux/actions/mappingCategoryTypes';
// import { SYSTEM_ALERTS } from '../../../redux/config';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import swal from 'sweetalert';

// import {
// 	Container,
// 	TableContainer,
// 	Table,
// 	TableBody,
// 	Title,
// 	Row,
// 	Data,
// 	Form,
// 	Input,
// 	ActionContainer,
// 	Button,
// 	Error,
// 	Select
// } from '../../../styles/inventory/categories/Categories';

// class Categories extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			categories: [],
// 			categoryId: null,
// 			name: '',
// 			code: '',
// 			nextLabel: '',
// 			categoryCode: '',
// 			parentCategoryId: null,
// 			selectedParentCategoryId: null,
// 			subcategoryName: '',
// 			subcategoryCode: '',
// 			subcategoryNextLabel: '',
// 			hasChildren: false,
// 			kindName: '',
// 			showCategoryModalIsOpen: false,
// 			editCategoryModalIsOpen: false,
// 			createCategoryModalIsOpen: false,
// 			categoryTypeModalIsOpen: false,
// 			typeWithCategoryCodeModalIsOpen: false,
// 			operationInProgress: false
// 		};
// 		this.onChange = this.onChange.bind(this);
// 	}

// 	onChange(e) {
// 		this.setState({ [e.target.name]: e.target.value });
// 	}

// 	// clear form errors and  populate categories
// 	componentDidMount() {
// 		this.props.clearErrors();
// 		this.props.getCategories();
// 		this.props.getKinds();
// 	}

// 	// transform categories
// 	static getDerivedStateFromProps(nextProps, prevState) {
// 		const categories = nextProps.categories.map(function(category) {
// 			return { parentCategoryId: null, ...category, cid: category.id };
// 		});
// 		const nest = (items, id = null, link = 'parentCategoryId') =>
// 			items.filter((item) => item[link] === id).map((item) => ({ ...item, children: nest(items, item.id) }));
// 		return {
// 			...prevState,
// 			categories: nest(categories)
// 		};
// 	}

// 	// toggle modal for showing category
// 	toggleShowCategoryModal() {
// 		this.props.clearErrors();
// 		this.setState({
// 			showCategoryModalIsOpen: !this.state.showCategoryModalIsOpen
// 		});
// 	}

// 	// toggle modal for editing category
// 	toggleEditCategoryModal() {
// 		if (
// 			this.props.profile.userPermissions.filter(
// 				(userPermission) => userPermission.organizationPermission.module.name === 'Inventory'
// 			)[0].permissionLevel !== 2
// 		) {
// 			swal({
// 				title: 'Access Denied',
// 				text: SYSTEM_ALERTS.PERMISSION_DENIED,
// 				icon: 'error'
// 			});
// 		} else {
// 			this.toggleShowCategoryModal();
// 			this.setState({
// 				editCategoryModalIsOpen: !this.state.editCategoryModalIsOpen
// 			});
// 		}
// 	}

// 	// toggle modal for creating category
// 	toggleCreateCategoryModal() {
// 		if (
// 			this.props.profile.userPermissions.filter(
// 				(userPermission) => userPermission.organizationPermission.module.name === 'Inventory'
// 			)[0].permissionLevel !== 2
// 		) {
// 			swal({
// 				title: 'Access Denied',
// 				text: SYSTEM_ALERTS.PERMISSION_DENIED,
// 				icon: 'error'
// 			});
// 		} else {
// 			this.toggleShowCategoryModal();
// 			this.setState({
// 				createCategoryModalIsOpen: !this.state.createCategoryModalIsOpen
// 			});
// 		}
// 	}

// 	// toggle Type Category Modal
// 	toggleCategoryTypeModal() {
// 		this.setState({ categoryCode: this.computeCategoryCode() });
// 		this.toggleShowCategoryModal();
// 		this.setState({
// 			categoryTypeModalIsOpen: !this.state.categoryTypeModalIsOpen
// 		});
// 	}

// 	toggleCreateTypeWithCategoryCodeModal() {
// 		this.toggleCategoryTypeModal();
// 		this.setState({
// 			typeWithCategoryCodeModalIsOpen: !this.state.typeWithCategoryCodeModalIsOpen
// 		});
// 	}

// 	updateCategory(e) {
// 		e.preventDefault();
// 		this.setState({ operationInProgress: true });
// 		this.props
// 			.updateCategoryInfo(
// 				this.state.categoryId,
// 				this.state.selectedParentCategoryId,
// 				this.state.name,
// 				this.state.nextLabel,
// 				this.state.code
// 			)
// 			.then((status) => {
// 				if (status) {
// 					this.toggleEditCategoryModal();
// 					this.setState({
// 						showCategoryModalIsOpen: false
// 					});
// 				}
// 				this.setState({ operationInProgress: false });
// 			});
// 	}

// 	createSubcategory(e) {
// 		e.preventDefault();
// 		this.setState({ operationInProgress: true });
// 		this.props
// 			.createCategory(
// 				this.state.categoryId,
// 				this.state.subcategoryName,
// 				this.state.subcategoryNextLabel,
// 				this.state.subcategoryCode
// 			)
// 			.then((status) => {
// 				if (status) {
// 					this.toggleCreateCategoryModal();
// 					this.setState({
// 						showCategoryModalIsOpen: false,
// 						subcategoryName: '',
// 						subcategoryNextLabel: '',
// 						subcategoryCode: ''
// 					});
// 				}
// 				this.setState({ operationInProgress: false });
// 			});
// 	}

// 	deleteCategory() {
// 		if (
// 			this.props.profile.userPermissions.filter(
// 				(userPermission) => userPermission.organizationPermission.module.name === 'Inventory'
// 			)[0].permissionLevel !== 2
// 		) {
// 			swal({
// 				title: 'Access Denied',
// 				text: SYSTEM_ALERTS.PERMISSION_DENIED,
// 				icon: 'error'
// 			});
// 		} else {
// 			this.props.removeCategory(this.state.categoryId);
// 			this.toggleShowCategoryModal();
// 		}
// 	}

// 	computeCategoryCode() {
// 		let code = '';
// 		const categoryCode = (categoryId) => {
// 			if (categoryId != null) {
// 				const category = this.props.categories.filter((category) => category.id === categoryId)[0];
// 				if (category) {
// 					code = category.code + code;
// 					categoryCode(category.parentCategoryId);
// 				}
// 			}
// 		};
// 		categoryCode(this.state.categoryId);
// 		return code;
// 	}

// 	render() {
// 		let tree = <div />;
// 		if (this.state.categories.length !== 0) {
// 			tree = (
// 				<Tree
// 					data={this.state.categories}
// 					nodeSvgShape={{
// 						shape: 'none'
// 					}}
// 					allowForeignObjects
// 					transitionDuration={0}
// 					nodeLabelComponent={{
// 						render: (
// 							<CategoryNode
// 								editCategory={(data) => {
// 									this.setState({
// 										categoryId: data.cid,
// 										name: data.name,
// 										label: data.label,
// 										code: data.code,
// 										nextLabel: data.nextLabel,
// 										parentCategoryId: data.parentCategoryId,
// 										selectedParentCategoryId: data.parentCategoryId,
// 										hasChildren: data.children ? true : false
// 									});
// 									this.toggleShowCategoryModal();
// 								}}
// 							/>
// 						)
// 					}}
// 					orientation="horizontal"
// 					translate={{
// 						x: 60,
// 						y: 225
// 					}}
// 					zoom={0.65}
// 				/>
// 			);
// 		}
// 		return (
// 			<Container>
// 				{tree}
// 				{/* Modal for Showing Category */}
// 				<Modal
// 					isOpen={this.state.showCategoryModalIsOpen}
// 					contentLabel="Show Category"
// 					onRequestClose={this.toggleShowCategoryModal.bind(this)}
// 					className="boxed-view__box "
// 					ariaHideApp={false}
// 					overlayClassName="boxed-view boxed-view--modal"
// 				>
// 					<Title>Category Info</Title>
// 					<Table>
// 						<TableBody>
// 							<Row>
// 								<Data fontWeight="600">Parent</Data>
// 								<Data>
// 									{
// 										this.props.categories
// 											.filter((category) => category.id === this.state.parentCategoryId)
// 											.map((category) => category.name)[0]
// 									}
// 								</Data>
// 							</Row>
// 							<Row>
// 								<Data fontWeight="600">Label</Data>
// 								<Data>{this.state.name}</Data>
// 							</Row>
// 							<Row>
// 								<Data fontWeight="600">Code</Data>
// 								<Data>{this.state.code}</Data>
// 							</Row>
// 							<Row>
// 								<Data fontWeight="600">Next Label</Data>
// 								<Data>{this.state.nextLabel}</Data>
// 							</Row>
// 						</TableBody>
// 					</Table>
// 					<br />
// 					<ActionContainer>
// 						<Button onClick={this.toggleEditCategoryModal.bind(this)}>Edit Info</Button>
// 						<Button onClick={this.toggleCreateCategoryModal.bind(this)}>Add Subcategory</Button>
// 						<Button
// 							onClick={(e) => {
// 								this.toggleCategoryTypeModal();
// 								this.props.getCategoryTypes(this.state.categoryId);
// 							}}
// 						>
// 							Types
// 						</Button>
// 						{this.state.hasChildren ? null : (
// 							<Button onClick={this.deleteCategory.bind(this)}>Delete</Button>
// 						)}
// 					</ActionContainer>
// 				</Modal>
// 				{/* Modal for Showing Category Type List */}
// 				<Modal
// 					isOpen={this.state.categoryTypeModalIsOpen}
// 					contentLabel="Show Category"
// 					onRequestClose={this.toggleCategoryTypeModal.bind(this)}
// 					className="boxed-view__box "
// 					ariaHideApp={false}
// 					overlayClassName="boxed-view boxed-view--modal"
// 				>
// 					<Title> Category Types</Title>
// 					<TableContainer>
// 						<Table>
// 							<TableBody>
// 								{this.props.mappingCategoryTypes.length !== 0 ? (
// 									this.props.mappingCategoryTypes[0].typeNames.map((name, i) => {
// 										return (
// 											<Row key={name}>
// 												<Data JustifyContent="center" width="100%">
// 													<Link to={'/inventory/type/' + name}>{name}</Link>
// 												</Data>
// 											</Row>
// 										);
// 									})
// 								) : null}
// 							</TableBody>
// 						</Table>
// 					</TableContainer>
// 					<Button
// 						onClick={(e) => {
// 							this.toggleCreateTypeWithCategoryCodeModal();
// 						}}
// 					>
// 						Create Type
// 					</Button>
// 				</Modal>
// 				{/* Modal for Creating Type Using Category Code */}
// 				<Modal
// 					isOpen={this.state.typeWithCategoryCodeModalIsOpen}
// 					contentLabel="Creating Type Using Category Code"
// 					onRequestClose={this.toggleCreateTypeWithCategoryCodeModal.bind(this)}
// 					className="boxed-view__box "
// 					ariaHideApp={false}
// 					overlayClassName="boxed-view boxed-view--modal"
// 				>
// 					<Title>Create Type With Category Code</Title>
// 					<Form>
// 						<Select
// 							name="kindName"
// 							value={this.state.kindName || 'none'}
// 							onChange={this.onChange}
// 							marginBottom="0"
// 							padding="0.5rem"
// 							required
// 						>
// 							<option value="none" disabled hidden>
// 								Select Kind
// 							</option>
// 							{this.props.kinds.filter((kind) => kind.name !== '*').map((kind) => {
// 								return (
// 									<option key={kind.name} value={kind.name}>
// 										{kind.name}
// 									</option>
// 								);
// 							})}
// 						</Select>
// 						<Button margin="0.7rem auto">
// 							<Link
// 								to={
// 									'/inventory/kind/' +
// 									this.state.kindName +
// 									'/' +
// 									this.state.categoryId +
// 									'/' +
// 									this.state.categoryCode
// 								}
// 							>
// 								Create Type
// 							</Link>
// 						</Button>
// 					</Form>
// 				</Modal>
// 				{/* Modal for Editing Category */}
// 				<Modal
// 					isOpen={this.state.editCategoryModalIsOpen}
// 					contentLabel="Edit Category"
// 					onAfterOpen={() => this.refs.name.focus()}
// 					onRequestClose={this.toggleEditCategoryModal.bind(this)}
// 					className="boxed-view__box"
// 					ariaHideApp={false}
// 					overlayClassName="boxed-view boxed-view--modal"
// 				>
// 					<Title>Edit Category</Title>
// 					<Form onSubmit={this.updateCategory.bind(this)}>
// 						{this.props.errors.parentCategoryId ? (
// 							<Error>{this.props.errors.parentCategoryId}</Error>
// 						) : (
// 							undefined
// 						)}
// 						<Select
// 							name="selectedParentCategoryId"
// 							defaultValue={this.state.selectedParentCategoryId}
// 							onChange={this.onChange}
// 							padding="0.5rem"
// 						>
// 							{this.props.categories.map((category) => {
// 								return (
// 									<option key={category.id} value={category.id}>
// 										{category.name}
// 									</option>
// 								);
// 							})}
// 						</Select>

// 						{this.props.errors.name ? <Error>{this.props.errors.name}</Error> : undefined}
// 						<Input
// 							name="name"
// 							type="text"
// 							ref="name"
// 							placeholder="Label"
// 							value={this.state.name}
// 							onChange={this.onChange}
// 						/>

// 						{this.props.errors.code ? <Error>{this.props.errors.code}</Error> : undefined}
// 						<Input
// 							name="code"
// 							type="text"
// 							ref="code"
// 							placeholder="Code"
// 							value={this.state.code}
// 							onChange={this.onChange}
// 						/>

// 						{this.props.errors.nextLabel ? <Error>{this.props.errors.nextLabel}</Error> : undefined}
// 						<Input
// 							name="nextLabel"
// 							type="text"
// 							ref="nextLabel"
// 							placeholder="Next Label"
// 							value={this.state.nextLabel}
// 							onChange={this.onChange}
// 						/>
// 						<ActionContainer>
// 							<Button type="submit">Update</Button>
// 							{this.state.operationInProgress ? <CircularProgress /> : undefined}
// 						</ActionContainer>
// 					</Form>
// 				</Modal>
// 				{/* Modal for Creating Subcategory */}
// 				<Modal
// 					isOpen={this.state.createCategoryModalIsOpen}
// 					contentLabel="Add Subcategory"
// 					onAfterOpen={() => this.refs.subcategoryName.focus()}
// 					onRequestClose={this.toggleCreateCategoryModal.bind(this)}
// 					className="boxed-view__box"
// 					ariaHideApp={false}
// 					overlayClassName="boxed-view boxed-view--modal"
// 				>
// 					<Title>Add Subcategory</Title>
// 					<Form onSubmit={this.createSubcategory.bind(this)}>
// 						{this.props.errors.name ? <Error>{this.props.errors.name}</Error> : undefined}
// 						<Input
// 							name="subcategoryName"
// 							type="text"
// 							ref="subcategoryName"
// 							placeholder="Label"
// 							value={this.state.subcategoryName}
// 							onChange={this.onChange}
// 						/>

// 						{this.props.errors.code ? <Error>{this.props.errors.code}</Error> : undefined}
// 						{this.props.categories.filter(
// 							(category) =>
// 								category.parentCategoryId === this.state.categoryId &&
// 								category.code === this.state.subcategoryCode
// 						).length !== 0 ? (
// 							<Error>Duplicate code</Error>
// 						) : (
// 							undefined
// 						)}
// 						<Input
// 							name="subcategoryCode"
// 							type="text"
// 							ref="subcategoryCode"
// 							placeholder="Code"
// 							value={this.state.subcategoryCode}
// 							onChange={this.onChange}
// 						/>

// 						{this.props.errors.nextLabel ? <Error>{this.props.errors.nextLabel}</Error> : undefined}
// 						<Input
// 							name="subcategoryNextLabel"
// 							type="text"
// 							ref="subcategoryNextLabel"
// 							placeholder="Next Label"
// 							value={this.state.subcategoryNextLabel}
// 							onChange={this.onChange}
// 						/>
// 						<ActionContainer>
// 							{this.props.categories.filter(
// 								(category) =>
// 									category.parentCategoryId === this.state.categoryId &&
// 									category.code === this.state.subcategoryCode
// 							).length === 0 ? (
// 								<Button type="submit">Add</Button>
// 							) : (
// 								undefined
// 							)}
// 							{this.state.operationInProgress ? <CircularProgress /> : undefined}
// 						</ActionContainer>
// 					</Form>
// 				</Modal>
// 			</Container>
// 		);
// 	}
// }

// Categories.propTypes = {
// 	errors: PropTypes.object.isRequired,
// 	categories: PropTypes.array.isRequired,
// 	mappingCategoryTypes: PropTypes.array.isRequired,
// 	getCategories: PropTypes.func.isRequired,
// 	createCategory: PropTypes.func.isRequired,
// 	removeCategory: PropTypes.func.isRequired,
// 	updateCategoryInfo: PropTypes.func.isRequired,
// 	getCategoryTypes: PropTypes.func.isRequired
// };

// const mapStateToProps = (state, ownProps) => ({
// 	errors: state.errors,
// 	categories: state.categories,
// 	mappingCategoryTypes: state.mappingCategoryTypes,
// 	kinds: state.kinds,
// 	profile: state.profile
// });

// export default connect(mapStateToProps, {
// 	clearErrors,
// 	getCategories,
// 	createCategory,
// 	removeCategory,
// 	updateCategoryInfo,
// 	getCategoryTypes,
// 	getKinds
// })(Categories);
