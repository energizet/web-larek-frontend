export enum PayType {
	Online = 'online',
	Offline = 'offline',
}

export class OrderModel {
	public payType?: PayType;
	public address = '';
	public email = '';
	public phone = '';
}
