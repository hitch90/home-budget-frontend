// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    api_url: 'http://localhost:3000',
    routes: {
        incomes: 'incomes',
        income: 'income',
        expenses: 'expenses',
        expense: 'expense',
        category: 'categories'
    }
};
