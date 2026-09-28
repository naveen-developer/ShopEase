import { validationResult } from "express-validator";

function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Group into field: message format for a clean API response
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return res.status(400).json({
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  next();
}

export default validate;
