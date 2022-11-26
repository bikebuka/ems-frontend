export default {
    CUSTOMER_ACCOUNTS:({page,page_size})=>`transactions/accounts/?page=${page}&page_size=${page_size}`,
    SEND_MONEY:"transactions/b2c/",
    CUSTOMER_ACCOUNT_TRANSACTIONS:({account_number,page,page_size})=>`transactions/?account_number=${account_number}&page=${page}&page_size=${page_size}`,
    TOP_UP_ACCOUNT: "transactions/accounts/top-up/",
    PROCESS_PAYMENT: "transactions/accounts/process-payment/"
}