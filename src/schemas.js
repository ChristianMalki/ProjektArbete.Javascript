export const LoginSchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { description: "Email of the user", type: "string" },
      password: { description: "Password of the user", type: "string" },
    },
  },
  response: {
    200: {
      description: "Success response",
      type: "object",
      properties: {
        token: { type: "string" },
      },
    },
  },
};

export const RegisterSchema = {
  body: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: { description: "Full name of the user", type: "string" },
      email: { description: "Email of the user", type: "string" },
      password: { description: "Password of the user", type: "string" },
    },
  },
  response: {
    201: {
      description: "Success response",
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};
export const AddMovieSchema = {
  body: {
    type: "object",
    required: ["director", "year", "country"],
    properties: {
      director: { description: "Name of the director", type: "string" },
      year: { description: "Year the movie was published", type: "number" },
      country: {
        description: "Which country it takes place in",
        type: "string",
      },
    },
  },
  response: {
    201: {
      description: "Success response",
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};

export const GetMoviesSchema = {
  response: {
    200: {
      description: "List of all movies",
      type: "array",
      items: {
        type: "object",
        properties: {
          director: { description: "Name of the director", type: "string" },
          year: { description: "Year the movie was published", type: "number" },
          country: {
            description: "Which country it takes place in",
            type: "string",
          },
        },
      },
    },
  },
};

export const DeleteMovieSchema = {
  body: {
    type: "object",
    required: ["movie"],
    properties: {
      movie: { description: "Name of the movie to remove", type: "string" },
    },
  },
  response: {
    200: {
      description: "Delete status",
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};
export const UpdateMovieSchema = {
  body: {
    type: "object",
    required: ["movie"],
    properties: {
      movie: { description: "Update a new movie", type: "string" },
    },
  },
  response: {
    200: {
      description: "Update status",
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};
