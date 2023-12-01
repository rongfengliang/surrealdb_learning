import { Surreal } from 'surrealdb.js';

const db = new Surreal({
	onClose: () => {
		console.log("CLOSED")
	},
	onError: (e) => {
		console.log("ERROR",e)
	},
	onConnect: () => {
		console.log("CONNECTED")
	},
});

async function main() {
	try {
		// Connect to the database
		await db.connect('http://127.0.0.1:8000/rpc', {
			// Set the namespace and database for the connection
			// Set the authentication details for the connection
			namespace: 'demo',
			database: 'demo',
			auth: {
				username: 'root',
				password: 'root',
				namespace: 'demo',
				database: 'demo',
			},
		});

		// Select all people records
		const queryUuid = await db.live(
			"person",
			// The callback function takes an object with the "action" and "result" properties
			({ action, result }) => {
				// action can be: "CREATE", "UPDATE", "DELETE" or "CLOSE"
				if (action === "CLOSE") return;
		
				// result contains either the entire record, or a set of JSON patches when diff mode is enabled
				console.log(result,action)
			}
		)
	
	} catch (e) {
		console.error('ERROR', e);
	}
}

main();