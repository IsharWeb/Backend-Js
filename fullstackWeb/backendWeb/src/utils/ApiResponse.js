class ApiResponse {

    constructor(statusCode, data = null, message = "Success") {

        this.statusCode = statusCode;
        this.message = message;
        this.success = true || statusCode < 400;
        this.data = data;

    }

}


export { ApiResponse };
