const Schemes = require("./scheme-model");
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const { scheme_id } = req.params;
    const scheme = await Schemes.findById(scheme_id);
    if (scheme.scheme_name) {
      req.scheme = scheme;
      next();
    } else {
      next({
        status: 404,
        message: `scheme with scheme_id ${scheme_id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  const { scheme_name } = req.body;
  if (
    scheme_name === undefined ||
    scheme_name === "" ||
    typeof scheme_name !== "string"
  ) {
    res.status(400).json({ message: "invalid scheme_name" });
  } else {
    next();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body
  if(instructions === undefined || !instructions || (typeof instructions !== 'string')) {
    res.status(400).json({ message: 'invalid step' })
  } else if (isNaN(step_number) || step_number < 1) {
    res.status(400).json({message: 'invalid step'})
  } else {
    next()
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
