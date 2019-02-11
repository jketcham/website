def get_authentication_token(req, prefix='Bearer '):
    # check Authorization header
    if req.auth and req.auth.startswith(prefix):
        return req.auth[len(prefix):]

    # check access_token param
    if req.params.get('access_token') and req.params.get('access_token').startswith(prefix):
        return req.params['access_token'][len(prefix):]

    return
