class ApiResponse {

    constructor(statusCode, data = null, message = "Success") {

        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
        this.success = true || statusCode < 400;

    }

}


export { ApiResponse };
