import { ElasticsearchServiceClient } from "@aws-sdk/client-elasticsearch-service";
import { config } from "dotenv";

const awsInitialize = () => {
    const client = new ElasticsearchServiceClient({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }, region: "REGION"
    });
    console.log(process.env.AWS_ACCESS_KEY_ID);
}

export { awsInitialize };
