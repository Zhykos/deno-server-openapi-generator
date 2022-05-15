Version 0.5.0:
- Returns a 409 error in case of a "Deno.errors.AlreadyExists" exception
- Only log into the console if it's a code 500 error
- Improve JDoc by adding @param and @returns keywords

This is still a beta version: a simple JSON server will work but be warned: complex requests may fail.

This version is valid with the OpenAPI PetStore example.

Check README for more details.