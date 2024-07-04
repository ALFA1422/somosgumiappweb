const { MongoClient } = require('mongodb');

async function dropCollections() {
    const uri = 'mongodb+srv://Dani:Herramientas95@somosgumiapp.nzpsrng.mongodb.net/?retryWrites=true&w=majority&appName=somosgumiapp';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('test');
        const collections = ['products']; // Incluye las colecciones que deseas eliminar

        for (const collectionName of collections) {
            const collection = db.collection(collectionName);
            await collection.drop();
            console.log(`Collection ${collectionName} dropped`);
        }
    } catch (error) {
        console.error('Error dropping collections:', error);
    } finally {
        await client.close();
    }
}

dropCollections();
