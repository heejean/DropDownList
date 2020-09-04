import React from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import '@progress/kendo-theme-default/dist/all.css';

import products from "./products.json";

import EditForm from './editForm.jsx';

const EditCommandCell = props => {
	return (
		<td>
			<button
				className="k-button k-primary"
				onClick={() => props.enterEdit(props.dataItem)}
			>
				Edit
			</button>
		</td>
	);
};

class App extends React.Component {
	state = {
		openForm: false,
		editItem: {},
		data: [...products]
	}
	enterEdit = item => {
		this.setState({
			openForm: true,
			editItem: item
		});
	}

	handleSubmit = (event) => {
		this.setState({
			data: this.state.data.map(item => {
				if (event.ProductID === item.ProductID) {
					item = { ...event };
				}
				return item;
			}),
			openForm: false
		});
	}

	handleCancelEdit = () => {
		this.setState({ openForm: false })
	}

	MyEditCommandCell = props => (
		<EditCommandCell {...props} enterEdit={this.enterEdit} />
	);
	render() {
		return (
			<React.Fragment>
				<Grid style={{ height: "400px" }} data={this.state.data}>
					<Column field="ProductID" title="ID" width="40px" />
					<Column field="ProductName" title="Name" width="250px" />
					<Column field="Category.CategoryName" title="CategoryName" />
					<Column field="UnitPrice" title="Price" />
					<Column field="UnitsInStock" title="In stock" />
					<Column cell={this.MyEditCommandCell} />
				</Grid>
				{this.state.openForm && <EditForm cancelEdit={this.handleCancelEdit} onSubmit={this.handleSubmit} item={this.state.editItem} />}
			</React.Fragment>
		);
	}
}

/*
ReactDOM.render(
	<React.Fragment>
		<App/>
		<style>
			{`.k-animation-container {
				z-index: 10003;
			}`}
		</style>
	</React.Fragment>, document.querySelector('my-app')
);
*/
export default App;
