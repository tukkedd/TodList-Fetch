import React, { useState, useEffect } from "react";


const Home = () => {

	const [list, setList] = useState([{ label: '', done: false }])

	const [task, setTask] = useState("")



	const createUser = async () => {

		const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Jean-abiad', {
			method: 'POST',
			body: JSON.stringify([]),
			headers: {
				'Content-Type': 'application/json'
			},
		})
		if (response.ok) {
			getTasks()
		}
	}



	const getTasks = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Jean-abiad')
			const data = await response.json()
			if (response.ok) {
				setList(data)
			} else {
				//crear user
				createUser()
			}

		}
		catch (error) {
			console.log(error);
		}
	}

	const handleSubmit = async (evt) => {

		if (evt.key == "Enter") {
			const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Jean-abiad', {
				method: 'PUT',
				body: JSON.stringify([...list, { label: task, done: false }]),
				headers: {
					'Content-Type': 'application/json'
				}
			})


			if (response.ok) {
				getTasks()

			}
		}

	};

	const deleteAll = async () => {
		const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Jean-abiad', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		});

		createUser()
	};

	const deleteItems = async (label) => {
		const taskFiltered = list.filter(item => item.label != label)

		const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Jean-abiad', {
			method: 'PUT',
			body: JSON.stringify(taskFiltered),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (response.ok) {
			setList(taskFiltered)

		} console.log(taskFiltered);
	};




	useEffect(() => {

		getTasks()

	}, [])


	return <>

		<div className="caja" style={{ width: "55%", margin: "auto" }}>
			<form className="d-flex justify-content-center mt-2" onSubmit={(evt) => { evt.preventDefault() }}>

				<input placeholder="Write a Task" className="border border-0 caja py-3 px-3" type="text"
					onKeyUp={handleSubmit}
					onChange={(e) => setTask(e.target.value)}
				/>
				<button
					onClick={() => deleteAll()}
					className="btn btn-secondary mx-3">Delete All</button>

			</form>

			{list && list.map((task, index) => <div className="d-flex justify-content-between border-top gap-2 m-3" key={index}>
				<div className="d-flex mt-4 align-content-center">
					<h5 className=""> {task.label} </h5></div>
				<button className="bg-danger btn d-flex align-items-center m-3 anm borde" onClick={() => deleteItems(task.label)}>🗑️</button>

			</div>

			)}
			<div className="border-top px-4 py-3 m-0 ">
				<span className="itm">{list.length > 1 ? list.length + " " + "Tasks left" : list.length + " " + "Task left"}</span>
			</div>
		</div>

	</>



}
export default Home; 
