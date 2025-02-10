**Task Manager CLI Tool**

**Overview**
The Task Manager CLI tool allows users to manage their tasks using a simple command-line interface. It provides functionalities to add, update, delete, list, and change the status of tasks.

**Features**
> Add new tasks with a unique identifier.

> Update existing tasks.

> Delete tasks.

> List all tasks.

> Mark tasks as to-do, in-progress, or done.

> Filter tasks based on their status.

**Installation**
> Ensure you have Node.js installed. Clone the repository and install dependencies:

> npm install -g task-manage

Usage

Run the CLI tool using:

task-manage <command> [arguments]

**Commands**

1. *Add a Task*

task-manage add "Task Description" <task_id>

Adds a new task with a given ID and marks it as to-do by default.

2. *Update a Task*

task-manage update <task_id> "Updated Task Description"

Updates the task description without modifying the status.

3. *Delete a Task*

task-manage delete <task_id>

Removes a task from the list.

4. *List All Tasks*

task-manage index.js list

Displays all tasks in a tabular format.

5. *Change Task Status*

Mark as In-Progress

task-manage mark_in_progress <task_id>

Changes task status to in-progress.

Mark as Done

task-manage mark_done <task_id>

Changes task status to done.

6. *Filter Tasks by Status*

List Completed Tasks

task-manage list_done

List Tasks In-Progress

task-manage list_in_progress

List To-Do Tasks

task-manage list_todo

7. Help

task-manage help

Displays available commands.

File Structure

index.js: Main script handling CLI commands.

tasks.json: JSON file storing tasks persistently.

utils/cli.js: Handles command-line argument parsing.

utils/init.js: Handles initialization logic.

Data Format

Tasks are stored in tasks.json in the following format:

{
    "task_id": {
        "data": "Task description",
        "status": "to-do"
    }
}

Error Handling

If tasks.json is missing or corrupted, a new empty file is created.

Invalid task IDs return appropriate error messages.

Attempts to update or delete non-existent tasks are handled gracefully.

Future Enhancements

Add due dates for tasks.

Implement a priority system.

Support for categories and tags.

Author

Prabhat Deshmukh (prabhat.deshmukh22@gmail.com)

