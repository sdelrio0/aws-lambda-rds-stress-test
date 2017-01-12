import AWS from 'aws-sdk';

const lambda = new AWS.Lambda({
  apiVersion: '2015-03-31',
  region: 'us-east-1'
});

const invoke = (id) => {
  lambda.invoke({
    FunctionName: "arn:aws:lambda:us-east-1:875566058060:function:doorbell-lambda",
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify({ lambdaId: 1 }),
    Qualifier: "$LATEST"
  }, (err, data) => {
    if(err) {
      console.log(`Error invoking the Lambda.`);
      console.error(err);
    } else {
      const statusCode = data.StatusCode;
      const logResult = Buffer.from(data.LogResult, 'base64').toString('utf8');
      const payload = JSON.parse(data.Payload);

      if(payload.errorMessage) {
        console.log(`Error in the Lambda code.`);
        console.log(payload.errorMessage);
        console.log(payload.errorType);
        console.log(payload.stackTrace);
        console.log(logResult);
      } else {
        console.log(`Invocation succeeded.`);
        console.log(statusCode);
        console.log(logResult);
        console.log(payload);
      }
    }
  });
};

const ITERATIONS = 3; // 100 x 100 async

// use progress bars, calculate total amount of permutations, time elapsed

// Flow
for(let i = 0; i < ITERATIONS; i++) {
  // update template's counter (modifier)
  // zip package
  // upload lambda with package
  // publish version alias
  // invoke lambda (100 times?)
  //   record into hash lambda's response
  // interpret all results
}

console.log('Done');