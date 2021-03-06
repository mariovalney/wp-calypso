/* eslint-disable import/no-nodejs-modules, no-console, no-process-exit */
const fs = require( 'fs' );
const path = require( 'path' );

const DESKTOP_DIR = path.resolve( __dirname, '..' );
/*
 * Create a desktop/config.json file by merging source files according to `CONFIG_ENV` value
 */
const BASE_CONFIG = path.join( DESKTOP_DIR, 'desktop-config/config-base.json' );
const TARGET_CONFIG = path.join(
	DESKTOP_DIR,
	`desktop/desktop-config/config-${ process.env.CONFIG_ENV }.json`
);

const base = JSON.parse( fs.readFileSync( BASE_CONFIG, 'utf-8' ) );
let env;
try {
	env = JSON.parse( fs.readFileSync( TARGET_CONFIG, 'utf-8' ) );
} catch ( e ) {
	if ( process.env.CI ) {
		console.error( 'Error reading target config: ', e.message );
	}
}

const config = JSON.stringify( Object.assign( base, env ), null, 2 );

fs.writeFileSync( path.join( DESKTOP_DIR, 'config', 'config.json' ), config, 'utf-8' );

/*
 * Verify that the `config/secrets.json` file exists. It contains OAuth keys that the app needs
 * to perform user login
 */
let secretsString;
try {
	secretsString = fs.readFileSync( path.join( DESKTOP_DIR, 'config', 'secrets.json' ), 'utf-8' );
} catch {
	console.error( 'Config file config/secrets.json does not exist. Please create one.' );
	process.exit( 1 );
}

/*
 * Verify that the `config/secrets.json` file contents are valid JSON
 */
let secretsObject;
try {
	secretsObject = JSON.parse( secretsString );
} catch {
	console.error( 'Content of file config/secrets.json is not a valid JSON' );
	process.exit( 1 );
}

/*
 * Verify that the OAuth client ID has the right value for a release build. For development
 * and testing builds, another client ID should be used.
 */
if ( process.env.CONFIG_ENV === 'release' ) {
	if ( secretsObject.desktop_oauth_client_id !== '43452' ) {
		console.error( 'desktop_oauth_client_id must be 43452 in secrets.json in release build' );
		process.exit( 1 );
	}
}
