export interface HomeSavingsCalculatorParameters {
	comparator?: "AER" | "APR";
	monthlyDeposit: number;
	interestedInMortgage?: boolean;
	notMakeUseOfConnectedProduct?: boolean;
	marketingNeeded?: boolean;
	focusOn?: boolean;
	makeUseOfConnectedProduct?: boolean;
	roleCode?: "BM" | "TEST";
}

export interface HomeSavingsCalculatorResult {
	id: string;
	name: string;
	subType: string;
	validFrom: string;
	validTo: string;
	bank: {
		code: string;
		name: string;
	};
	fullSavingsNoLoan: number;
	fullSavingsLoan: number;
	contractAmount: number;
	aer: number;
	notAidedAer: number;
	accountOpeningFee: number;
	handlingFee: number;
	depositInterest: number;
	apr: number;
	mortgageInstallment: number;
	mortgageDuration: number;
	mortgageIssuePeriod: number;
	mortgageAmount: number;
	savingsPeriod: number;
	ownDeposit: number;
	interestAmount: number;
	interestBonus: number;
	interestBonusRate: number;
	interestBonusCondition: string;
	stateAid: number;
	monthlyAccountFee: number;
	fullAccountFee: number;
	fullFee: number;
	monthlyPayment: number;
	contractNumber: number;
	contracts: number[];
	loanInterestRate: number;
	conditions: {
		plusRequired: boolean;
		conditionsSummary: string;
		conditionsDetail: string;
	}[];
}
