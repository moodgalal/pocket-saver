export class BillModel {
	trxID: number = 0;
	loginName: string;
	printerName: string;
	printedFile: string;
	createdDate: string;
	storeID: number;
	storeCatTypeID: number;
	currencyCode: string;
	trxAMT: number;
	decimalDigit:number;
	exchangeRate:number;
	isMultiply: boolean;
	trxComments: string;
	categoryID: number;
	subCategoryID: number;
}
