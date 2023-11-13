/****************************************************
 Dependencies
 ****************************************************/

var httpService = dependencies.http;

/**
 * This flow step will send generic request.
 *
 * @param {object} inputs
 */
step.enrollUserInSequenceGmelius = function (inputs) {

    var inputsLogic = {
        sequenceId: inputs.contactFirstName || "",
        contactEmail: inputs.contactEmail || "",
        contactFirstName: inputs.contactFirstName || ""
    };

    var body = {
        "email_address": inputsLogic.contactEmail,
        "variables": [
            {
                "name": "to.fname",
                "value": inputsLogic.contactFirstName,
            }
        ]
    };

    var options = {
        path: '/auth/sequences/enroll/' + inputsLogic.sequenceId,
        body: body
    };

    refreshToken();
    options= setApiUri(options)
    options= setRequestHeaders(options);
    options= setAuthorization(options);

    return httpService.post(options);

}


function setApiUri(options) {
    var API_URL = config.get("GMELIUS_API_BASE_URL");
    var url = options.path || "";
    options.url = API_URL + url;
    sys.logs.debug('[gmelius] Set url: ' + options.path + "->" + options.url);
    return options;
}

function setRequestHeaders(options) {
    var headers = options.headers || {};
    headers = mergeJSON(headers, {"Content-Type": "application/json"});

    options.headers = headers;
    return options;
}

function setAuthorization(options) {
    var authorization = options.authorization || {};
    sys.logs.debug('[Gmelius] setting authorization');
    authorization = mergeJSON(authorization, {
        type: "oauth2",
        accessToken: config.get("accessToken"),
        headerPrefix: "Bearer"
    });
    options.authorization = authorization;
    return options;
}

function refreshToken() {
    try {
        sys.logs.info("[gmelius] Refresh Token request");
        var refreshTokenResponse = httpService.post({
            url: "https://api.gmelius.com/public/v2/token",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            authorization : {
                type: "basic",
                username: config.get("clientId"),
                password: config.get("clientSecret")
            },
            body: {
                grant_type: "refresh_token",
                refresh_token: config.get("refreshToken")
            }
        });
        sys.logs.info("[gmelius] Refresh Token request response: "+JSON.stringify(refreshTokenResponse));
        if (response && response.access_token) {
            _config.set("accessToken", refreshTokenResponse.access_token);
            _config.set("refreshToken", refreshTokenResponse.refresh_token);
        } else {
            sys.logs.error("[gmelius] Refresh Token request failed, no access token received.");
        }
    } catch (error) {
        sys.logs.error("[gmelius] Error refreshing token: " + error.message);
    }
}

function mergeJSON (json1, json2) {
    var result = {};
    var key;
    for (key in json1) {
        if(json1.hasOwnProperty(key)) result[key] = json1[key];
    }
    for (key in json2) {
        if(json2.hasOwnProperty(key)) result[key] = json2[key];
    }
    return result;
}
