# website

This is my personal website, built using the python [falcon](https://falconframework.org/) web API framework and [React](https://reactjs.org/) JavaScript library. Blog posts and other content are managed through a [Micropub](https://indieweb.org/Micropub) endpoint utilizing [IndieAuth](https://indieweb.org/IndieAuth). I'm using [Let's Encrypt](https://letsencrypt.org/) to enable HTTPS (shout out to the awesome [docker compose lets encrypt nginx proxy](https://github.com/evertramos/docker-compose-letsencrypt-nginx-proxy-companion) for handling all of that). In general, the ideas behind the [Indie Web](https://indieweb.org/why) have inspirsed a lot of what went into creating this.

Feel free to poke around, make suggestions, trash talk, etc.

## running

This can be run entirely within docker using [Docker Compose](https://docs.docker.com/compose/overview/), so you should only need to have that installed to run this.

To run the develop setup, go to the root of this project and run:

`docker-compose up`

and everything should be taken care of. The backend will run with auto reloading and a webpack-dev-server with hot-reloading will fire up to compile the frontend assets. The site can be accessed at `http://localhost:8000`.

To run the production setup, go to the root of this project and run:

`docker-compose -f docker-compose.prod.yml up`

and again, all the services will come up, including the Let's Encrypt setup.

## structure

To give a little background on how things are organized, the high level view is:

- `config` holds, you guessed it, some config for the different environments this runs in (dev and prod)
- `docker` holds a `nginx.tmpl` config file that gets mounted in the nginx-lets-encrypt container to configure nginx. When those containers spin up, more folders and files are created here. If something with nginx/lets encrypt gets wonky, delete everything in here but the `nginx.tmpl` file and the rest will be recreated.
- `web` has all the frontend code.
- `website` has all the backend code.
