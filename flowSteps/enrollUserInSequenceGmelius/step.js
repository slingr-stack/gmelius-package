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

    var inputs = {
        sequenceId: inputs.contactFirstName || "",
        contactEmail: inputs.contactEmail || "",
        contactFirstName: inputs.contactFirstName || ""
    };

    var body = {
        "email_address": inputs.contactEmail,
        "variables": [
            {
                "name": "to.fname",
                "value": inputs.contactFirstName,
            }
        ]
    };

    var options = {
        path: '/auth/sequences/enroll/' + inputs.sequenceId,
        body: body
    };

    return httpService.post(options);

}
