export class HttpException {
	message: string;
	status: number;
	constructor(status: number, message: string) {
		this.message = message;
		this.status = status;
	}
}
