import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB || 'korean-guide-bd';
const COLLECTION = 'guides';

async function getGuidesFromDb() {
  if (!MONGO_URI) return null;
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const guides = await db.collection(COLLECTION).find({}).toArray();
    return guides;
  } catch (e) {
    return null;
  } finally {
    await client.close();
  }
}

function getGuidesFromFile() {
  const file = path.resolve(process.cwd(), 'db.json');
  try {
    const raw = fs.readFileSync(file, 'utf-8');
    const json = JSON.parse(raw);
    return json.guides || [];
  } catch (e) {
    return [];
  }
}

export async function GET(request) {
  const dbGuides = await getGuidesFromDb();
  const guides = dbGuides && dbGuides.length ? dbGuides : getGuidesFromFile();
  return NextResponse.json({ data: guides });
}

export async function POST(request) {
  const body = await request.json();
  if (!body || !body.slug) return NextResponse.json({ error: 'invalid' }, { status: 400 });

  if (!MONGO_URI) return NextResponse.json({ error: 'no-db-config' }, { status: 500 });

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const res = await db.collection(COLLECTION).insertOne(body);
    return NextResponse.json({ insertedId: res.insertedId });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  } finally {
    await client.close();
  }
}
