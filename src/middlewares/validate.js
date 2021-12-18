const validate = (schema, source) => (req, res, next) => {
  //! req.body, req.params, req.query
  const { value, error } = schema.validate(req[source]);

  if (error) {
    const errors = error?.details?.map((detail) => {
      const { message, path } = detail;
      return { message, path };
    });
    return res.status(400).send({ errors });
  }
  Object.assign(req, { data: value });
  return next();
};

module.exports = validate;
