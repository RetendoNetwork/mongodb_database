const { MongoClient } = require('mongodb');
const logger = require('./logger');

async function createDatabase() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const db = client.db('retendo_account');

        await db.createCollection('rnids');
        await db.createCollection('nexaccounts');
        await db.createCollection('devices');
        await db.createCollection('servers');

        logger.success('Database and collections successfully created!');

        const rnidsCollection = db.collection('rnids');
        await rnidsCollection.createIndex({ pid: 1 }, { unique: true, background: true });
        await rnidsCollection.createIndex({ username: 1 }, { unique: true, background: true });
        await rnidsCollection.createIndex({ usernameLower: 1 }, { unique: true, background: true });
        await rnidsCollection.createIndex({ 'identification.email_code': 1 }, { unique: true, background: true });
        await rnidsCollection.createIndex({ 'identification.email_token': 1 }, { unique: true, background: true });

        logger.success('Indexes successfully created in the rnids collection!');

        const nexaccountsCollection = db.collection('nexaccounts');
        await nexaccountsCollection.createIndex({ _id: 1 });
        await nexaccountsCollection.createIndex({ pid: 1 }, { unique: true, background: true });

        const devicesCollection = db.collection('devices');
        logger.success('Successfully created devices collection with default index on _id!');

        logger.success('Indexes successfully created in nexaccounts collection!');
    } catch (error) {
        logger.error('Error creating database or collections:', error);
    } finally {
        await client.close();
    }
}

createDatabase();
