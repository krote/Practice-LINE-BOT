import { createHmac } from 'crypto';
import aws, { DynamoDB } from 'aws-sdk';
import line from '@line/bot-sdk';
import { AppContext } from '../app-context.js';
import { bot } from '../bot.js';
import { error, log } from '../log.js';
import { DynamoDbContext } from '../db.js';
import { saveContentFileToS3DownloadDir } from '../save-file.js';

const { CHANNEL_SECRET } = process.env;
const { CHANNEL_ACCESS_TOKEN } = process.env;

// 署名検証をする関数
const verifySignature = (event) => {
    const signature = createHmac('sha256', CHANNEL_SECRET).update(JSON.stringify(event.body)).digest('base64');
    const signatureHeader = event.hearders['x-line-signature'];
    return signature === signatureHeader;
};

const response = {
    statusCode: 200,
    body: '',
};

// eslint-disable-next-line consistent-return
export const webhookHandler = async (event) => {
    // リクエストボディからイベントを取り出し
    const { events } = event.body;

    // 受け取ったイベントの中身を出力
    log(events);

    // 署名検証に失敗した場合は200を返して終了
    if (!verifySignature(event)) return response;

    // DynamoDB Document Client のインスタンスを生成
    const dynamoDBDocument = new DynamoDB.DocumentClient();

    // DynamoDBのContextを作成
    const dynamoDBContext = new DynamoDbContext(dynamoDBDocument);
};



