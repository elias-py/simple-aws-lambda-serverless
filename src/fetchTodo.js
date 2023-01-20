const { DynamoDB } = require('aws-sdk');
const AWS = require('aws-sdk');

const fetchTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParamameters;

  let todo;
  try {
    const result = await dynamodb
      .get({ TableName: 'TodoTable', Key: { id } })
      .promise();

    todo = result.Items;
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todo),
  };
};

module.exports = {
  handler: fetchTodo,
};
