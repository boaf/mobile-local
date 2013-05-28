mobile-local
============

Just a test mobile app

1. `git clone git://github.com/boaf/mobile-local.git && cd mobile-local`
2. `python -m SimpleHTTPServer 8080` (or some other HTTP server)
3. Visit `localhost:8080` in yo browsa

Tests
-----

### Requirements

- Node >= 0.6.3
- Buster >= 0.6.12

### Running (method 1)

1. `buster static`
2. Visit `localhost:8282`

### Running (method 2)

1. `buster server`
2. Visit `localhost:1111`
3. `buster test` (in a new terminal)
