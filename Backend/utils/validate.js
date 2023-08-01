const validate = async (model, body) => {
  try {
    const result = await model.validate(body, { abortEarly: false });
    return { result, errors: null };
  } catch (err) {
    const errors = err.inner.map(({ path, errors }) => ({ [path]: errors[0] }));
    return { result: null, errors };
  }
};

module.exports = validate;