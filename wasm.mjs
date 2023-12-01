import { Surreal } from 'surrealdb.wasm';

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
		await db.connect('http://127.0.0.1:8000');

        await db.signin({
            username: "root",
            password: "root",
        });
    
        // Select a specific namespace / database
        await db.use({ ns: "demo", db: "demo" });
    

		// Select all people records
        let people = await db.select("person");
        console.log(people);
	
	} catch (e) {
		console.error('ERROR', e);
	}
}

main();