/****************************************************
 Dependencies
 ****************************************************/

var httpReference = dependencies.http;

var httpDependency = {
    get: httpReference.get,
    post: httpReference.post,
    put: httpReference.put,
    patch: httpReference.patch,
    delete: httpReference.delete,
    head: httpReference.head,
    options: httpReference.options
};
var httpService = {};

function handleRequestWithRetry(requestFn, options, callbackData, callbacks) {
    try {
        return requestFn(options, callbackData, callbacks);
    } catch (error) {
        sys.logs.info("[gmelius] Handling request "+JSON.stringify(error));
        refreshToken();
        return requestFn(setAuthorization(options), callbackData, callbacks);
    }
}

function createWrapperFunction(requestFn) {
    return function(options, callbackData, callbacks) {
        return handleRequestWithRetry(requestFn, options, callbackData, callbacks);
    };
}

for (var key in httpDependency) {
    if (typeof httpDependency[key] === 'function') httpService[key] = createWrapperFunction(httpDependency[key]);
}

function refreshToken() {
    try {
        sys.logs.info("[gmelius] Refresh Token request");
        var refreshTokenResponse = httpReference.post({
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
            config.set("accessToken", refreshTokenResponse.access_token);
            config.set("refreshToken", refreshTokenResponse.refresh_token);
        } else {
            sys.logs.error("[gmelius] Refresh Token request failed, no access token received.");
        }
    } catch (error) {
        sys.logs.error("[gmelius] Error refreshing token: " + error.message);
    }
}


/****************************************************
 Helpers
 ****************************************************/

exports.token = {};

exports.token.introspection = {};

exports.token.revocation = {};

exports.me = {};

exports.boards = {};

exports.boards.columns = {};

exports.boards.cards = {};

exports.boards.cards.tags = {};

exports.sharedfolders = {};

exports.sharedfolders.conversations = {};

exports.conversations = {};

exports.conversations.notes = {};

exports.conversations.reply = {};

exports.conversations.tags = {};

exports.conversations.assignee = {};

exports.conversations.status = {};

exports.sequences = {};

exports.sequences.enroll = {};

exports.sequences.disenroll = {};

exports.notes = {};

exports.tags = {};

exports.webhooks = {};

exports.events = {};

exports.token.introspection.post = function(httpOptions) {
    var url = parse('/token/introspection');
    sys.logs.debug('[gmelius] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Gmelius(options));
};

exports.token.revocation.post = function(httpOptions) {
    var url = parse('/token/revocation');
    sys.logs.debug('[gmelius] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Gmelius(options));
};

exports.me.get = function(httpOptions) {
    var url = parse('/me');
    sys.logs.debug('[gmelius] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Gmelius(options));
};

exports.boards.get = function(id, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        }
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 0:
			url = parse('/auth/boards');
			break;
		case 1:
			url = parse('/auth/boards/:id', [id]);
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[gmelius] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return httpService.get(Gmelius(options));
};

exports.boards.post = function(httpOptions) {
    var url = parse('/auth/boards');
    sys.logs.debug('[gmelius] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Gmelius(options));
};

exports.boards.put = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/boards/:id', [id]);
    sys.logs.debug('[gmelius] PUT from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.put(Gmelius(options));
};

exports.boards.delete = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/boards/:id', [id]);
    sys.logs.debug('[gmelius] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(Gmelius(options));
};

exports.boards.columns.get = function(id, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        }
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 1:
			url = parse('/auth/boards/:id/columns', [id]);
			break;
		case 1:
			url = parse('/auth/boards/columns/:id', [id]);
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[gmelius] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return httpService.get(Gmelius(options));
};

exports.boards.columns.post = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/boards/:id/columns', [id]);
    sys.logs.debug('[gmelius] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Gmelius(options));
};

exports.boards.columns.patch = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/boards/columns/:id', [id]);
    sys.logs.debug('[gmelius] PATCH from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.patch(Gmelius(options));
};

exports.boards.columns.delete = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/boards/columns/:id', [id]);
    sys.logs.debug('[gmelius] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(Gmelius(options));
};

exports.boards.cards.get = function(id, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        }
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 1:
			url = parse('/auth/boards/:id/cards', [id]);
			break;
		case 1:
			url = parse('/auth/boards/cards/:id', [id]);
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[gmelius] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return httpService.get(Gmelius(options));
};

exports.boards.cards.patch = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/boards/cards/:id', [id]);
    sys.logs.debug('[gmelius] PATCH from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.patch(Gmelius(options));
};

exports.boards.cards.delete = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/boards/cards/:id', [id]);
    sys.logs.debug('[gmelius] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(Gmelius(options));
};

exports.boards.cards.post = function(httpOptions) {
    var url = parse('/auth/boards/cards');
    sys.logs.debug('[gmelius] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Gmelius(options));
};

exports.boards.cards.tags.post = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/boards/cards/:id/tags', [id]);
    sys.logs.debug('[gmelius] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Gmelius(options));
};

exports.boards.cards.tags.delete = function(id, tagId, httpOptions) {
    if (!id || !tagId) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id,tagId].');
        return;
    }
    var url = parse('/auth/boards/cards/:id/tags/:tagId', [id, tagId]);
    sys.logs.debug('[gmelius] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(Gmelius(options));
};

exports.sharedfolders.get = function(id, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        }
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 0:
			url = parse('/auth/sharedfolders');
			break;
		case 1:
			url = parse('/auth/sharedfolders/:id', [id]);
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[gmelius] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return httpService.get(Gmelius(options));
};

exports.sharedfolders.conversations.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/sharedfolders/:id/conversations', [id]);
    sys.logs.debug('[gmelius] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Gmelius(options));
};

exports.conversations.get = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/conversations/:id', [id]);
    sys.logs.debug('[gmelius] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Gmelius(options));
};

exports.conversations.notes.post = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/conversations/:id/notes', [id]);
    sys.logs.debug('[gmelius] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Gmelius(options));
};

exports.conversations.reply.post = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/conversations/:id/reply', [id]);
    sys.logs.debug('[gmelius] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Gmelius(options));
};

exports.conversations.tags.post = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/conversations/:id/tags', [id]);
    sys.logs.debug('[gmelius] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Gmelius(options));
};

exports.conversations.assignee.put = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/conversations/:id/assignee', [id]);
    sys.logs.debug('[gmelius] PUT from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.put(Gmelius(options));
};

exports.conversations.status.put = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/conversations/:id/status', [id]);
    sys.logs.debug('[gmelius] PUT from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.put(Gmelius(options));
};

exports.sequences.get = function(id, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        }
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 0:
			url = parse('/auth/sequences');
			break;
		case 1:
			url = parse('/auth/sequences/:id', [id]);
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[gmelius] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return httpService.get(Gmelius(options));
};

exports.sequences.enroll.post = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/sequences/enroll/:id', [id]);
    sys.logs.debug('[gmelius] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Gmelius(options));
};

exports.sequences.disenroll.delete = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/sequences/disenroll/:id', [id]);
    sys.logs.debug('[gmelius] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(Gmelius(options));
};

exports.notes.post = function(httpOptions) {
    var url = parse('/auth/notes');
    sys.logs.debug('[gmelius] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Gmelius(options));
};

exports.notes.put = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/notes/:id', [id]);
    sys.logs.debug('[gmelius] PUT from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.put(Gmelius(options));
};

exports.notes.delete = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/notes/:id', [id]);
    sys.logs.debug('[gmelius] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(Gmelius(options));
};

exports.tags.patch = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/tags/:id', [id]);
    sys.logs.debug('[gmelius] PATCH from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.patch(Gmelius(options));
};

exports.webhooks.get = function(id, httpOptions) {
    if(!httpOptions){
        for (var i = 0 ; i < arguments.length; i++){
            if (isObject(arguments[i])){
                httpOptions = arguments[i];
                arguments[i] = undefined;
            }
        }
    }
    var url;
    switch(httpOptions ? arguments.length - 1 : arguments.length){
        case 0:
			url = parse('/auth/webhooks');
			break;
		case 1:
			url = parse('/auth/webhooks/:id', [id]);
			break;
		default:
            sys.logs.error('Invalid argument received.');
            return;
    }
    sys.logs.debug('[gmelius] GET from: ' + url);
	var options = checkHttpOptions(url, httpOptions);
	return httpService.get(Gmelius(options));
};

exports.webhooks.post = function(httpOptions) {
    var url = parse('/auth/webhooks');
    sys.logs.debug('[gmelius] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Gmelius(options));
};

exports.events.get = function(httpOptions) {
    var url = parse('/auth/events');
    sys.logs.debug('[gmelius] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Gmelius(options));
};

exports.webhooks.delete = function(id, httpOptions) {
    if (!id) {
        sys.logs.error('Invalid argument received. This helper should receive the following parameters as non-empty strings: [id].');
        return;
    }
    var url = parse('/auth/webhooks/:id', [id]);
    sys.logs.debug('[gmelius] DELETE from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(Gmelius(options));
};

/****************************************************
 Public API - Generic Functions
 ****************************************************/

exports.get = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Gmelius(options), callbackData, callbacks);
};

exports.post = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Gmelius(options), callbackData, callbacks);
};

exports.put = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.put(Gmelius(options), callbackData, callbacks);
};

exports.patch = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.patch(Gmelius(options), callbackData, callbacks);
};

exports.delete = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(Gmelius(options), callbackData, callbacks);
};

exports.head = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.head(Gmelius(options), callbackData, callbacks);
};

exports.options = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.options(Gmelius(options), callbackData, callbacks);
};

exports.utils = {};

exports.utils.parseTimestamp = function(dateString) {
    if (!dateString) {
        return null;
    }
    var dt = dateString.split(/[: T\-]/).map(parseFloat);
    return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
};

exports.utils.formatTimestamp = function(date) {
    if (!date) {
        return null;
    }
    var pad = function(number) {
        var r = String(number);
        if ( r.length === 1 ) {
            r = '0' + r;
        }
        return r;
    };
    return date.getUTCFullYear()
        + '-' + pad( date.getUTCMonth() + 1 )
        + '-' + pad( date.getUTCDate() )
        + 'T' + pad( date.getUTCHours() )
        + ':' + pad( date.getUTCMinutes() )
        + ':' + pad( date.getUTCSeconds() )
        + '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
        + 'Z';
};

exports.utils.fromDateToTimestamp = function(params) {
    if (!!params) {
        return {timestamp: new Date(params).getTime()};
    }
    return null;
};

exports.utils.fromMillisToDate = function(params) {
    if (!!params) {
        var sdf = new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZone: 'UTC'
        });
        return {date: sdf.format(new Date(parseInt(params)))};
    }
    return null;
};

exports.utils.getConfiguration = function (property) {
    sys.logs.debug('[gmelius] Get property: '+property);
    return config.get(property);
};

/****************************************************
 Private helpers
 ****************************************************/


var concatQuery = function (url, key, value) {
    return url + ((!url || url.indexOf('?') < 0) ? '?' : '&') + key + "=" + value;
}

var checkHttpOptions = function (url, options) {
    options = options || {};
    if (!!url) {
        if (isObject(url)) {
            // take the 'url' parameter as the options
            options = url || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contain the http package format
                options.path = url;
            } else {
                // create html package
                options = {
                    path: url,
                    body: options
                }
            }
        }
    }
    return options;
}

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
}

var stringType = Function.prototype.call.bind(Object.prototype.toString)

var parse = function (str) {
    try {
        if (arguments.length > 1) {
            var args = arguments[1], i = 0;
            return str.replace(/(:(?:\w|-)+)/g, () => {
                if (typeof (args[i]) != 'string' && typeof (args[i]) != 'number') throw new Error('Invalid type of argument: [' + args[i] + '] for url [' + str + '].');
                return args[i++];
            });
        } else {
            if (str) {
                return str;
            }
            throw new Error('No arguments nor url were received when calling the helper. Please check it\'s definition.');
        }
    } catch (err) {
        sys.logs.error('Some unexpected error happened during the parse of the url for this helper.')
        throw err;
    }
}

/****************************************************
 Configurator
 ****************************************************/

var Gmelius = function (options) {
    options = options || {};
    options= setApiUri(options);
    options= setRequestHeaders(options);
    options= setAuthorization(options);
    return options;
}

/****************************************************
 Private API
 ****************************************************/

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


function mergeJSON (json1, json2) {
    const result = {};
    var key;
    for (key in json1) {
        if(json1.hasOwnProperty(key)) result[key] = json1[key];
    }
    for (key in json2) {
        if(json2.hasOwnProperty(key)) result[key] = json2[key];
    }
    return result;
}
