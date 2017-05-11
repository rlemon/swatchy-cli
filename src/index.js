import commandLineArgs from 'command-line-args';
import fs from 'fs';
import swatchy from './swatchy';

function Command(name, alias, type, description) {
	return {name, alias, type, description};
}
function exitlog(...args) {
	log(...args);
	process.exit();
}
function log(...args) {
	console.log(...args);
}


const HELPTEXT = `
this is the help text.
this program does shit with your css

love it!
`;
const INPUTREQUIRED = `
you must provide a css file for input
`;
const SWATCHREQUIRED = `
you must provide a js file for the swatch
`;

const commandLineDefinitions = [
	Command('help','h', Boolean, 'Display the usage guide'),
	Command('input','i', String, 'Path to the input css file'),
	Command('output','o', String, 'Path to the output css file'),
	Command('invert','v', Boolean, 'Should the values be inverted before hand'),
	Command('compress','c', Boolean, 'Should the output be compressed'),
	Command('swatch','s', String, 'Path to the input swatch file')
];

const cli = commandLineArgs(commandLineDefinitions);

if( cli.help ) {
	exitlog(HELPTEXT);
}

if( !cli.input ) {
	exitlog(INPUTREQUIRED);
}

if( !cli.swatch ) {
	exitlog(SWATCHREQUIRED);
}

const inputFile = cli.input;
const inputString = fs.readFileSync(inputFile, 'utf-8');

const swatchDefinitions = JSON.parse(fs.readFileSync(cli.swatch, 'utf-8'));

const cssString = swatchy({
	input: inputString, 
	invert: cli.invert,
	compress: cli.compress,
	swatch: swatchDefinitions
});

if( cli.output ) {
	fs.writeFileSync(cli.output, cssString, 'utf-8');
} else {
	console.log(cssString);
}