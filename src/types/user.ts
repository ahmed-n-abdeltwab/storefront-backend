export type User = {
	id?: number;
	username: string;
	firstname?: string;
	lastname?: string;
	password: string;
	role: 'admin' | 'user';
};
