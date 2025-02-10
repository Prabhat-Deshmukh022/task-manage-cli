import meowHelp from 'cli-meow-help';
import meow from 'meow';
import { type } from 'os';

const flags = {
	clear: {
		type: `boolean`,
		default: false,
		shortFlag: `c`,
		desc: `Clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		shortFlag: `d`,
		desc: `Print debug info`
	},
	add:{
		type: `string`,
		default: "",
		desc: `Adding items`
	},
	update:{
		type: `string`,
		default: "",
		desc: "Updating existing items"
	},
	delete:{
		type:`string`,
		default:"",
		desc:"Deleting existing items"
	},
	"mark_in_progress":{
		type:`string`,
		default:"",
		desc:"updating status"
	},
	"mark_done":{
		type:`string`,
		default:"",
		desc:"updating status"
	},
	list_done:{
		type:`string`,
		default:"",
		desc:"listing done"
	},
	list_in_progress:{
		type:`string`,
		default:"",
		desc:"listing in progress"
	},
	list_todo:{
		type:`string`,
		default:"",
		desc:"listing to do"
	},
	docs:{
		type:`string`,
		default:"",
		desc:"documentation"
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `calai`,
	flags,
	commands
});

const options = {
	importMeta: import.meta,
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

export default meow(helpText, options);
