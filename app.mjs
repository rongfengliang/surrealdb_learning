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
}
);

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
		// Create a new person with a random id
		const created = await db.create('person', {
			title: 'Founder & CEO',
			name: {
				first: 'Tobie',
				last: 'Morgan Hitchcock',
			},
			marketing: true,
			identifier: Math.random().toString(36).substr(2, 10),
		});

		for (let index = 0; index < 10; index++) {
			const updated = await db.merge('person:jaime', {
				marketing: true,
				identifier: Math.random().toString(36).substr(2, 10)
			});
			
		}
		// Update a person record with a specific id


	} catch (e) {
		console.error('ERROR', e);
	}
}

main();