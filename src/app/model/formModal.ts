export interface register {
  firstName?: string;
  lastName?: string;
  address?: string;
  qualification?: string;
  currentCompny?: string;
  previousCompny?: string;
  id?:number,
  previousCompanies?:  PreviousCompanies[]

}

export interface PreviousCompanies{
  companyName : string ,
  companyDate :string
}
