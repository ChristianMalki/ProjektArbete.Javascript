import validateEmail from "./utils/validateEmail.js";

export async function LoginController(request, response) {
  try {
    const { User } = request.db.models;

    const user = await User.findOne({ email: request.body.email });

    if (!user) {
      response.status(404);
      return "No user exists with this email address!";
    }

    if (user.password !== request.body.password) {
      response.status(403);
      return "You have logged in with the wrong, please try again!";
    }
    const jwtToken = await response.jwtSign({
      name: user.name,
      email: user.email,
      userId: user.id,
    });

    const responseData = {
      token: jwtToken,
    };

    response.status(200).send(responseData);
  } catch (error) {
    request.log.error(error);
    await response.status(500).send("An error occurred!");
  }
}

export async function RegisterController(request, response) {
  try {
    // Validate email and password

    const isEmailValid = validateEmail(request.body.email);

    if (!isEmailValid) {
      response.status(400);
      return "Invalid email address!";
    }

    // Check if there are duplicates in the database

    const { User } = request.db.models;

    const existsUser = User.find({ email: request.body.email });

    // Returnera om det finns en användare
    if (existsUser) {
      response.status(409);
      return "User with email already exists!";
    }

    // Return if there is a user
    await User.create(request.body);

    response.status(201);

    return {
      success: true,
      message: "Successfully registered user!",
    };
  } catch (error) {
    request.log.error(error);
    await response.status(500).send("An error occurred!");
  }
}

export async function AddMovieController(request, response) {
  try {
    const { Movie } = request.db.models;

    const newMovie = await Movie.create(request.body);

    response.status(201);

    return { success: true, message: `Uploaded with id: ${newMovie.id}` };
  } catch (error) {
    request.log.error(error);
    await response.status(500).send("An error occurred!");
  }
}

export async function GetMoviesController(request, response) {
  try {
    // const { userId } = request.user;

    //npm console.log(userId);

    const { Movie } = request.db.models;

    const movies = await Movie.find({});

    return movies;
  } catch (error) {
    request.log.error(error);
    await response.status(500).send("An error occurred!");
  }
}

export async function DeleteMovieController(request, response) {
  try {
    // Applogik

    const { Movie } = request.db.models;

    const { deletedCount } = await Movie.deleteOne({
      title: request.body.movie,
    });

    if (deletedCount === 0) {
      response.code(404);
      return { success: false, message: "Movie could not be found!" };
    }

    return { success: true, message: "Movie has been deleted!" };
  } catch (error) {
    request.log.error(error);
    await response.status(500).send("An error occurred!");
  }
}

export async function ChatSocketController(connection, request) {
  connection.socket.on("message", (message) => {
    console.log("Message from client!!!");
  });

  connection.socket.on("close", () => {
    console.log("CLient disconnected");
  });
}

export async function UpdateMoviesController(connection, request) {
  try {
    const { Movie } = request.database.models;
    const MovieExist = await Movie.findById(request.body._id);

    if (MovieExist === null) {
      return await response.status(404).send("Movie doesn't exist");
    }
  } catch (error) {
    const updatedMovie = await Movie.findByIdAndUpdate(
      request.body._id,
      request.body,
      { new: true }
    );

    return await response.status(200).send(updatedMovie);
  }
}
