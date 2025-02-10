#!/usr/bin/env node

/**
 * task-manage
 * task manager
 *
 * @author Prabhat Deshmukh <prabhat.deshmukh22@gmail.com>
 */

import { table } from 'console';
import cli from './utils/cli.js';
import init from './utils/init.js';
import fs from 'fs';

const { flags, input, showHelp } = cli;
const { clear, debug } = flags;

const TASK_FILE = `./tasks.json`

function load(){
	if(!fs.existsSync(TASK_FILE)){
		return {};
	}
	else{
		try {
			const content = fs.readFileSync(TASK_FILE,`utf-8`).trim()
	
			if(!content) return {};
	
			else return JSON.parse(content)
		} catch (error) {
			console.error(error)
			return 0;
		}
	}
}

function add(data){
	fs.writeFileSync(TASK_FILE,JSON.stringify(data,null,2))
}

// const taskStatus = {
// 	TODO: "to-do",
// 	IN_PROGRESS: "in-progress",
// 	DONE: "done"
// }

(async () => {
	await init({ clear });
	debug && log(flags);

	if(input.includes(`add`)){

		let data = input[1];
		let id = input[2];

		const content = load()

		if(content === 0) console.log(`There was an error`);

		if(content === Object.keys(content).length === 0){
			console.log(`No tasks`);

		}

		else{
			console.log(`content ${content}`);
			content[id]={"data":data, "status":"to-do"}
			add(content)
		}
		
	}

	if(input.includes(`update`)){

		let content = load()
		const id = input[1]
		const data = input[2]

		if(content === 0) console.log(`There was an error`);

		if(Object.keys(content).length === 0) console.log(`No tasks`);

		else{
			if(content[input[1]] === undefined) console.log(`Invalid id`);

			else{
				content[id] = { "data": data, "status":content[id]["status"] };
				add(content)
			}
		}
	}

	if(input.includes(`delete`)){

		const id=input[1]
		let content = load()

		if(content === 0) console.log(`Error`);
		
		if(Object.keys(content).length === 0) console.log(`No tasks`);
		
		else{
			delete content[id]
			add(content)
		}

	}

	if(input.includes(`list`)){

		const content = load()

		if(content === 0) console.log(`Error`);
		
		if(Object.keys(content).length === 0) console.log(`No tasks`);

		else{
			console.table(content)
		}
		
	}

	if(input.includes(`mark_in_progress`)){
		const id = input[1]

		let content = load()

		if(content === 0) console.log(`Error`);

		if(Object.keys(content).length === 0) console.log(`No tasks`);

		else{
			if(!content[id]){
				console.log(`No tasks corresponding to this id ${id}`);
			}
			else{
				content[id]["status"] = "in-progress"
				add(content)
			}
		}
	}

	if(input.includes(`mark_done`)){
		const id = input[1]

		let content = load()

		if(content === 0) console.log(`Error`);

		if(Object.keys(content).length === 0) console.log(`No tasks`);

		else{
			if(!content[id]){
				console.log(`No tasks corresponding to this id ${id}`);
			}
			else{
				content[id]["status"] = "done"
				add(content)
			}
		}
	}

	if(input.includes(`list_done`)){
		let content = load()

		if(content===0) console.log(`Error`);

		if(Object.keys(content).length === 0) console.log(`No tasks`);

		else{	
			Object.keys(content).map( (i) => {
				if(content[i]["status"] === "done"){
					console.table(content[i])
				}
			} )
		}
		
	}

	if(input.includes(`list_in_progress`)){
		let content = load()

		if(content===0) console.log(`Error`);

		if(Object.keys(content).length === 0) console.log(`No tasks`);

		else{	
			Object.keys(content).map( (i) => {
				if(content[i]["status"] === "in-progress"){
					console.table(content[i])
				}
			} )
		}
	}

	if(input.includes(`list_todo`)){
		let content = load()

		if(content===0) console.log(`Error`);

		if(Object.keys(content).length === 0) console.log(`No tasks`);

		else{	
			Object.keys(content).map( (i) => {
				if(content[i]["status"] === "to-do"){
					console.table(content[i])
				}
			} )
		}
	}

	function docs() {
		console.log(`
		📌 Task Manager CLI - Documentation
	
		This is a simple task manager that allows you to add, update, delete, and list tasks using a CLI interface.
	
		📌 Commands:
		- **add <task> <id>**              ➝ Add a new task with a given ID
		- **update <id> <task>**           ➝ Update a task's description
		- **delete <id>**                  ➝ Delete a task by ID
		- **list**                          ➝ List all tasks
		- **mark_in_progress <id>**        ➝ Mark a task as 'in-progress'
		- **mark_done <id>**               ➝ Mark a task as 'done'
		- **list_done**                    ➝ List all tasks marked as 'done'
		- **list_in_progress**             ➝ List all tasks marked as 'in-progress'
		- **list_todo**                    ➝ List all tasks marked as 'to-do'
		- **help**                         ➝ Show help menu
		- **--docs**                       ➝ Show this documentation
	
		📌 Task Structure:
		{
			"id": {
				"data": "Task description",
				"status": "to-do | in-progress | done"
			}
		}
	
		📌 Task File Location: \`tasks.json\` (Stored locally)
		`);
	}
	
	// Check for the documentation flag
	if (input.includes(`docs`)) {
		docs();
		// process.exit(0);
	}

	input.includes(`help`) && showHelp(0);
})();
