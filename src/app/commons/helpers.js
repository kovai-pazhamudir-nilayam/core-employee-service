exports.connectionCheck = db => db.raw("select 1+1 as result");
const moment = require("moment-timezone");

exports.getCurrentTimestamp = () => moment().toISOString();

exports.getAuditInfo = entity => {
  const { audit } = entity;
  const currentTimeStamp = new Date(Date.now()).toISOString();
  const obj = {
    created_at: currentTimeStamp,
    updated_at: currentTimeStamp
  };
  if (!audit) {
    return obj;
  }
  const { created_by, updated_by, api_version } = audit;
  return {
    ...(api_version && { api_version }),
    ...(created_by && { created_by }),
    ...(updated_by && { updated_by }),
    ...obj
  };
};

exports.logQuery = ({ logger, query, context, logTrace }) => {
  const SQLQueryObj = query.toSQL();
  logger.debug({
    message: "SQL Query",
    context,
    logTrace,
    method: SQLQueryObj.method,
    query: SQLQueryObj.sql,
    bindings: SQLQueryObj.bindings
  });
};

exports.buildQueryParams = (query, includeVersion) => {
  const queryParams = Object.keys(query)
    .filter(key => {
      if (key === "channel") {
        return false;
      }
      if (!includeVersion && key === "version") {
        return false;
      }
      return true;
    })
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join("&");

  return queryParams;
};

exports.getBatches = (input, BATCH_SIZE) => {
  const allBatches = [];
  let tempBatch = [];
  let counter = 0;
  for (let i = 0; i < input.length; i += 1) {
    tempBatch.push(input[i]);
    counter += 1;
    if (counter === BATCH_SIZE) {
      counter = 0;
      allBatches.push(tempBatch);
      tempBatch = [];
    } else if (i === input.length - 1) {
      counter = 0;
      allBatches.push(tempBatch);
      tempBatch = [];
    }
  }
  return allBatches;
};
