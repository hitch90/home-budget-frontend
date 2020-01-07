// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    //api_url: 'http://localhost:3000', 
    api_url: 'https://trezy-api.hitch90.now.sh',
    routes: {
        incomes: 'incomes',
        income: 'income',
        expenses: 'expenses',
        expense: 'expense',
        category: 'category',
        categories: 'categories',
        account: 'account',
        accounts: 'accounts'
    },
    password: 'd41d8cd98f00b204e9800998ecf8427e',
};
